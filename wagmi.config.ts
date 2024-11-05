import { defineConfig } from '@wagmi/cli';
import { hardhat, react } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'utils/generated.ts',

  plugins: [
    hardhat({
      project: './contract',
      exclude: [
        // the following patterns are excluded by default
        'build-info/**',
        '*.dbg.json',
      ],
      // 部署合约的地址配置
      deployments: {
        TToken: '0x314159265dd8dbb310642f98f50c066173c1259b',
        Exchange: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
      },
      //         // 定义命令及其执行脚本
      commands: {
        clean: 'pnpm hardhat clean', // 清理命令
        build: 'pnpm hardhat compile', // 构建命令
        rebuild: 'pnpm hardhat compile', // 重新构建命令
      },
    }),

    react(),
  ],
});
