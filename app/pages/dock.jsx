"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../../components/ui/navbar-menu";
import { useAccount } from "wagmi";
import { cn } from "../../lib/utils";
import { BorderBeam } from "../../components/ui/border-beam";
import ConnectCom from "../pages/wallet/clientWallet";
import { Account } from "../pages/wallet/account";

function ConnectWallet() {
  const { isConnected } = useAccount();
  // console.log(isConnected, "isConnected");
  // if (isConnected) return <Account />;
  return <ConnectCom />;
}

const NavbarDemo = () => {
  return (
    <div className="relative w-full  flex items-center justify-center ">
      <Navbar className="top-1 next_header" />
      <BorderBeam />
      {/* <div className="relative h-[80px] w-full rounded-xl">
        <BorderBeam />
      </div> */}
    </div>
  );
};

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "fixed flex header_box top-10 inset-x-0  mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="NTF">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">持有NTF</HoveredLink>
            <HoveredLink href="/interface-design">最新免费Mint</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="工具库">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">转账</HoveredLink>
            <HoveredLink href="/individual">批量转账</HoveredLink>
            <HoveredLink href="/team">批量归集</HoveredLink>
            <HoveredLink href="/enterprise"></HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="钱包相关">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">生成靓号钱包</HoveredLink>
            <HoveredLink href="/individual">记住词生成钱包</HoveredLink>
            <HoveredLink href="/team">密钥生成钱包</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="实时监听">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">监听聪明钱包</HoveredLink>
            <HoveredLink href="/individual">监听交易所大额异动</HoveredLink>
            <HoveredLink href="/team">密钥生成钱包</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ERC721">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">发行ERC721</HoveredLink>
            <HoveredLink href="/individual">监听交易所大额异动</HoveredLink>
            <HoveredLink href="/team">密钥生成钱包</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ERC20">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">发行ERC20Token</HoveredLink>
            <HoveredLink href="/individual">监听交易所大额异动</HoveredLink>
            <HoveredLink href="/team">密钥生成钱包</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
      <div className="header_wallet">
        <ConnectWallet />
      </div>
    </div>
  );
}
export default NavbarDemo;
