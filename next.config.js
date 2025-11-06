/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'supabase.co'],
  },
  // Force completely fresh build - no cache
  generateBuildId: async () => {
    return 'fresh-' + Date.now()
  },
}

module.exports = nextConfig