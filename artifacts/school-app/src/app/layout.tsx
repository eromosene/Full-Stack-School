import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yemsol Private Schools",
  description: "Yemsol Private Schools management system",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : "http://localhost:3000")
  ),
  icons: {
    icon: "/yemsol-logo.png",
  },
  openGraph: {
    title: "Yemsol Private Schools",
    description: "Yemsol Private Schools management system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
