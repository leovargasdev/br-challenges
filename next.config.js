/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.prismic.io',
      'media-exp1.licdn.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig
