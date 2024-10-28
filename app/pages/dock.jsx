'use client';
import { useState } from 'react';
import { BorderBeam } from '../../components/ui/border-beam';
import {
  ClickLink,
  HoveredLink,
  Menu,
  MenuItem,
} from '../../components/ui/navbar-menu';

import { ExperimentOne, Frog } from '@icon-park/react';
import { VelocityScroll } from '../../components/ui/scroll-based-velocity';
import { cn } from '../../lib/utils';
import ConnectCom from '../pages/wallet/clientWallet';
function ConnectWallet() {
  // console.log(isConnected, "isConnected");
  // if (isConnected) return <Account />;
  return <ConnectCom />;
}

const NavbarDemo = () => {
  return (
    <>
      <div className="relative items-center justify-center">
        <Navbar className="next_header top-1" />

        <BorderBeam />

        {/* <div className="relative h-[80px] w-full rounded-xl">
          <BorderBeam />
        </div> */}
      </div>
    </>
  );
};

export function ScrollBasedVelocityDemo() {
  return (
    <VelocityScroll
      text="Velocity Scroll"
      default_velocity={5}
      className="nav_header_text font-display text-1xl l z-10 text-center font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:leading-[0.5rem]"
    />
  );
}
function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div
        className={cn('fixed inset-x-0 top-10 z-50 mx-auto', className)}
        onMouseLeave={() => setActive(null)}
      >
        <div className="header_box z-50">
          <a
            href="/"
            className="relative flex cursor-pointer justify-center space-x-8 border border-transparent bg-white px-8 py-6 shadow-input dark:border-white/[0.2] dark:bg-black"
          >
            <Frog theme="two-tone" size="28" fill={['#333', '#7ed321']} />
          </a>
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="NTF">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-dev">持有NTF</HoveredLink>
                <HoveredLink href="/interface-design">最新免费Mint</HoveredLink>
                <HoveredLink href="/seo">
                  Search Engine Optimization
                </HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="工具库">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/pages">转账</HoveredLink>
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
            <ClickLink href="/pages/Hobby">
              Swap
              <ExperimentOne
                theme="two-tone"
                size="24"
                fill={['#333', '#7ed321']}
              />
            </ClickLink>
            <ClickLink href="/pages/Pool">
              Pool
              <ExperimentOne
                theme="two-tone"
                size="24"
                fill={['#333', '#7ed321']}
              />
            </ClickLink>
            {/* <MenuItem
      setActive={setActive}
      active={active}
      href="/hobby"
      item="swap"
    ></MenuItem> */}
          </Menu>
          <div className="header_wallet ml-auto">
            <ConnectWallet />
          </div>
        </div>
        <ScrollBasedVelocityDemo />
      </div>
    </>
  );
}
export default NavbarDemo;
