"use client";
// components/ux/VideoDemoSheet.tsx
// Full-height bottom sheet with a looping reel placeholder.
// Real reel source is TO_FILL_BY_OWNER.

import React from "react";
import { Sheet } from "./Sheet";

const DEMO_VIDEO_SRC = "/videos/demo-reel.mp4"; // TO_FILL_BY_OWNER
const DEMO_POSTER_SRC = "/og-image.jpg";

export function VideoDemoSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      fullHeight
      title="Mzansi Stream — preview"
      description="A short reel of the channel mix. Tap outside to close."
    >
      <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={DEMO_POSTER_SRC}
        >
          <source src={DEMO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </Sheet>
  );
}
