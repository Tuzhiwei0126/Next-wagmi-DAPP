'use client';
import { NFTImage } from '@ant-design/web3';
import { useState } from 'react';
import Marquee from '../../..//components/ui/marquee';
import { cn } from '../../../lib/utils';
const network_id = '1'; // 参考 <https://docs.chainbase.com/reference/supported-chains> 获取不同网络的 ID。

const ReviewCard = ({ id, address }) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-2xl border',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <NFTImage address={address} tokenId={id} />
    </figure>
  );
};

export function HomeNtf() {
  const [data, setData] = useState([]);

  const reviews = [
    {
      id: 666,
      address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
    },
    {
      id: 9987,
      address: '0x123b30e25973fecd8354dd5f41cc45a3065ef88c',
    },
    {
      id: 126,
      address: '0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69',
    },
    {
      id: 99,
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    },
    {
      id: 114,
      address: '0x123b30e25973fecd8354dd5f41cc45a3065ef88c',
    },
    {
      id: 4160,
      address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
    },
    {
      id: 1097,
      address: '0x79fcdef22feed20eddacbb2587640e45491b757f',
    },
    {
      id: 2232,
      address: '0x123b30e25973fecd8354dd5f41cc45a3065ef88c',
    },
    {
      id: 3636,
      address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
    },
    {
      id: 123,
      address: '0x620b70123fB810F6C653DA7644b5dD0b6312e4D8',
    },
    {
      id: 23223,
      address: '0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69',
    },
  ];
  const getNTF = (type, token_id = '1') => {
    const CHAINBASE_API_KEY = '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y';
  };

  const firstRow = reviews.slice(0, reviews.length);
  const secondRow = reviews.slice(0, reviews.length);
  return (
    <div className="next_ntf_box absolute flex h-[400px] w-full flex-col items-center overflow-hidden rounded-lg bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} type="bayc" />
        ))}
      </Marquee> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
