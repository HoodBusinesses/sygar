/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ensure fs and other Node.js modules are only used in Electron main process
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false, // Add any other Node.js modules that may cause issues
      };
    }
    return config;
  },
}
