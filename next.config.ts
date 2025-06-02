import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/wvnSDjWB/logo.png",
      },
    ],
  },
};

export default nextConfig;