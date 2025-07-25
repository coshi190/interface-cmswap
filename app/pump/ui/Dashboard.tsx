'use client';
import Image from "next/image";
import { readContracts } from '@wagmi/core';
import {
  formatEther,
  parseEther,
  erc20Abi,
  createPublicClient,
  http,
} from "viem";
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { ERC20FactoryV2ABI } from '@/app/pump/abi/ERC20FactoryV2';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
// import { BKCOracleABI } from '@/app/pump/abi/BKCoracle';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
const { ethereum } = window as any
import { jbc,bitkub, monadTestnet, bitkubTestnet } from "viem/chains";

const chainConfigs = {
  96: {
    chain: bitkub,
    chainId: 96,
    explorer: 'https://www.kubscan.com/',
    rpc: '', 
    blocktime: 5
  },
  10143: {
    chain: monadTestnet,
    chainId: 10143,
    explorer: 'https://monad-testnet.socialscan.io/',
    rpc: process.env.NEXT_PUBLIC_MONAD_RPC as string,
    blocktime: 1
  },
  25925: {
    chain: bitkubTestnet,
    chainId: 25925,
    explorer: 'https://testnet.kubscan.com/',
    rpc: 'https://rpc-testnet.bitkubchain.io',
    blocktime: 5
  },
    8899: {
    chain: jbc,
    chainId: 8899,
    explorer: 'https://exp.jibchain.net/',
    rpc: 'https://rpc-l1.jbc.xpool.pw',
    blocktime: 12
  }
  // Add more chains here
};

export default function Dashboard({
    addr, mode, chain, token,
  }: {
    addr: string;
    mode: string;
    chain: string;
    token: string;
}) {
  // let priceFeed: any = [1, 1];
  // if (mode === 'pro' && chain === 'kub') {
  //   const publicClientOracle = createPublicClient({ 
  //     chain: bitkub,
  //     transport: http()
  //   });
  //   priceFeed = await publicClientOracle.readContract({
  //     address: '0x775eeFF3f80f110C2f7ac9127041915489c275f4',
  //     abi: BKCOracleABI,
  //     functionName: 'latestAnswer',
  //   });
  // }

  const chainNameToIdMap: Record<string, number> = {
    kub: 96,
    monad: 10143,
    kubtestnet: 25925,
    jbc: 8899,
  };
  const selectedChainId = chainNameToIdMap[chain] ?? 96;
  const chainConfig = chainConfigs[selectedChainId as keyof typeof chainConfigs];
  if (!chainConfig) throw new Error(`Unsupported chain: ${chain}`);
  if (!chainConfig.rpc) throw new Error(`Missing RPC for chain: ${chain}`);
  const publicClient = createPublicClient({
    chain: chainConfig.chain,
    transport: http(chainConfig.rpc),
  });

  let _chainId = chainConfig.chainId;
  let _chain = chainConfig.chain;
  let _explorer = chainConfig.explorer;
  let _rpc = chainConfig.rpc;


  // add chain here
  let currencyAddr: string = '';
  let bkgafactoryAddr: string = '';
  let _blockcreated: number = 1;
  let v2facAddr: string = '';

  if ((chain === 'kub' || chain === '') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
    currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
    bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
    _blockcreated = 25229488;
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
  } else if ((chain === 'kub' || chain === '') && mode === 'pro') {
    currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
    bkgafactoryAddr = '0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56';
    _blockcreated = 25232899;
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
  } else if (chain === 'monad' && mode === 'pro') {
    currencyAddr = '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701';
    bkgafactoryAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
    _blockcreated = 16912084;
    v2facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
  } else if (chain === 'kubtestnet') {
      currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
      bkgafactoryAddr = '0x46a4073C830031eA19D7b9825080c05F8454E530';
      _blockcreated = 23935659;
      v2facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
  } 
  // add chain and mode here
  const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
  const dataofuniv2factory = {addr: v2facAddr};
  const bkgafactoryContract = {
    address: bkgafactoryAddr as '0xstring',
    abi: chain === 'kubtestnet' ? ERC20FactoryV2ABI : ERC20FactoryABI ,
    chainId: _chainId,
  } as const
  const univ2factoryContract = {
    address: dataofuniv2factory.addr as '0xstring',
    abi: UniswapV2FactoryABI,
    chainId: _chainId,
  } as const

  const [resultfinal, setResultfinal] = useState<any>([]);
  const [allvalue, setAllvalue] = useState<any>([]);

  useEffect(() => {
    const fetch0 = async () => {
      
      const indexCount = await readContracts(config, {
        contracts: [
          {
            ...bkgafactoryContract,
            functionName: 'totalIndex',
          },
        ],
      });
      const init: any = {contracts: []};

      if(chain === 'kubtestnet'){
        const logCreateData = await publicClient.getContractEvents({
        ...bkgafactoryContract,
        eventName: 'Creation',
        fromBlock: BigInt(_blockcreated),
        toBlock: 'latest',
      });

      const addressList = logCreateData.map((res: any) => ({
        address: res.tokenAddr as '0xstring',
        tx: res.transactionHash,
      }));

      }else{
        for (let i = 0; i <= Number(indexCount[0].result) - 1; i++) {
          init.contracts.push(
              {
                ...bkgafactoryContract,
                functionName: 'index',
                args: [BigInt(i + 1)],
              }
          );
        }
      }

      const result = await readContracts(config, init);

      const result4 = result.map(async (res: any) => {
        return await readContracts(config, {
          contracts: [
            {
              address: res.result!,
              abi: erc20Abi,
              functionName: 'symbol',
              chainId: _chainId,
            },
            {
              ...bkgafactoryContract,
              functionName: 'logo',
              args: [res.result!],
            },
            {
              ...univ2factoryContract,
              functionName: 'getPool',
              args: [res.result!, dataofcurr.addr as '0xstring', 10000],
            },
            {
              address: res.result!,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [addr as '0xstring'],
              chainId: _chainId,
            },
          ],
        });
      })

      const result44: any = await Promise.all(result4);
      // const thbData = await readContracts(config, {
      //   contracts: [
      //       {
      //           address: dataofcurr.addr as '0xstring',
      //           abi: erc20Abi,
      //           functionName: 'balanceOf',
      //           args: [addr as '0xstring'],
      //           chainId: _chainId,
      //       },
      //   ],
      // });
      // const ethBal = await getBalance(config, {
      //   address: addr as '0xstring',
      //   chainId: _chainId,
      // })
      // if (mode === 'pro') {
      //   result44.push([{result: 'ETH'}, {result: 'ipfs://bafkreiejfw35g5qdgzw5mv42py5a3cya2mknerishahx24lzgtowajvivm'}, {result: dataofcurr.lp}, {result: ethBal.value}]);
      // } else {
      //   result44.push([{result: '$THB'}, {result: 'ipfs://bafkreiap46j6naouhp6l2qhlfb3tq2pltinynqv3aog5l5n5k7fwhxpzeu'}, {result: dataofcurr.lp}, {result: thbData[0].result}]);
      // }
      const result5 = result44.map(async (res: any) => {
        return await readContracts(config, {
          contracts: [
            {
                address: res[2].result!,
                abi: UniswapV2PairABI,
                functionName: 'slot0',
                chainId: _chainId,
            },
            {
                address: res[2].result!,
                abi: UniswapV2PairABI,
                functionName: 'token0',
                chainId: _chainId,
            },
          ],
        });
      });
      const result55 = await Promise.all(result5);
      const _resultfinal = result44.map((item: any, index: any) => {
        const price = result55[index][1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ? 
          ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2) : 
          (1 / ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2));
        return [{result: item[0].result}, {result: item[1].result}, {result: Number(formatEther(item[3].result as bigint))}, {result: price}, {result: (item[0].result === '$THB' || item[0].result === 'ETH') ? dataofcurr.addr : result[index].result}]
      })
      const _allvalue = _resultfinal.map((res: any) => {return res[2].result * res[3].result}).reduce((a: any, b: any) => a + b, 0);
      setResultfinal(_resultfinal)
      setAllvalue(_allvalue)
    }

    const fetch1 = async () => {

      if(chain === 'kubtestnet'){
        const logCreateData = await publicClient.getContractEvents({
        ...bkgafactoryContract,
        eventName: 'Creation',
        fromBlock: BigInt(_blockcreated),
        toBlock: 'latest',
      });

      const addressList = logCreateData.map((res: any) => ({
        address: res.tokenAddr as '0xstring',
        tx: res.transactionHash,
      }));

      console.log("Creation History",addressList)


      const result4 = addressList.map(async (res: any) => {
        return await readContracts(config, {
          contracts: [
            {
              address: res.result!,
              abi: erc20Abi,
              functionName: 'symbol',
              chainId: _chainId,
            },
            {
              ...bkgafactoryContract,
              functionName: 'logo',
              args: [res.result!],
            },
            {
              ...univ2factoryContract,
              functionName: 'getPool',
              args: [res.result!, dataofcurr.addr as '0xstring', 10000],
            },
            {
              address: res.result!,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [addr as '0xstring'],
              chainId: _chainId,
            },
          ],
        });
      })

      const result44: any = await Promise.all(result4);

      const result5 = result44.map(async (res: any) => {
        return await readContracts(config, {
          contracts: [
            {
                address: res[2].result!,
                abi: UniswapV2PairABI,
                functionName: 'slot0',
                chainId: _chainId,
            },
            {
                address: res[2].result!,
                abi: UniswapV2PairABI,
                functionName: 'token0',
                chainId: _chainId,
            },
          ],
        });
      });
      const result55 = await Promise.all(result5);
      const _resultfinal = result44.map((item: any, index: any) => {
        const price = result55[index][1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ? 
          ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2) : 
          (1 / ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2));
        return [{result: item[0].result}, {result: item[1].result}, {result: Number(formatEther(item[3].result as bigint))}, {result: price}, {result: (item[0].result === '$THB' || item[0].result === 'ETH') ? dataofcurr.addr : addressList[index].address}]
      })
      const _allvalue = _resultfinal.map((res: any) => {return res[2].result * res[3].result}).reduce((a: any, b: any) => a + b, 0);
      setResultfinal(_resultfinal)
      setAllvalue(_allvalue)
    }}
      console.log(chain)
    
    if(chain === 'kubtestnet'){
      fetch1()
    }else{
      fetch0()
    }
  }, [])

  return (
    <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start">
        <div className="w-full h-[50px] py-6 flex flex-row items-center justify-between sm:gap-2 text-lg lg:text-3xl">
            <div className="flex flex-row gap-2 items-center">
                <span>{addr.slice(0, 5) + '...' + addr.slice(37)}</span>
            </div>
            <span className="font-bold">{(chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(allvalue)}</span>
        </div>
        <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
            <div className="w-1/2">
                <span>Asset</span>
            </div>
            <div className="w-3/5 flex flex-row items-center justify-end sm:gap-10">
                <span className="text-right w-[50px] sm:w-[200px]">Balance</span>
                <span className="text-right w-[100px] sm:w-[200px]">Price</span>
                <span className="text-right w-[100px] sm:w-[200px]">Value</span>
            </div>
        </div>
        {resultfinal.filter(
          (res: any) => {return res[2].result !== 0}
        ).sort(
          (a: any, b: any) => {return b[3].result - a[3].result}
        ).map((res: any, index: any) =>
            <div className="w-full h-[50px] flex flex-row items-center justify-around text-xs lg:text-lg py-10 border-t border-gray-800" key={index}>
                <div className="w-1/2 flex flex-row items-center justify-start gap-6 overflow-hidden">
                    <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden relative">
                        <Image src={res[1].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res[1].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res[1].result!} alt="token_waiting_for_approve" fill />
                    </div>
                    <span className="font-bold truncate">{res[0].result}</span>
                    <button 
                        className="flex items-center gap-1 bg-water-300 hover:bg-neutral-700 px-2 py-2 rounded-md transition-colors text-sm cursor-pointer"
                        onClick={async () => {
                            await ethereum.request({
                                method: 'wallet_watchAsset',
                                params: {
                                    type: 'ERC20',
                                    options: {
                                        address: res[4].result,
                                        symbol: res[0].result,
                                        decimals: 18,
                                        image: res[1].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res[1].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res[1].result!
                                    },
                                },
                            })
                        }}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="w-3/5 flex flex-row items-center justify-end sm:gap-10">
                    <span className="text-right w-[50px] sm:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result)}</span>
                    <span className={"text-right w-[100px] sm:w-[200px] " + (mode === 'pro' ? 'text-xs' : '')}>{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[3].result)} {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                    <span className="font-bold text-right w-[100px] sm:w-[200px]">{(chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + (chain === 'monad' && mode === 'pro' ? 'MON' : '') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result * res[3].result)}</span>
                </div>
            </div>
        )}
    </main>
  );
}
