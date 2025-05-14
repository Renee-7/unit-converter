import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '单位转换器 | Unit Converter',
  description: '一个优雅、直观的网页版单位转换工具，轻松转换温度、长度、重量、容量等单位',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
} 