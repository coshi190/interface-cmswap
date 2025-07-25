import Link from "next/link"
import { Github, FileText, MessageSquare, X,Scale,Percent,ShieldCheck } from "lucide-react"
import {FaTwitter,FaUsers,FaTelegram } from "react-icons/fa";
import { BsTwitterX,BsDiscord  } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { LuChartCandlestick } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-black/80">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start ml-[20px] md:ml-[0px] md:items-center gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <span className="text-xs font-mono">CMswap_v0.1.1</span>

                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://docs.cmswap.xyz/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <FileText className="w-4 h-4" /><span>DOCS</span>
                        </Link> 
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/fee" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <Percent className="w-4 h-4" /><span>FEE</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/policy" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <ShieldCheck className="w-4 h-4" /><span>PRIVACY POLICY</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/terms-of-use" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <Scale className="w-4 h-4" /><span>TERMS OF USE</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://github.com/coshi190/contracts-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4" /><span>CONTRACTS</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://github.com/coshi190/interface-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4  " /><span>INTERFACE</span>
                        </Link>

                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/about/us" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <FaUsers className="w-4 h-4" /><span>ABOUT US</span>
                        </Link>
                        
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/contact-us" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <MdContacts className="w-4 h-4" /><span>CONTACT US</span>
                        </Link>
{/* 
                         <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="/about/tradingview" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <LuChartCandlestick  className="w-4 h-4" /><span>ABOUT TRADINGVIEW</span>
                        </Link>
                         */}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/about/tradingview" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <LuChartCandlestick  className="w-4 h-4" /><span>ABOUT TRADINGVIEW</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <BsDiscord   className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://x.com/CMswap" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <BsTwitterX className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://t.me/CM_swap/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <FaTelegram className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
