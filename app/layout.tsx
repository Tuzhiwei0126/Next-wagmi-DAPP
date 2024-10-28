'use client';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './pages/dock';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// wagmi 用来创建配置的方法 wagmi 用来创建
// HTTP JSON RPC 连接的方法，通过它你可以通过 HTTP 请求访问区块链
import { http } from 'wagmi';
//mainnet：代表以太坊主网
import { mainnet } from 'wagmi/chains';
//Ant Design Web3 用来接收 wagmi 配置的 Providers
import {
  Goerli,
  Hardhat,
  Mainnet,
  MetaMask,
  Polygon,
  WagmiWeb3ConfigProvider,
  WalletConnect,
} from '@ant-design/web3-wagmi';
// import { parseEther } from "viem"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { config } from './config';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
                <AntdRegistry>{children}</AntdRegistry>
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
      </body>
    </html>
  );
}
