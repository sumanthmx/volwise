/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/report/:path*',
        destination: 'http://localhost:5000/api/:path*', // Replace with your Flask API URL
      },
    ];
  },
};
