import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

import { NavbarComponent } from "@/components/OldNavbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Financial Tracker",
  description: "Track your spending and investments",
};

export default async function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main
            className="container mx-auto mt-8 px-4"
            style={{ minHeight: "calc(100vh - 210px)" }}
          >
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
