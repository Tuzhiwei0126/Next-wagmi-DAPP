'use client'

import React, { useState } from 'react'
import type { Account, ConnectorTriggerProps } from '@ant-design/web3'
import { Connector, ConnectButton, type Chain  } from '@ant-design/web3'
import { RainbowButton } from '../../../components/ui/rainbow-button'
import { PayPanel } from '@ant-design/web3'
import {
  BSC,
  Polygon,
  Mainnet,
  metadata_imToken,
  metadata_MetaMask,
  metadata_TokenPocket,
  USDT,
} from '@ant-design/web3-assets'
import { Modal } from 'antd'
import { parseUnits } from 'viem'
export function RainbowButtonDemo() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>
}

const CustomTrigger: React.FC<ConnectorTriggerProps> = (props) => {
  const { loading, onConnectClick, account } = props
  return (
    <h1 onClick={() => onConnectClick?.()}>
      9999
      {loading ? 'Connecting...' : account?.address || 'Connect Your Wallet'}
    </h1>
  )
}

const ConnectCom: React.FC = () => {
  const [chain, setChain] = React.useState<Chain>(Polygon)
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }
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
          amount={parseUnits('1', USDT.decimal)}
          wallets={[metadata_MetaMask, metadata_imToken, metadata_TokenPocket]}
          onFinish={() => {
            hideModal()
            console.log('complete')
          }}
        />
      </Modal>
      <div>
        <RainbowButton className="play_button" onClick={showModal}>
          PayPanel
        </RainbowButton>
      </div>
      <div>
    
        <Connector>
        <ConnectButton />
        </Connector>
      </div>
    </>
  )
}
export default ConnectCom
