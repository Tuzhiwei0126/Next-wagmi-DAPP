import { defineConfig } from '@wagmi/cli';
import { hardhat, react } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'utils/contracts.ts',
  plugins: [
    hardhat({
      project: './contract',
      // 部署合约的地址配置
      //  deployments: {
      //       YexiyueToken: address["YexiyueTokenModule#YexiyueToken"] as any,
      //       Exchange: address["Exchange#Exchange"] as any,
      //     },
      //         // 定义命令及其执行脚本
      //         commands: {
      //           clean: "pnpm hardhat clean", // 清理命令
      //           build: "pnpm hardhat compile", // 构建命令
      //           rebuild: "pnpm hardhat compile", // 重新构建命令
      //         },
    }),

    react(),
  ],
});
