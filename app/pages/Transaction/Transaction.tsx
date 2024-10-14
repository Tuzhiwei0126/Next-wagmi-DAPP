'use client';

import type { CryptoInputProps } from '@ant-design/web3';
import { CryptoInput } from '@ant-design/web3';
import { Form } from 'antd';
import { config } from '../../config';

import { ETH, USDT } from '@ant-design/web3-wagmi';
import { getAccount } from '@wagmi/core';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import {
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { RainbowButton } from '../../../components/ui/rainbow-button';
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
          amount: balance?.data?.value,
          unit: '$',
          price: response?.data?.price,
        });
      })
      .catch((err) => console.error(err));
  };
  const [crypto, setCrypto] = useState<CryptoInputProps['value']>({
    token: ETH,
    inputString: '',
    amount: null,
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
const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    console.log(values, '123123');

    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <RainbowButton className="CryptoInput_class" disabled={!submittable}>
      Tranfor
    </RainbowButton>
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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.target, 'e.target');

    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as `0x${string}`;
    const value = formData.get('value') as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [submittable, setSubmittable] = React.useState(false);

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };
  const checkPrice = (value) => {
    console.log(value, 122);

    if (value.number as `0x${string}`) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入ox地址!'));
  };
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        cl
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
          <SubmitButton form={form}>Submit</SubmitButton>
        </Form.Item>
      </Form>

      {/* <form onSubmit={submit}>
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
      </form> */}
    </>
  );
}
