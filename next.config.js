/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customUrl: "http://localhost:8000",
    pocketBaseUrl:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8090/"
        : "https://safomart-app.pockethost.io/",
  },
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },

  images: {
    remotePatterns: [
      {
        hostname: "safomart-app.pockethost.io",
        protocol: "https",
        pathname: "/api/files/**",
      },
      {
        hostname: "127.0.0.1",
        protocol: "http",
        port: "8090",
        pathname: "/api/files/**",
      },
    ],
     
    unoptimized: true,
  
  },
};

module.exports = nextConfig;
