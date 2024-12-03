import React from 'react'
import MnemonicGenerator from '../MnemonicGenerator/MnemonicGenerator';

interface IWalletGeneratorProps {
    chain: string;
}

const WalletGenerator = (props:IWalletGeneratorProps) => {
    const { chain } = props;
    return (
        <div className="w-full flex my-8 flex-col justify-center items-center">
            <h1 className="text-xl font-bold italic my-2">{chain} Wallet</h1>
            <MnemonicGenerator />
            <div>Balance of wallet</div>
            <div>Wallet public and private key</div>
            <div>Add/Delete Button</div>
        </div>
    )
}

export default WalletGenerator