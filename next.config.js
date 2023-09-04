/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lessons/lesson-1",
        permanent: false,
      },
      {
        source: "/lessons",
        destination: "/lessons/lesson-1",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
