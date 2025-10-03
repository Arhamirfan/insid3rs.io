/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
}

// module.exports = nextConfig

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: "/events",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
