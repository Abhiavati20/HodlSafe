import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
interface IMnemonicComponentProps {
    mnemonic: string;
}
const MnemonicComponent = (props: IMnemonicComponentProps) => {
    const { mnemonic } = props
    const [showSeed,setShowSeed] = useState<boolean>(false)
  return (
      <div className="flex flex-col items-center justify-center w-full p-5 border-2 rounded-md">
          <div className="w-full flex justify-between items-center">
              <h1 className="text-4xl font-semibold">Secret Phrase</h1>
              <Button variant="ghost" size="icon" onClick={() => setShowSeed(!showSeed)}>{showSeed ? <ChevronUp size={18} />:<ChevronDown size={18} />}</Button>
          </div>
          {showSeed &&<div className='w-full my-4 mx-auto rounded-md flex flex-wrap p-2 gap-2 items-center justify-evenly'>{mnemonic.split(" ").map((word, index) => <div key={index} className="p-5 w-1/4 text-xl bg-slate-200 rounded-md">{word}</div>)}</div>}
      </div>
  )
}

export default MnemonicComponent