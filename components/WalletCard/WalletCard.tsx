
import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { CopyCheckIcon, CopyIcon, Eye, EyeClosed } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
interface IWalletCardProps {
    publicKey: string;
    walletIndex: number,
    privateKey: string,
    balance:string
}

export const WalletCard = (props:IWalletCardProps) => {
    const { privateKey, publicKey, walletIndex, balance } = props;
    const [copied, setCopied] = useState<boolean>(false);
    // const [pkcopied, setPKCopied] = useState<boolean>(false);
    const [showKey, setShowKey] = useState<boolean>(false);
    const [hexString, setHexString] = useState("");
    function handlePublicKeyCopy() {
        navigator.clipboard.writeText(publicKey);
        toast({
            itemID: "6",
            title: "Public Key copied"
        })

        setCopied(true);

        setTimeout(()=>{setCopied(false)}, 2000)

    }
    // function handlePrivateKeyCopy() {
    //     navigator.clipboard.writeText(privateKey);
    //     toast({
    //         itemID: "1",
    //         title: "Private Key copied"
    //     })

    //     setPKCopied(true);

    //     setTimeout(()=>{setPKCopied(false)}, 2000)

    // }
    function handleShowPrivateKey() {
        setShowKey(!showKey);
        setHexString(privateKey)
    }

    
    return (
      <Card key={walletIndex} className="m-2 w-full mx-auto">
          <CardHeader>
                #{walletIndex + 1}
                <span className="font-semibold"> Balance: {balance}</span>
          </CardHeader>
            <CardContent className="flex flex-col items-center justify-start w-full ">
            
              <div onClick={handlePublicKeyCopy} className="flex flex-col w-full justify-start gap-4 p-2 rounded-md cursor-pointer text-black dark:bg-slate-500 shadow-lg dark:text-white my-2 hover:border-2">
                    <span className="text-2xl font-semibold mr-2">Public Key</span>
                    <span  className="cursor-pointer flex w-full justify-between items-center">
                        <span className="text-2xl">{publicKey}</span>
                        {!copied ? <CopyIcon size={20} /> : <CopyCheckIcon size={20} />}
                    </span>
              </div>
              <div  className="flex flex-col w-full justify-start  gap-4 p-2 rounded-md cursor-pointer text-black dark:bg-slate-500 shadow-lg dark:text-white my-2  hover:border-2">
                    <span className="text-2xl font-semibold mr-2">Private Key</span>
                    <span className="flex w-full justify-between items-center text-2xl" >
                        <span className="flex">{
                            !showKey ?
                                Array.from({ length: privateKey.length }).map((_, index) => <span key={index} className="font-medium ">*</span>)
                            : hexString
                            }</span>
                        {!showKey ? <EyeClosed onClick={handleShowPrivateKey} size={20} /> : <Eye onClick={handleShowPrivateKey} size={20} />}
                        {/* {!showKey ? !pkcopied ? <CopyIcon onClick={handlePrivateKeyCopy} size={20} /> : <CopyCheckIcon size={20} /> : null} */}
                    </span>
                </div>
                {/* TODO to add delete button */}
          </CardContent>
    </Card>
  )
}
