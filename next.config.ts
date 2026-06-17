import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR + dev assets when accessing the dev server from your LAN IP.
  // Add additional IPs / hostnames as needed.
  allowedDevOrigins: ["192.168.0.242", "*.local"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/leistungen",
        destination: "/leistungen/kinesiologie",
        permanent: true,
      },
      {
        source: "/leistungen/",
        destination: "/leistungen/kinesiologie",
        permanent: true,
      },
      {
        source: "/kinesiologie-kt",
        destination: "/leistungen/kinesiologie",
        permanent: true,
      },
      {
        source: "/kinesiologie-kt/",
        destination: "/leistungen/kinesiologie",
        permanent: true,
      },
      {
        source: "/sport-kinesiologie",
        destination: "/leistungen/sport-kinesiologie",
        permanent: true,
      },
      {
        source: "/sport-kinesiologie/",
        destination: "/leistungen/sport-kinesiologie",
        permanent: true,
      },
      {
        source: "/yoga",
        destination: "/leistungen/yoga",
        permanent: true,
      },
      {
        source: "/yoga/",
        destination: "/leistungen/yoga",
        permanent: true,
      },
      {
        source: "/kinderwunsch",
        destination: "/leistungen/kinderwunsch",
        permanent: true,
      },
      {
        source: "/kinderwunsch/",
        destination: "/leistungen/kinderwunsch",
        permanent: true,
      },
      {
        source: "/infos",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/infos/",
        destination: "/kontakt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
