'use client';
import {
  CryptoInput,
  type CryptoInputProps,
  type Token,
} from '@ant-design/web3';

import React, { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi';

import { CryptoPrice } from '@ant-design/web3';
import { ETH, USDT } from '@ant-design/web3-assets/tokens';
import { getAccount } from '@wagmi/core';
import { useBalance } from 'wagmi';
import { config } from '../../config';
export function SendTransaction() {
  const [ETHPRice, setETHPRice] = useState();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

  const ETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const account = getAccount(config);
  const balance = useBalance({
    address: account.address,
    config,
  });
  const getETHPrice = (type) => {
    const options = {
      method: 'GET',
      headers: { 'x-api-key': '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y' },
    };
    fetch(
      `https://api.chainbase.online/v1/token/price?chain_id=1&contract_address=${type !== 'ETH' ? ETH_CONTRACT : USDT_CONTRACT}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.data;
        setETHPRice(response?.data?.price);
      })
      .catch((err) => console.error(err));
  };

  // console.log(account, 'accountaccount');

  // console.log(balance?.data?.value, 'balance');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as `0x${string}`;
    const value = formData.get('value') as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [crypto, setCrypto] = useState<CryptoInputProps['value']>();

  const [tokenBalance, setTokenBalance] =
    useState<CryptoInputProps['balance']>();

  const handleQueryCrypto = async (token?: Token) => {
    if (!token) {
      return setTokenBalance(undefined);
    }

    // mock query token balance
    setTimeout(() => {
      setTokenBalance({
        amount: balance?.data?.value,
        unit: '$',
        price: ETHPRice,
      });
    }, 500);
  };
  useEffect(() => {
    getETHPrice('ETH');
  }, []);

  return (
    <form onSubmit={submit}>
      <div style={{ width: 456 }}>
        <CryptoInput
          value={crypto}
          balance={tokenBalance}
          header={'输入Token数量'}
          onChange={(value) => {
            console.log(value?.token?.symbol, 'value?.token?.symbol');
            setCrypto(value);
            getETHPrice(value?.token?.symbol);
            if (value?.token?.symbol !== crypto?.token?.symbol) {
              handleQueryCrypto(value?.token);
            }
          }}
          options={[ETH, USDT]}
        />
      </div>
      <CryptoPrice value={balance?.data?.value} />;
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? 'Confirming...' : 'Send'}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
