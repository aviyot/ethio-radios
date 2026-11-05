"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import StationIcon from "./StationIcon";
import type { Radio } from "../types";

interface RadioGridProps {
  radios: Radio[];
}

export default function RadioGrid({ radios }: RadioGridProps) {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-2xl">
      <p className="mb-4 text-center text-xs uppercase tracking-widest text-white/60">
        Stations
      </p>
      <ul className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {radios.map((radio) => {
          const href = `/${radio.id}`;
          const isActive = pathname === href;

          return (
            <li key={radio.id} className="min-w-0">
              <Link
                href={href}
                className={`radio-card block h-full min-w-0 rounded-2xl p-px transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive ? "radio-card-active" : ""
                }`}
              >
                <span className="flex h-full min-w-0 items-center justify-center gap-2 rounded-2xl bg-black/55 px-3 py-3.5 text-center text-sm font-medium text-white sm:text-base">
                  <StationIcon
                    contact={radio.contact}
                    icon={radio.icon}
                    size={18}
                    loading="lazy"
                    className="h-5 w-5 rounded-sm bg-white/90 p-0.5"
                  />
                  <span className="min-w-0 break-words">{radio.name}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
