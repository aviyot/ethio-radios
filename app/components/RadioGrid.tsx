"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Radio } from "../types";

interface RadioGridProps {
  radios: Radio[];
}

export default function RadioGrid({ radios }: RadioGridProps) {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-6xl">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.35em] text-white/60">Stations</p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {radios.map((radio) => {
          const href = `/${radio.id}`;
          const isActive = pathname === href;

          return (
            <li key={radio.id}>
              <Link
                href={href}
                className={`radio-card block rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] ${
                  isActive ? "radio-card-active" : ""
                }`}
              >
                <span className="block rounded-2xl bg-black/55 px-3 py-3.5 text-center text-sm font-medium text-white sm:text-base">
                  {radio.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
