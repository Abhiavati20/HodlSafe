import React from 'react'
import {generateMnemonic} from "bip39"
import { Button } from '../ui/button'
import MnemonicComponent from '../MnemonicComponent/MnemonicComponent'

interface IMnemonicComponentProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
}

const MnemonicGenerator = (props: IMnemonicComponentProps) => {
    const {mnemonic, setMnemonic} = props
    async function handleCreateSeed() {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    }
    
    return (
      <div className="w-full flex flex-col items-center justify-center my-2">
        {mnemonic === "" && <Button variant="outline" size="lg" className="shadow-md dark:shadow-slate-900 my-2 text-xl" onClick={handleCreateSeed}>
              Create Secret Phrase
            </Button>
          }
            {mnemonic !== "" && <MnemonicComponent mnemonic={mnemonic} />}
        </div>
  )
}

export default MnemonicGenerator