/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/legacy/:path*"
      }
    ];
  }
};

export default nextConfig;
