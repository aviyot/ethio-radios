"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getStationIconCandidates } from "../lib/favicon";
import type { Radio } from "../types";

interface RadioGridProps {
  radios: Radio[];
}

export default function RadioGrid({ radios }: RadioGridProps) {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-6xl">
      <p className="mb-4 text-center text-xs uppercase tracking-widest text-white/60">
        Stations
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {radios.map((radio) => {
          const href = `/${radio.id}`;
          const isActive = pathname === href;
          const iconCandidates = getStationIconCandidates(radio.icon, radio.contact);
          const primaryIconUrl = iconCandidates[0] ?? "";

          return (
            <li key={radio.id}>
              <Link
                href={href}
                className={`radio-card block rounded-2xl p-px transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 ${
                  isActive ? "radio-card-active" : ""
                }`}
              >
                <span className="flex items-center justify-center gap-2 rounded-2xl bg-black/55 px-3 py-3.5 text-center text-sm font-medium text-white sm:text-base">
                  {primaryIconUrl ? (
                    <img
                      src={primaryIconUrl}
                      alt=""
                      width={18}
                      height={18}
                      loading="lazy"
                      data-icon-candidates={iconCandidates.join("|")}
                      data-icon-index="0"
                      className="h-5 w-5 rounded-sm bg-white/90 p-0.5"
                      onError={(event) => {
                        const candidates =
                          event.currentTarget.dataset.iconCandidates?.split("|") ?? [];
                        const currentIndex = Number(event.currentTarget.dataset.iconIndex ?? "0");
                        const nextIndex = currentIndex + 1;

                        if (nextIndex < candidates.length) {
                          event.currentTarget.dataset.iconIndex = String(nextIndex);
                          event.currentTarget.src = candidates[nextIndex];
                          return;
                        }

                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <span>{radio.name}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
