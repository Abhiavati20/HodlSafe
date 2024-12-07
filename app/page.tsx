"use client";
import { ChainToggle } from "@/components/ChainToggle/ChainToggle";
import Navbar from "@/components/Navbar/Navbar";
import WalletGenerator from "@/components/WalletGenerator/WalletGenerator";
import { useState } from "react";

export default function Home() {
  const [chain, setChain] = useState<string>("");
  function handleChain(chain: string) {
    setChain(chain);
  }

    return (
        <div className="w-full p-5">
          {/* Navbar */}
          <Navbar />
          {chain === "" && <div className="w-full px-5 py-8 mt-8">
            <h1 className="text-2xl my-2"><span className="font-bold">HodlSafe:</span> Securely hodl across multiple blockchain</h1>
            <p>Choose your chain to begin</p>
          </div>}

          {/* toggle switch buttons between solana and ethereum */}
          {chain === "" ? <ChainToggle handleChain={handleChain} /> : <WalletGenerator chain={chain} handleChain={handleChain}/>}
          {/* show seed */}
          {/* show balance if possible */}
          {/* public key and private key */}
          {/* button to clear / add wallets */}
        </div>
    );
}
