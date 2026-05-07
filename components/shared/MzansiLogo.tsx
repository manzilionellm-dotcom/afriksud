// components/shared/MzansiLogo.tsx
// Server-safe SVG logo. Shield (red) + sun rays (gold) + crown.
// Inspired by SA flag colors: red (#C30B1E), gold (#FFB81C), green undertone.

import React from "react";

export function MzansiLogo({
  size = 36,
  showText = true,
}: {
  size?: number;
  showText?: boolean;
}) {
  const h = size;
  const w = showText ? size * 5.6 : size;
  const viewBox = showText ? "0 0 224 40" : "0 0 40 40";
  return (
    <svg
      width={w}
      height={h}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mzansi Stream logo"
    >
      <defs>
        <linearGradient id="mzGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD96A" />
          <stop offset="50%" stopColor="#FFB81C" />
          <stop offset="100%" stopColor="#C9870A" />
        </linearGradient>
        <linearGradient id="mzShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0152D" />
          <stop offset="100%" stopColor="#7C0A18" />
        </linearGradient>
        <filter id="mzGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Shield */}
      <path
        d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z"
        fill="url(#mzShield)"
        stroke="#7c0a18"
        strokeWidth="0.8"
      />
      <path
        d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z"
        fill="none"
        stroke="url(#mzGold)"
        strokeWidth="1.2"
        filter="url(#mzGlow)"
      />

      {/* Sun rays (SA flag motif) */}
      <g filter="url(#mzGlow)">
        <g transform="translate(20,20)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-0.5"
              y="-12"
              width="1"
              height="5"
              fill="url(#mzGold)"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle cx="0" cy="0" r="5.5" fill="url(#mzGold)" />
          <circle cx="0" cy="0" r="3" fill="#7C0A18" />
        </g>
      </g>

      {/* Word mark */}
      {showText && (
        <>
          <text
            x="50"
            y="19"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
            fontWeight="800"
            fontSize="13"
            letterSpacing="2.5"
            fill="#f5f5f5"
          >
            MZANSI
          </text>
          <line
            x1="50"
            y1="23"
            x2="220"
            y2="23"
            stroke="url(#mzGold)"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <text
            x="50"
            y="35"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
            fontWeight="900"
            fontSize="11"
            letterSpacing="3.5"
            fill="url(#mzGold)"
          >
            STREAM
          </text>
        </>
      )}
    </svg>
  );
}
