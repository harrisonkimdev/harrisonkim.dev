const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['i.imgur.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config) {
    // Audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    
    return config;
  },
}

module.exports = nextConfig
