import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "../components/layout/site-header";
import { SiteFooter } from "../components/layout/site-footer";
import { FloatingCart } from "../components/cart/floating-cart";
import { CartProvider } from "../lib/cart-context";
import { siteConfig } from "../lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-background">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <CartProvider>
            <SiteHeader />
            <main className="flex-1 min-w-0 w-full">{children}</main>
            <SiteFooter />
            <FloatingCart />
          </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
