/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  images:{
    remotePatterns : [
      {
        hostname :'127.0.0.1',
        protocol:'http',
        port : '8090',
        pathname : '/api/files/**'
        
      }
    ]
  }
};

module.exports = nextConfig;
