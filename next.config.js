/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customUrl: "http://localhost:8000",
    pocketBaseUrlo: "https://remarkable-gate.pockethost.io/",
    pocketBaseUrl: "http://127.0.0.1:8090/",
  },
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },

  images: {
    remotePatterns: [
      {
        hostname: "remarkable-gate.pockethost.io",
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
  },
};

module.exports = nextConfig;
