/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      'lifecycle-s3.s3.ap-northeast-2.amazonaws.com',
      'lifecycle.kro.kr',
    ],
  },
  assetPrefix:
    process.env.NODE_ENV === 'production' ? 'http://lifecycle.kro.kr' : '',
  webpack(conf) {
    conf.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });
    conf.resolve.modules.push(__dirname);
    return conf;
  },
};

module.exports = withBundleAnalyzer({ nextConfig });
