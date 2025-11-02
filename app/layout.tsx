import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Prompt Gallery - Community Prompt Studio',
  description: 'Discover and share AI-generated images with the prompts that power them. Browse cinematic AI videos, explore stunning artwork, and learn from the community.',
  keywords: 'AI prompts, Midjourney prompts, DALL-E prompts, AI art, prompt gallery, AI images, stable diffusion prompts, AI video prompts',
  openGraph: {
    title: 'AI Prompt Gallery - Community Prompt Studio',
    description: 'Share the prompts behind the art. Discover trending AI images and videos.',
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
    title: 'AI Prompt Gallery - Community Prompt Studio',
    description: 'Share the prompts behind the art',
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
