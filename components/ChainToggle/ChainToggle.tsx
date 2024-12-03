import React from 'react'
import { Button } from '../ui/button'

interface IChainToggleProps {
    handleChain(chain: string): void;
}

export const ChainToggle = (props:IChainToggleProps) => {
  const {handleChain}= props
    return (
    <div className="w-full  px-2 py-8">
          <Button className="mx-2 shadow-xl dark:shadow-slate-900 text-lg" onClick={() => handleChain("Solana")} variant="outline" size="lg" >Solana</Button>
        <Button className="mx-2 shadow-xl dark:shadow-slate-900 text-lg" onClick={() => handleChain("Ethereum")} variant="outline" size="lg" >Ethereum</Button>  
    </div>
  )
}
