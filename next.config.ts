import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: [
      'https://cdn.pixabay.com',
      'https://encrypted-tbn0.gstatic.com',
      'https://i.blogs.es'
    ],
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
