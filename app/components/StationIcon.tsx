"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { getStationIconCandidates } from "../lib/favicon";

interface StationIconProps {
  contact: string;
  icon?: string;
  size: number;
  className: string;
  loading?: "lazy" | "eager";
}

export default function StationIcon({
  contact,
  icon,
  size,
  className,
  loading = "lazy",
}: StationIconProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const candidates = useMemo(
    () => getStationIconCandidates(icon, contact),
    [icon, contact],
  );
  const [index, setIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  if (isHidden || candidates.length === 0) {
    return null;
  }

  const src = candidates[index];

  useEffect(() => {
    const img = imgRef.current;

    if (!img) {
      return;
    }

    // If the resource failed before hydration, onError may not fire.
    if (img.complete && img.naturalWidth === 0) {
      if (index < candidates.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setIsHidden(true);
      }
    }
  }, [index, candidates.length, src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      width={size}
      height={size}
      loading={loading}
      className={className}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
          return;
        }

        setIsHidden(true);
      }}
    />
  );
}
