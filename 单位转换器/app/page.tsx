'use client'

import { useState } from 'react'
import UnitConverter from '@/components/UnitConverter'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-sans text-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          单位转换器
        </h1>
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <UnitConverter />
        </div>
        
        <footer className="text-center text-gray-500 mt-20">
          <p>© {new Date().getFullYear()} 单位转换器 | Unit Converter</p>
        </footer>
      </div>
    </main>
  )
} 