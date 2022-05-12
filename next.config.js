/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  assetPrefix:
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? 'http://lifecycle.kro.kr'
      : '',
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

module.exports = nextConfig;
