import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { radioSrcs } from "./data/radio_list";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethiopia Radio",
  description: "Ethiopia Live Radion Station",
};

const RadioLinks = ["sheger_102.1", "ethio_107.8", "bisra_101.1", "addis_97.1"];

export default function RootLayout({ children }) {
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
