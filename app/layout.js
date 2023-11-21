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
        <div className="navbar justify-center border-b-2">
          <h2 className="text-xl uppercase text-center text-center">
            Ethiopia Radios
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {children}
          <ul className="flex flex-wrap gap-2 m-4 justify-center">
            {radioSrcs.map((radio) => (
              <li className="border-2 rounded-lg p-2">
                <Link key={radio.id} href={`/${radio.id}`}>
                  <span> {radio.name} </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
}
