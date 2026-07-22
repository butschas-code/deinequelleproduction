import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  // Allow HMR + dev assets when accessing the dev server from your LAN IP.
  // Add additional IPs / hostnames as needed (IP may change per network).
  allowedDevOrigins: ["192.168.0.242", "172.20.10.10", "*.local"],
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
        statusCode: 301,
      },
      {
        source: "/leistungen/",
        destination: "/leistungen/kinesiologie",
        statusCode: 301,
      },
      {
        source: "/kinesiologie-kt",
        destination: "/leistungen/kinesiologie",
        statusCode: 301,
      },
      {
        source: "/kinesiologie-kt/",
        destination: "/leistungen/kinesiologie",
        statusCode: 301,
      },
      {
        source: "/sport-kinesiologie",
        destination: "/leistungen/sport-kinesiologie",
        statusCode: 301,
      },
      {
        source: "/sport-kinesiologie/",
        destination: "/leistungen/sport-kinesiologie",
        statusCode: 301,
      },
      {
        source: "/yoga",
        destination: "/leistungen/yoga",
        statusCode: 301,
      },
      {
        source: "/yoga/",
        destination: "/leistungen/yoga",
        statusCode: 301,
      },
      {
        source: "/kinderwunsch",
        destination: "/leistungen/kinderwunsch",
        statusCode: 301,
      },
      {
        source: "/kinderwunsch/",
        destination: "/leistungen/kinderwunsch",
        statusCode: 301,
      },
      {
        source: "/infos",
        destination: "/kontakt",
        statusCode: 301,
      },
      {
        source: "/infos/",
        destination: "/kontakt",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
