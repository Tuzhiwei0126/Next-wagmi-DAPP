import { CryptoInput, type CryptoInputProps } from '@ant-design/web3';
import { ETH, USDT } from '@ant-design/web3-wagmi';
import { getAccount } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { useBalance } from 'wagmi';
import { config } from '../../config';

const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const ETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
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

export default AmountInput;
