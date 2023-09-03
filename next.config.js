/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lessons/lesson-1",
        permanent: true,
      },
      {
        source: "/lessons",
        destination: "/lessons/lesson-1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
