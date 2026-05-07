"use client";
// components/client/CinematicIntroController.tsx

import React, { useEffect, useState } from "react";
import { CinematicIntro } from "./CinematicIntro";

export function CinematicIntroController() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isSmall = window.innerWidth < 768;
    let seen = false;
    try { seen = sessionStorage.getItem("mz_intro_v1") === "1"; } catch {}
    if (!isSmall && !seen) {
      setShow(true);
      try { sessionStorage.setItem("mz_intro_v1", "1"); } catch {}
    }
  }, []);

  if (!show) return null;
  return <CinematicIntro onDone={() => setShow(false)} />;
}
