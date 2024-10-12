'use client'
import { injected, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// wagmi 用来创建配置的方法 wagmi 用来创建
// HTTP JSON RPC 连接的方法，通过它你可以通过 HTTP 请求访问区块链
import { useReadContract, useWriteContract } from 'wagmi'
import { createConfig, http, useWatchContractEvent } from 'wagmi'
//mainnet：代表以太坊主网
import { mainnet, goerli, polygon, hardhat } from 'wagmi/chains'
// import { parseEther } from "viem"
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { cn } from '@/lib/utils'
import { AnimatedList } from '@/components/ui/animated-list'
const count = 10
const abi = [
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
  },
] as const

// 利用Alchemy的rpc节点连接以太坊网络
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const ALCHEMY_MAINNET_URL =
  'https://eth-mainnet.g.alchemy.com/v2/a1BY0o0X_ZBXFYNKDAIX_1XsayhnLA0e'
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)

// 合约地址
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 交易所地址
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// 构建ABI
const abi11 = [
  'event Transfer(address indexed from, address indexed to, uint value)',
  'function balanceOf(address) public view returns(uint)',
]

const Test = () => {
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    console.log(data, 333)
    console.log(list, 222)
  }, [data, list])
  useWatchContractEvent({
    address: accountBinance,
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      setData([...data, logs])
      console.log('bian', logs)
    },
  })
  // useWatchContractEvent({
  //   address: accountBinance,
  //   abi,
  //   args: {
  //     to: accountBinance,
  //   },
  //   eventName: 'Transfer',
  //   onLogs(logs) {
  //     setList(logs)
  //     console.log('转入币安', logs)
  //   },
  // })

  // useWatchContractEvent({
  //   address: accountBinance,
  //   abi,
  //   args: {
  //     to: null,
  //     from: accountBinance,
  //   },
  //   eventName: 'Transfer',
  //   onLogs(logs) {
  //     setData(logs)
  //     console.log('转出', logs)
  //   },
  // })

  return <div>1213</div>
}

const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`
const List = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  // 构建合约对象
  const contractUSDT = new ethers.Contract(addressUSDT, abi11, provider)

  const getEmitList = async () => {
    try {
      // 1. 读取币安热钱包USDT余额
      const toData = []
      const outData = []
      console.log('\n1. 读取币安热钱包USDT余额')
      const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
      console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}\n`)

      // 2. 创建过滤器，监听转移USDT进交易所
      console.log('\n2. 创建过滤器，监听USDT转进交易所')
      let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance)
      console.log('过滤器详情：')
      console.log(filterBinanceIn)
      contractUSDT.on(filterBinanceIn, (res) => {
        console.log('---------监听USDT进入交易所--------')
        toData.push({ ...res.args })
        console.log(toData, 'toDa221ta')
        setList([list, ...toData])
        console.log(
          `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(
            res.args[2],
            6,
          )}`,
        )
      })

      // 3. 创建过滤器，监听交易所转出USDT
      let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance)
      console.log('\n3. 创建过滤器，监听USDT转出交易所')
      console.log('过滤器详情：')

      contractUSDT.on(filterToBinanceOut, (res) => {
        console.log('---------监听USDT转出交易所--------')
        console.log(...res.args, 5115525)
        outData.push({ ...res.args })
        console.log(outData, 'outDat1a')
        // if (Number(ethers.formatUnits(res.args[2], 6)) > 100) {
        //   // Array.from(res.args, (args) => args.toString()).flat()

        // }
        setData(outData)
        console.log(
          `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(
            res.args[2],
            6,
          )}`,
        )
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    console.log(12331)
    // getEmitList()
  }, [])

  const Notification = ({ item }) => {
    console.log(item, 'itemitem')

    return (
      <figure
        className={cn(
          'relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl p-4',
          // animation styles
          'transition-all duration-200 ease-in-out hover:scale-[103%]',
          // light styles
          'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
          // dark styles
          'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: 'color',
            }}
          >
            <span className="text-lg">转入地址：</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
              <span className="text-sm sm:text-lg">{item[1]}</span>
              <span className="mx-1">·</span>
              {/* <span className="text-xs text-gray-500">{new Date()}</span> */}
            </figcaption>
            <p className="text-sm font-normal dark:text-white/60">
              {ethers.formatUnits(item[2], 6)}
            </p>
          </div>
        </div>
      </figure>
    )
  }

  // getEmitList()

  return (
    <div
      className={cn(
        'relative flex h-[500px] w-[500px] flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl',
      )}
    >
      <div>
        <div></div>
        <h2>币安交易所监听转入大额usdt数量</h2>
        {list.length}
        <h2>币安交易所监听转出大额usdt数量</h2>
        {data.length}
      </div>
      {/* <AnimatedList>
        {list.map((item, idx) => (
          <>
            <Notification item={item} key={idx} />
          </>
        ))}
      </AnimatedList> */}
    </div>
  )
}
export default List
