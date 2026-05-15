"use client";
// components/ux/Sheet.tsx
// Vaul-based bottom sheet primitive — iOS-style drag-to-close.

import React from "react";
import { Drawer } from "vaul";

type Direction = "bottom" | "right" | "left" | "top";

export function Sheet({
  open,
  onOpenChange,
  direction = "bottom",
  children,
  title,
  description,
  fullHeight = false,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  direction?: Direction;
  children: React.ReactNode;
  title?: string;
  description?: string;
  fullHeight?: boolean;
}) {
  const side =
    direction === "right"
      ? "right-0 top-0 bottom-0 h-[100dvh] w-[88vw] max-w-sm rounded-l-[28px]"
      : direction === "left"
      ? "left-0 top-0 bottom-0 h-[100dvh] w-[88vw] max-w-sm rounded-r-[28px]"
      : direction === "top"
      ? "top-0 left-0 right-0 max-h-[92dvh] rounded-b-[28px]"
      : `left-0 right-0 bottom-0 ${fullHeight ? "h-[92dvh]" : "max-h-[92dvh]"} rounded-t-[28px]`;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction={direction}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
        <Drawer.Content
          className={`fixed z-[81] outline-none focus:outline-none flex flex-col bg-[#0A0A0A] text-white border border-white/10 ${side}`}
          aria-describedby={undefined}
        >
          {direction === "bottom" && (
            <div className="mx-auto mt-2 mb-1 h-1.5 w-12 shrink-0 rounded-full bg-white/20" aria-hidden="true" />
          )}
          {title ? (
            <Drawer.Title className="px-5 pt-3 pb-1 text-lg font-semibold tracking-tight">
              {title}
            </Drawer.Title>
          ) : (
            <Drawer.Title className="sr-only">Sheet</Drawer.Title>
          )}
          {description ? (
            <Drawer.Description className="px-5 pb-2 text-sm text-white/60">
              {description}
            </Drawer.Description>
          ) : (
            <Drawer.Description className="sr-only">
              Bottom sheet content
            </Drawer.Description>
          )}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-2">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
