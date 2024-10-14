'use client';

import RetroGrid from '@/components/ui/retro-grid';

// wagmi 用来创建配置的方法 wagmi 用来创建
// HTTP JSON RPC 连接的方法，通过它你可以通过 HTTP 请求访问区块链
//mainnet：代表以太坊主网
//Ant Design Web3 用来接收 wagmi 配置的 Providers
// import { parseEther } from "viem"
import { BoxRevealDemo } from '../app/pages/layout/nextHome';
import { config } from './config';

import { HomeNtf } from '../app/pages/layout/homeNtf';

import { getAccount } from '@wagmi/core';

const account = getAccount(config);
console.log(account, 'accountaccount');

export default function Home() {
  return (
    <>
      <HomeNtf />
      <BoxRevealDemo />
      <RetroGrid />
    </>
  );
}
