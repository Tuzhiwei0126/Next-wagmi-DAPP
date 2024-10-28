'use client';

import type { CryptoInputProps } from '@ant-design/web3';
import { Address, CryptoInput } from '@ant-design/web3';
import { ETH, USDT } from '@ant-design/web3-wagmi';
import { getAccount } from '@wagmi/core';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import {
  BaseError,
  useBalance,
  useEstimateFeesPerGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { config } from '../../config';

import { Button } from 'antd';
import TypingAnimation from '../../../components/ui/typing-animation';

const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const ETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const AddressInput = (props) => {
  const { id, value = {}, onChange } = props;
  const [address, setAddress] = useState('');
  const triggerChange = (changedValue) => {
    onChange?.({
      address,
      ...value,
      ...changedValue,
    });
  };
  const onNumberChange = (e) => {
    console.log(e, 'onNumberChange');

    setAddress(e);
    triggerChange({
      address: e,
    });
  };

  return (
    <span id={id}>
      <TypingAnimation
        className="mb-10 text-2xl font-bold text-black dark:text-white"
        text="接收方地址&Token代币数量"
      />
      <TextArea
        className="w-40"
        placeholder="请输入接收方的地址! ox地址格式"
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
        value={value.address || address}
        onChange={(e) => onNumberChange(e.target.value)}
        style={{
          backgroundColor: 'transparent',
        }}
      />
    </span>
  );
};
const AmountInput = (props) => {
  // @ts-ignore
  const account = getAccount(config);
  const balance = useBalance({
    address: account.address,
    config,
  });
  const [tokenBalance, setTokenBalance] =
    useState<CryptoInputProps['balance']>();

  const getETHPrice = (type) => {
    const options = {
      method: 'GET',
      headers: { 'x-api-key': '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y' },
    };
    fetch(
      `https://api.chainbase.online/v1/token/price?chain_id=1&contract_address=${type == 'ETH' ? ETH_CONTRACT : USDT_CONTRACT}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data, '  response.data;');
        setTokenBalance({
          // @ts-ignore
          amount: balance?.data?.value as bigint,
          unit: '$',
          price: response?.data?.price,
        });
      })
      .catch((err) => console.error(err));
  };
  const [crypto, setCrypto] = useState<CryptoInputProps['value']>({
    token: ETH,
    inputString: '',
    amount: undefined,
  });

  useEffect(() => {
    getETHPrice('ETH');
  }, []);
  const { id, value = {}, onChange } = props;
  const triggerChange = (changedValue) => {
    onChange?.({
      crypto,
      ...value,
      ...changedValue,
    });
  };
  const onCryptoChange = (e) => {
    console.log(e, 'onCryptoChange');
    setCrypto(e);
    getETHPrice(e?.token?.symbol);
    triggerChange({
      crypto: e,
    });
  };

  return (
    <span id={id}>
      <div>
        <CryptoInput
          className="w-40"
          value={crypto}
          balance={tokenBalance}
          header={'输入Token数量'}
          onChange={(value) => {
            onCryptoChange(value);
          }}
          options={[ETH, USDT]}
        />
      </div>
      {/* <CryptoPrice value={balance?.data?.value} /> */}
    </span>
  );
};

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  // console.log(account, 'accountaccount');
  // console.log(balance?.data?.value, 'balance');

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { data } = useEstimateFeesPerGas({
    config,
    formatUnits: 'gwei',
  });
  // console.log(formatUnits(result.data?.formatted?.maxFeePerBlobGas, 6), 322);
  console.log(data?.formatted.maxFeePerGas, 322);

  const [submittable, setSubmittable] = React.useState(false);

  const onFinish = (values) => {
    const to = '0xF663331cDBA5585CDd0191da5F85b7c490C47304';
    const value = values.crypto.crypto;
    sendTransaction({ to, value: parseEther(value) });
    console.log(values, 122);
    console.log('Received values from form: ', value);
  };
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        name="validateOnly"
        // layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="address"
          label=""
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AddressInput />
        </Form.Item>
        <Form.Item
          name="crypto"
          label=""
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AmountInput />
        </Form.Item>

        <Form.Item>
          <div>
            预估最大gas: {Number(data?.formatted.maxFeePerGas).toFixed(1)} gwei
          </div>
          <Button
            size="large"
            disabled={isPending}
            type="primary"
            htmlType="submit"
            className="CryptoInput_class"
          >
            {isPending ? 'Confirming...' : 'Send'}
          </Button>

          {hash && (
            <div>
              Transaction Hash:
              <Address
                ellipsis={{
                  headClip: 8,
                  tailClip: 6,
                }}
                copyable
                address={hash}
              />
            </div>
          )}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
