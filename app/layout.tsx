import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";

import RadioGrid from "./components/RadioGrid";
import { radioSrcs } from "./data/radio_list";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethiopia Radio",
  description: "Ethiopia Live Radion Station",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-shell">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/35 px-4 py-4 backdrop-blur-md sm:px-6">
            <h1 className="bg-linear-to-r from-primary via-accent to-danger bg-clip-text text-center text-xl font-semibold uppercase tracking-widest text-transparent sm:text-3xl sm:tracking-widest">
              Ethiopia Radios
            </h1>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10">
            {children}
            <RadioGrid radios={radioSrcs} />
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
