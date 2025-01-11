"use client";
import { ChevronDown, ChevronUp, CopyCheckIcon, CopyIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';
interface IMnemonicComponentProps {
    mnemonic: string;
}
const MnemonicComponent = (props: IMnemonicComponentProps) => {
    const { mnemonic } = props
    const [showSeed, setShowSeed] = useState<boolean>(false)
    const [copied,setCopied] = useState<boolean>(false)
    function handleCopy() {
        navigator.clipboard.writeText(mnemonic);
        toast({
            itemID: "1",
            title: "Secret Phrase copied"
        })

        setCopied(true);

        setTimeout(()=>{setCopied(false)}, 2000)

    }
  return (
      <div className="flex flex-col cursor-pointer items-center justify-center w-full p-5 border-2 rounded-md">
          <Toaster />
          <div className="w-full flex justify-between items-center">
              <h1 className="text-4xl font-semibold">Secret Phrase</h1>
              <Button variant="ghost" size="icon" onClick={() => setShowSeed(!showSeed)}>{showSeed ? <ChevronUp size={18} />:<ChevronDown size={18} />}</Button>
          </div>
          {showSeed &&
                <>
                    <div className='w-full my-4 mx-auto rounded-md flex flex-wrap p-2 gap-2 items-center justify-evenly'>
                  {mnemonic.split(" ").map((word, index) => <div key={index} className="p-5 w-1/4 text-xl bg-slate-200 rounded-md dark:bg-white text-black">{index} {word}</div>)}
                    </div>
                    <span className="flex w-full justify-end" onClick={handleCopy}>
                        <Button size="lg" variant="ghost" >
                            {!copied ? <CopyIcon size={36} /> : <CopyCheckIcon size={36} />}
                        </Button>
                    </span>
                </>
          }
            
      </div>
  )
}

export default MnemonicComponent