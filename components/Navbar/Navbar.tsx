"use client";
import { useTheme } from "next-themes";
import React from "react" 
import { Button } from "../ui/button";
import {Moon, Sun} from "lucide-react"
const Navbar = () => {
    const { setTheme, theme } = useTheme();
    console.log("THEME", theme)
    return (
        <div className="w-full shadow-xl rounded-xl dark:shadow-slate-900 flex justify-between items-center  p-5">
            <h1 className="text-3xl font-bold">HodlSafe</h1>    
            <div className="flex justify-between items-center">
                {theme === "light" ?<Button size="sm" variant="ghost" onClick={() => setTheme("dark")}><Moon/></Button> : <Button size="sm" variant="ghost" onClick={() => setTheme("light")}><Sun/></Button>}
            </div>  
        </div>
    )
}

export default Navbar