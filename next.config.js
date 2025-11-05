/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'supabase.co'],
  },
  // Force fresh build - v3
  generateBuildId: async () => {
    return 'bananaprompts-v3-' + Date.now()
  },
}

module.exports = nextConfig