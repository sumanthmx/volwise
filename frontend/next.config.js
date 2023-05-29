/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/dinesh/:path*',
        destination: 'http://localhost:5000/api/:path*', // Replace with your Flask API URL
      },
    ];
  },
};
