'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Particles from '../../components/ui/particles';
import { SendTransaction } from '../pages/Transaction/Transaction';

import { MagicCard } from '../../components/ui/magic-card';
export default function ParticlesDemo() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"></span>
      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={80}
        color={color}
        refresh
      />
      <div>
        <div>
          <div className={'MagicCard_box full flex'}>
            <MagicCard
              gradientSize={300}
              className="full cursor-pointer whitespace-nowrap p-8 text-4xl shadow-2xl"
              gradientColor={
                theme === 'dark' ? 'rgb(255, 153, 102)' : 'rgb(255, 153, 102)'
              }
            >
              <SendTransaction />
            </MagicCard>
            <MagicCard
              className="full cursor-pointer whitespace-nowrap p-8 text-4xl shadow-2xl"
              gradientColor={
                theme === 'dark' ? 'rgb(78, 84, 200)' : 'rgb(78, 84, 200)'
              }
              gradientSize={300}
            >
              <SendTransaction />
            </MagicCard>
          </div>
        </div>
      </div>
    </div>
  );
}
