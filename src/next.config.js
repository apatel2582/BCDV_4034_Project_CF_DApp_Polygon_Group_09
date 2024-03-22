/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.infura.io",
      "fundme.infura-ipfs.io",
      "rose-wonderful-yak-265.mypinata.cloud",
    ],
  },
};

module.exports = nextConfig;
