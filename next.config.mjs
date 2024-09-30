/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   esmExternals: "loose", // <-- Keeping this for external ES module support
  //   serverComponentsExternalPackages: ["mongoose"], // <-- Keeping this for mongoose
  // },
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true, // Keep top-level await support
  //     layers: true, // <-- Enable the 'layers' experiment to resolve the error
  //   };
  //   return config;
  // },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      mongoose: require.resolve('mongoose'),
    };
    return config;
  },
  experimental: {
    runtime: 'nodejs',
  },
};

export default nextConfig;
