import { createConfig, http } from 'wagmi';
import { goerli, hardhat, mainnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const projectId = 'c07c0051c2055890eade3556618e38a6';

export const config = createConfig({
  chains: [mainnet, goerli, hardhat],
  syncConnectedChain: true,
  transports: {
    [mainnet.id]: http(
      'https://api.zan.top/node/v1/eth/mainnet/05ebb8f812a84375945d99a6f4cd59dc'
    ),
    [goerli.id]: http(
      'https://api.zan.top/node/v1/eth/mainnet/05ebb8f812a84375945d99a6f4cd59dc'
    ),
    [hardhat.id]: http('http://127.0.0.1:8545/'),
  },
  connectors: [
    injected({
      target: 'metaMask',
    }),
    walletConnect({
      projectId: 'c07c0051c2055890eade3556618e38a6',
      showQrModal: false,
    }),
  ],
});
