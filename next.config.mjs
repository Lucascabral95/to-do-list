// CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR 
// CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR 
// CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR CODIGO TITULAR 
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;









/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/',
          destination: '/app/hoy',
          permanent: true,
        },
        {
          source: '/blog/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  