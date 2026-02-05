/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    // New recommended config (replaces deprecated images.domains)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
    // Skip optimization for external images to avoid 404 issues
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    // Production image optimization
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Output configuration
  output: "standalone",
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

module.exports = nextConfig;
