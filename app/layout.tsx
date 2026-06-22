import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import MainShell from "@/components/layout/MainShell";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Providers from "@/components/Providers";
import DomainProvider from "@/components/DomainProvider";
import { getDomainConfig } from "@/config";
import { buildPageTitle } from "@/utils/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getDomainConfig();

  return {
    title: buildPageTitle(config.seo.title, config.name),
    description: config.seo.description,
    keywords: config.seo.keywords,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getDomainConfig();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <DomainProvider config={config}>
            <Navbar config={config} />
            <MainShell>{children}</MainShell>
            <Footer config={config} />
            <MobileBottomBar config={config} />
            <WhatsAppButton config={config} />
          </DomainProvider>
        </Providers>
      </body>
    </html>
  );
}
