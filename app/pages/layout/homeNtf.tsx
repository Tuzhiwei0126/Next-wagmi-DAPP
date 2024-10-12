'use client'
import { cn } from '../../../lib/utils'
import Marquee from '../../..//components/ui/marquee'
import React, { useState, useEffect } from 'react'
import {
  Address,
  NFTImage,
  Connector,
  ConnectButton,
  useAccount,
  useProvider,
} from '@ant-design/web3'
const network_id = '1' // 参考 <https://docs.chainbase.com/reference/supported-chains> 获取不同网络的 ID。

const ReviewCard = ({ id, type }) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-2xl border',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}
    >
      <NFTImage
        address={
          type == 'aku'
            ? '0xed5af388653567af2f388e6224dc7c4b3241c544'
            : '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
        }
        tokenId={id}
        width={255}
      />
    </figure>
  )
}

export function HomeNtf() {
  const [data, setData] = useState([])

  const reviews = [
    {
      id: '1',
    },
    {
      id: '66',
    },
    {
      id: '666',
    },
    {
      id: '888',
    },
    {
      id: '999',
    },
    {
      id: '1000',
    },
    {
      id: '2000',
    },
  ]
  const getNTF = (type, token_id = '1') => {
    const aku_contract_addr = '0xed5af388653567af2f388e6224dc7c4b3241c544' // 以 Azuki 合约地址为例。
    const bayc_contract_addr = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

    const CHAINBASE_API_KEY = '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y'
  }

  const firstRow = reviews.slice(0, reviews.length)
  const secondRow = reviews.slice(0, reviews.length)
  return (
    <div className="next_ntf_box absolute flex h-[400px] w-full flex-col items-center  overflow-hidden rounded-lg  bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} type="aku" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} type="bayc" />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
