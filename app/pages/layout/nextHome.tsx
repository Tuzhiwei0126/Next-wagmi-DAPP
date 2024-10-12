'use client'
import BoxReveal from '../../../components/ui/box-reveal'
import React from 'react'
export function BoxRevealDemo() {
  return (
    <div className="max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={'#5046e6'} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          Magic UI<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>
      <BoxReveal boxColor={'#5046e6'} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          UI library for
          <span className="text-[#5046e6]">Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={'#5046e6'} duration={0.5}>
        <h3>333</h3>
      </BoxReveal>
    </div>
  )
}
