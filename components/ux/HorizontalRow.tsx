"use client";
// components/ux/HorizontalRow.tsx
// Netflix-row pattern using embla-carousel-react. Snap, drag, keyboard,
// edge gradient hints, optional progress bar. SSR-safe: renders a plain
// scroll container during SSR; embla takes over after hydration.

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  children: React.ReactNode;
  ariaLabel?: string;
  align?: "start" | "center";
  showProgress?: boolean;
  className?: string;
};

export function HorizontalRow({
  children,
  ariaLabel,
  align = "start",
  showProgress = false,
  className = "",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    dragFree: true,
    containScroll: "trimSnaps",
    skipSnaps: true,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!emblaApi || !showProgress) return;
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setProgress(p);
    };
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, showProgress]);

  useEffect(() => {
    if (!emblaApi) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") emblaApi.scrollNext();
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
    };
    const node = emblaApi.rootNode();
    node.addEventListener("keydown", handleKey);
    return () => node.removeEventListener("keydown", handleKey);
  }, [emblaApi]);

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="overflow-hidden" ref={emblaRef} tabIndex={0}>
        <div className="flex gap-3 ps-4 pe-4 sm:ps-6 sm:pe-6 touch-pan-x">
          {children}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 w-8"
        style={{ background: "linear-gradient(to right, #000, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 w-8"
        style={{ background: "linear-gradient(to left, #000, transparent)" }}
      />
      {showProgress && (
        <div className="mt-3 mx-4 sm:mx-6 h-[2px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--gold-hi,#FFD96A)] transition-[width]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function RowItem({
  children,
  className = "",
  widthClass = "w-[280px]",
}: {
  children: React.ReactNode;
  className?: string;
  widthClass?: string;
}) {
  return (
    <div
      className={`shrink-0 ${widthClass} ${className}`}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </div>
  );
}
