import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethiopia Radio",
  description: "Ethiopia Live Radion Station",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100">
          <h2 className="btn btn-ghost text-xl">Ethiopia Radios</h2>
        </div>
        {children}
      </body>
    </html>
  );
}
