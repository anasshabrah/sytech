/** @type {import('next').NextConfig} */

// Using ES module syntax (next.config.mjs)
const nextConfig = {
  // Keep trailing slashes on all routes
  trailingSlash: true,

  // Serve unoptimized images (useful for Vercel preview environments)
  images: {
    unoptimized: true,
  },

  // Silence TypeScript build errors in production
  typescript: {
    ignoreBuildErrors: true,
  },

  // Suppress deprecation warnings originating in node_modules
  sassOptions: {
    quietDeps: true,
  },
};

export default nextConfig;
