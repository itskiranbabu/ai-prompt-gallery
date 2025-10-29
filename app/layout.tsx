import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Prompt Gallery - Discover & Share Amazing AI Prompts',
  description: 'Browse thousands of AI-generated images with their exact prompts. Learn from the community, copy prompts, and create stunning AI art with Midjourney, DALL-E, Stable Diffusion.',
  keywords: 'AI prompts, Midjourney prompts, DALL-E prompts, AI art, prompt gallery, AI images, stable diffusion prompts',
  openGraph: {
    title: 'AI Prompt Gallery - Creative Hub',
    description: 'Discover trending AI images and the prompts behind them',
    url: 'https://ai-prompt-gallery-eight.vercel.app',
    siteName: 'AI Prompt Gallery',
    images: [
      {
        url: 'https://ai-prompt-gallery-eight.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Gallery',
    description: 'Discover trending AI images and prompts',
    images: ['https://ai-prompt-gallery-eight.vercel.app/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
