"use client";

import Image from "next/image";
import List from "./pages/list";
import Navbar from "./pages/dock";
import RetroGrid from "@/components/ui/retro-grid";

import { injected, walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// wagmi 用来创建配置的方法 wagmi 用来创建
// HTTP JSON RPC 连接的方法，通过它你可以通过 HTTP 请求访问区块链
import { useReadContract, useWriteContract } from "wagmi";
import { createConfig, http, useWatchContractEvent } from "wagmi";
//mainnet：代表以太坊主网
import { mainnet, goerli, polygon, hardhat } from "wagmi/chains";
//Ant Design Web3 用来接收 wagmi 配置的 Providers
import {
  WagmiWeb3ConfigProvider,
  MetaMask,
  WalletConnect,
  Mainnet,
  Goerli,
  Polygon,
  Hardhat,
} from "@ant-design/web3-wagmi";
// import { parseEther } from "viem"
import {
  Address,
  NFTCard,
  Connector,
  ConnectButton,
  useAccount,
  useProvider,
} from "@ant-design/web3";
import { config } from "./config";
import { BoxRevealDemo } from "../app/pages/layout/nextHome";

import { HomeNtf } from "../app/pages/layout/homeNtf";

import { SendTransaction } from "../app/pages/Transaction/Transaction";
import { getAccount } from "@wagmi/core";

const account = getAccount(config);
console.log(account, "accountaccount");
const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      ens
      balance
      chains={[mainnet, Polygon, Hardhat, Goerli]}
      wallets={[MetaMask(), WalletConnect()]}
      transports={{
        [Mainnet.id]: http(),
        [Polygon.id]: http(),
        [Hardhat.id]: http(),
        [Goerli.id]: http(),
      }}
      eip6963={{
        autoAddInjectedWallets: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/** ... */}
        <div>
          <Navbar />
          <div className="next_main relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <HomeNtf />

            <BoxRevealDemo />
            <SendTransaction />
            {/* <List /> */}

            <RetroGrid />
          </div>
        </div>
      </QueryClientProvider>
      {/* <SendEth />
<SignDemo />
<NFTCard
  address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
  tokenId={641}
/>

<CallTest /> */}
    </WagmiWeb3ConfigProvider>
  );
}
