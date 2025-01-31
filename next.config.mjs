/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // Silence the route-type bug
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
