import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
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
        <div className="navbar border-b min-h-0">
          <h1 className="text-xl uppercase">Ethiopia Radios</h1>
        </div>
        <div className="flex flex-col gap-8">
          {children}
          <ul className="flex flex-wrap gap-2 m-2 justify-center">
            {radioSrcs.map((radio) => (
              <li
                key={radio.id}
                className="border rounded-lg p-2 hover:border-primary active:bg-primary"
              >
                <Link className="" href={`/${radio.id}`}>
                  {radio.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
}
