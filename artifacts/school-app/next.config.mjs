/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }, { hostname: "res.cloudinary.com" }],
  },
  env: {
    // Forward the Clerk publishable key so Next.js client components can access it.
    // CLERK_PUBLISHABLE_KEY is provisioned as a secret by Replit's Clerk integration.
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
