/** @type {import('next').NextConfig} */

const intercept = require('intercept-stdout');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const interceptStdout = (text) => {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
};

intercept(interceptStdout);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
