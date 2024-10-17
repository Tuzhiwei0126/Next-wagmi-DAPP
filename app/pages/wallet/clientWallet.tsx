'use client';

import type { ConnectorTriggerProps } from '@ant-design/web3';
import {
  ConnectButton,
  Connector,
  PayPanel,
  type Chain,
} from '@ant-design/web3';
import {
  BSC,
  Mainnet,
  Polygon,
  USDT,
  metadata_MetaMask,
  metadata_TokenPocket,
  metadata_imToken,
} from '@ant-design/web3-assets';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import { useGasPrice } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import HyperText from '../../../components/ui/hyper-text';
import { RainbowButton } from '../../../components/ui/rainbow-button';

export function RainbowButtonDemo() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>;
}

const CustomTrigger: React.FC<ConnectorTriggerProps> = (props) => {
  const { loading, onConnectClick, account } = props;
  return (
    <h1 onClick={() => onConnectClick?.()}>
      9999
      {loading ? 'Connecting...' : account?.address || 'Connect Your Wallet'}
    </h1>
  );
};

const ConnectCom: React.FC = () => {
  const [chain, setChain] = React.useState<Chain>(Polygon);
  const [open, setOpen] = useState(false);
  const [gas, setGas] = useState('');
  const result = useGasPrice({
    chainId: mainnet.id,
    scopeKey: 'foo',
  });
  useEffect(() => {
    if (result.data) {
      console.log(formatUnits(result.data, 9), 'result.data ');
      setGas(formatUnits(result.data, 9));
    }
  }, [result]);

  // console.log(ethers.formatUnits(result.data, 9), 'resultresult');
  // console.log(parseUnits(result.data + '', 9), 'result.data');

  // setGas(formatUnits(result.data, 9));
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} footer={null} width={450} onCancel={hideModal}>
        <PayPanel
          target={{
            [Mainnet.id]: '0xF663331cDBA5585CDd0191da5F85b7c490C47304',
            [BSC.id]: '0x35ceCD3d51Fe9E5AD14ea001475668C5A5e5ea76',
          }}
          supportedChains={[{ chain: Mainnet }, { chain: BSC }]}
          token={USDT}
          amount={parseUnits('3', USDT.decimal)}
          wallets={[metadata_MetaMask, metadata_imToken, metadata_TokenPocket]}
          onFinish={() => {
            hideModal();
            console.log('complete');
          }}
        />
      </Modal>

      <div>
        <RainbowButton className="play_button" onClick={showModal}>
          PayPanel
        </RainbowButton>
      </div>
      <div className="pice_gas">
        <HyperText
          className="text-1xl font-bold text-black dark:text-white"
          text={'Gas:' + `${gas}` + 'gwei'}
        />
      </div>

      <div>
        <Connector>
          <ConnectButton />
        </Connector>
      </div>
    </>
  );
};
export default ConnectCom;
