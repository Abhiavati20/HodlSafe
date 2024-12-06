/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import MnemonicGenerator from '../MnemonicGenerator/MnemonicGenerator';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';
import {  mnemonicToSeedSync } from 'bip39';
import nacl from "tweetnacl"
import {derivePath} from "ed25519-hd-key"
import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import { WalletCard } from '../WalletCard/WalletCard';
import bs58 from "bs58"
interface IWalletGeneratorProps {
    chain: string;
}

interface IWallet {
    balance:number
    publicKey: string,
    privateKey: string;
}

const WalletGenerator = (props:IWalletGeneratorProps) => {
    const { chain } = props;
    const [mnemonic, setMnemonic] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [wallets, setWallets] = useState<IWallet[]>([]);

    useEffect(() => {
        console.log("mnemonic", mnemonic)
    },[mnemonic])
    
    function handleAddWallet() {
        if (mnemonic === "") {
            return toast({
                itemID: "2",
                title: "Create a secret phrase first",
                variant: "destructive",
                duration:1000
            })
        }
        try {
            const seed = mnemonicToSeedSync(mnemonic);
        
            const path = `m/44'/501'/0'/${currentIndex}'`;
            console.log("PATH", path);
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            console.log("DRv SEED",derivedSeed)
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            setWallets(
                [...wallets, {
                    balance:0,
                    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
                    privateKey: bs58.encode(secret)
                }
            ])
            setCurrentIndex((prevIndex) => prevIndex + 1)
            toast({
                itemID: "3",
                title: "Wallet Added Successfully",
                variant:"default",
                duration:1000
            })
        } catch (error) {
            console.log("Error", error);
            toast({
                itemID: "4",
                title: "Error in creating wallet",
                variant:"destructive",
                duration:1000
            })
        }
    }

    async function fetchBalances() {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        if (wallets) {
            wallets.map(async(wal) => {
                const wallet = new PublicKey(wal.publicKey);
                const balance = await connection.getBalance(wallet);
                wal.balance=balance/LAMPORTS_PER_SOL
            })
        }
    }
    useEffect(() => {
        
         fetchBalances()
    },[wallets])


    function handleClearWallet() {
        setWallets([]);
        setMnemonic("");
    }

    return (
        <div className="w-full flex my-8 flex-col justify-center items-center">
            <Toaster />
            <h1 className="text-4xl font-bold italic my-2">{chain} Wallet</h1>
            <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic}  />
            {/* <div>Balance of wallet</div> */}
            <div className="flex justify-end items-center my-2 gap-2 w-full ">
                <Button size="lg" variant="default" onClick={handleAddWallet} className="bg-blue-400 hover:bg-white text-lg text-white hover:text-blue-400 shadow-xl dark:shadow-slate-800">Add Wallet</Button>
                <Button size="lg" variant="outline" onClick={handleClearWallet} className="shadow-xl dark:shadow-slate-800 text-lg">Clear Wallet</Button>
            </div>
            {
                wallets.map((wallet, index) => <WalletCard key={index} balance={wallet.balance} walletIndex={index} privateKey={wallet.privateKey} publicKey={wallet.publicKey} />)
            }
        </div>
    )
}

export default WalletGenerator