'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from "@/components/ui/card"
import ErrorModal from '@/app/components/error-modal'
import Swap8899 from '../components/Swap8899'
import Swap96 from '../components/Swap96'
import Swap10143 from '../components/Swap10143'
import Swap25925 from '../components/Swap25925'
import Liquidity8899 from '../components/Liquidity8899'
import Liquidity96 from '../components/Liquidity96'
import Liquidity10143 from '../components/Liquidity10143'
import Liquidity25925 from '../components/Liquidity25925'
import Positions8899 from '../components/Positions8899'
import Positions96 from '../components/Positions96'
import Positions10143 from '../components/Positions10143'
import Positions25925 from '../components/Positions25925'
import { useSearchParams } from 'next/navigation'
import ReferralTracker from '../components/Refferal'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()
    const searchParams = useSearchParams();
    const tabValue = searchParams.get("tab") ?? "swap"; 

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-gradient-to-br from-slate-700 via-black to-emerald-900">
            <ReferralTracker/>
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <Card className="w-full max-w-xl mx-auto bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-lg overflow-hidden p-2 mb-8 mt-[100px]">
                <div className="px-4">
                    <Tabs defaultValue={tabValue} className="w-full sticky">
                        <TabsList className="w-full grid grid-cols-3 bg-[#0a0b1e] rounded-md p-1 mb-4">
                            <TabsTrigger value="swap" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Instant swap</TabsTrigger>
                            <TabsTrigger value="liquidity" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Liquidity</TabsTrigger>
                            <TabsTrigger value="position" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Positions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="swap">
                            {chainId === 8899 && <Swap8899 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {(chainId === 96 || chainId === undefined) && <Swap96 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 10143 && <Swap10143 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 25925 && <Swap25925 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                        </TabsContent>
                        <TabsContent value="liquidity">
                            {chainId === 8899 && <Liquidity8899 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {(chainId === 96 || chainId === undefined) && <Liquidity96 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 10143 && <Liquidity10143 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 25925 && <Liquidity25925 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                        </TabsContent>
                        <TabsContent value="position">
                            {chainId === 8899 && <Positions8899 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {(chainId === 96 || chainId === undefined) && <Positions96 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 10143 && <Positions10143 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                            {chainId === 25925 && <Positions25925 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />}
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}
