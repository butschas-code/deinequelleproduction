import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
