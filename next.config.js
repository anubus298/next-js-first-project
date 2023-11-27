/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customUrl: 'http://localhost:8000',
    pocketBaseUrl: 'http://127.0.0.1:8090',
  },
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
