"use client";
// components/client/CinematicIntro.tsx
// Cinema-style intro animation: shield + sun rays + MZANSI title.

import React, { useEffect, useState } from "react";

export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const skip = () => {
    setExiting(true);
    window.setTimeout(onDone, 420);
  };

  useEffect(() => {
    const t = window.setTimeout(skip, 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 97 + 13) % 100,
    size: 1 + (i * 31) % 3,
    delay: ((i * 137) % 400) / 100,
    dur: 4 + ((i * 73) % 300) / 100,
  }));

  return (
    <div className={`cinWrap${exiting ? " cinExit" : ""}`}>
      <div className="cinBg" />
      <div className="cinVignette" />
      <div className="cinParticles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="cinParticle"
            style={{
              left: `${p.left}%`,
              bottom: "-4px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      <div className="cinLensFlare" aria-hidden="true" />

      <div className="cinContent">
        <div className="cinEmblemWrap">
          <div className="cinEmblemGlow" />
          <svg className="cinSvg" viewBox="0 0 200 200" width="200" height="200" aria-label="Mzansi Stream emblem">
            <defs>
              <filter id="cglow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="cinShieldFill" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="#AA0010" />
            <path className="cinShieldFill" d="M 22 22 L 178 22 L 178 117 Q 178 155 100 180 Q 22 155 22 117 Z" fill="none" stroke="rgba(50,0,0,0.5)" strokeWidth="6" />
            <path className="cinShieldBorder" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="#FFB81C" strokeWidth="3.5" filter="url(#cglow)" strokeLinecap="round" strokeLinejoin="round" />
            <path className="cinShieldBorderGlow" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="rgba(255,184,28,0.2)" strokeWidth="12" />

            <g className="cinCrown cinCrown1" transform="translate(100,100)">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="-2"
                  y="-58"
                  width="4"
                  height="22"
                  fill="#FFB81C"
                  filter="url(#cglow)"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx="0" cy="0" r="22" fill="#FFB81C" filter="url(#cglow)" />
              <circle cx="0" cy="0" r="14" fill="#7C0A18" />
            </g>
          </svg>
        </div>

        <div className="cinTitleWrap">
          <h1 className="cinTitle">MZANSI</h1>
          <div className="cinTitleLine" />
        </div>
        <p className="cinTagline">The future of streaming in South Africa</p>
        <p className="cinSub">20,000+ channels&nbsp;·&nbsp;4K/UHD&nbsp;·&nbsp;EPG&nbsp;·&nbsp;WhatsApp support</p>
      </div>

      <button className="cinSkip" onClick={skip} type="button">Skip ›</button>
    </div>
  );
}
