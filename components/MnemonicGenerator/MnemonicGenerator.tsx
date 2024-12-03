import React, { useState } from 'react'
import {generateMnemonic} from "bip39"
import { Button } from '../ui/button'
import MnemonicComponent from '../MnemonicComponent/MnemonicComponent'
const MnemonicGenerator = () => {
    const [mnemonic, setMnemonic] = useState<string>("")
    async function handleCreateSeed() {
        const seed = await generateMnemonic();
        setMnemonic(seed);
    }
    
    return (
      <div className="w-full flex flex-col items-center justify-center my-2">
          <Button variant="outline" size="lg" className="shadow-md dark:shadow-slate-900 my-2" onClick={handleCreateSeed}>Generate Seed</Button>
            {mnemonic !== "" && <MnemonicComponent mnemonic={mnemonic} />}
        </div>
  )
}

export default MnemonicGenerator