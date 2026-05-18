"use client";

import { useId } from "react";

export type Procedure =
  | "implant"
  | "veneer"
  | "invisalign"
  | "endo"
  | "surgery"
  | "esthetic"
  | "general";

type Props = {
  procedure: Procedure;
  accent: string;
  /** Episode title rendered as a faint backdrop wordmark (cinematic-only). */
  caption?: string;
};

/**
 * Cinematic dental poster that paints instantly behind the video so users
 * never see a black flash. Pure inline SVG + CSS gradients — no network.
 *
 * Composition:
 *   1. Deep navy → accent radial glow
 *   2. Soft horizontal "lens flare" at the top
 *   3. Scan-line texture (≤6% opacity) for film grain
 *   4. Procedure-specific iconography centered with drop-shadow halo
 *   5. R H M · P L A Y wordmark watermark
 *   6. Vignette at edges
 */
export default function CinematicPoster({ procedure, accent, caption }: Props) {
  const id = useId().replace(/:/g, "");

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Base navy gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d1a2d 0%, #081120 45%, #050b14 100%)",
        }}
      />

      {/* Procedure-tinted radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 45% at 50% 30%, ${accent}55 0%, ${accent}1f 30%, transparent 65%)`,
        }}
      />

      {/* Soft horizontal lens-flare highlight */}
      <div
        className="absolute inset-x-0 top-[24%] h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}cc 50%, transparent 100%)`,
          boxShadow: `0 0 28px ${accent}80, 0 0 60px ${accent}40`,
          opacity: 0.85,
        }}
      />

      {/* Scan-line / film grain pattern */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,0.6) 3px 4px)",
        }}
      />

      {/* Backdrop caption wordmark (very faint, cinematic) */}
      {caption && (
        <div className="absolute inset-x-0 top-[58%] flex justify-center">
          <span
            className="text-[clamp(60px,18vw,140px)] font-black leading-none tracking-tighter text-white/[0.04]"
            style={{
              fontStretch: "150%",
              letterSpacing: "-0.06em",
            }}
          >
            {caption.split(" ")[0]?.toUpperCase()}
          </span>
        </div>
      )}

      {/* Centered procedure icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 240"
          width="56%"
          height="56%"
          style={{
            filter: `drop-shadow(0 0 40px ${accent}aa) drop-shadow(0 12px 24px rgba(0,0,0,0.55))`,
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.95" />
              <stop offset="60%" stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id={`gloss-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.95" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ProcedureIcon
            procedure={procedure}
            fillId={`g-${id}`}
            glossId={`gloss-${id}`}
            accent={accent}
          />
        </svg>
      </div>

      {/* Top-center watermark */}
      <div className="absolute inset-x-0 top-5 flex justify-center">
        <span
          className="text-[10px] font-bold tracking-[0.4em] text-white/35"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
        >
          R H M · P L A Y
        </span>
      </div>

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}

function ProcedureIcon({
  procedure,
  fillId,
  glossId,
  accent,
}: {
  procedure: Procedure;
  fillId: string;
  glossId: string;
  accent: string;
}) {
  // Shared stylized tooth crown path used as the base for implant/veneer/general.
  const toothPath =
    "M 100 30 C 65 30 48 55 50 92 C 52 122 58 152 70 172 C 78 186 88 188 92 174 C 96 158 100 152 100 152 C 100 152 104 158 108 174 C 112 188 122 186 130 172 C 142 152 148 122 150 92 C 152 55 135 30 100 30 Z";

  if (procedure === "implant") {
    return (
      <g>
        <path d={toothPath} fill={`url(#${fillId})`} />
        {/* Implant abutment */}
        <rect
          x="86"
          y="148"
          width="28"
          height="14"
          rx="2"
          fill={accent}
          opacity="0.95"
        />
        {/* Implant screw body */}
        <path
          d="M 78 162 L 122 162 L 116 218 C 116 226 108 232 100 232 C 92 232 84 226 84 218 Z"
          fill={`url(#${fillId})`}
        />
        {/* Screw threads */}
        {[170, 180, 190, 200, 210].map((y, i) => (
          <line
            key={i}
            x1={84 + i * 1.2}
            y1={y}
            x2={116 - i * 1.2}
            y2={y + 4}
            stroke="#0a1626"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  }

  if (procedure === "veneer") {
    return (
      <g>
        <path d={toothPath} fill={`url(#${fillId})`} />
        {/* Glossy veneer overlay strip */}
        <path
          d="M 70 50 C 80 42 120 42 130 50 C 128 70 122 90 116 102 C 110 96 90 96 84 102 C 78 90 72 70 70 50 Z"
          fill={`url(#${glossId})`}
        />
        {/* Sparkles */}
        <Sparkle x={158} y={50} size={14} accent={accent} />
        <Sparkle x={42} y={70} size={10} accent={accent} />
        <Sparkle x={148} y={110} size={8} accent={accent} />
      </g>
    );
  }

  if (procedure === "invisalign") {
    // Stylized clear aligner tray viewed slightly from above
    return (
      <g>
        {/* Tray outer curve */}
        <path
          d="M 30 90 C 30 60 70 40 100 40 C 130 40 170 60 170 90 C 170 130 158 168 140 180 C 122 188 108 184 100 184 C 92 184 78 188 60 180 C 42 168 30 130 30 90 Z"
          fill="none"
          stroke={`url(#${fillId})`}
          strokeWidth="6"
          opacity="0.85"
        />
        {/* Inner tooth slots — small bumps */}
        {[55, 78, 100, 122, 145].map((x, i) => (
          <ellipse
            key={i}
            cx={x}
            cy={100 + Math.abs(x - 100) * 0.2}
            rx="9"
            ry="14"
            fill="none"
            stroke={`url(#${fillId})`}
            strokeWidth="3"
            opacity="0.6"
          />
        ))}
        {/* Bottom curve */}
        <path
          d="M 50 150 Q 100 175 150 150"
          fill="none"
          stroke={`url(#${fillId})`}
          strokeWidth="3"
          opacity="0.4"
        />
        {/* Reflection sparkle */}
        <Sparkle x={155} y={55} size={10} accent={accent} />
      </g>
    );
  }

  if (procedure === "endo") {
    return (
      <g>
        <path d={toothPath} fill={`url(#${fillId})`} />
        {/* Root canal channels */}
        <path
          d="M 92 100 L 86 200"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 108 100 L 114 200"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="100" cy="100" r="6" fill={accent} />
      </g>
    );
  }

  if (procedure === "surgery") {
    return (
      <g>
        <path d={toothPath} fill={`url(#${fillId})`} />
        {/* Scalpel slash */}
        <path
          d="M 20 30 L 180 60"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 175 55 L 200 50 L 185 70 Z"
          fill={accent}
          opacity="0.85"
        />
      </g>
    );
  }

  if (procedure === "esthetic") {
    return (
      <g>
        <path d={toothPath} fill={`url(#${fillId})`} />
        <Sparkle x={158} y={50} size={14} accent={accent} />
        <Sparkle x={42} y={80} size={10} accent={accent} />
        <Sparkle x={150} y={120} size={8} accent={accent} />
      </g>
    );
  }

  // general
  return <path d={toothPath} fill={`url(#${fillId})`} />;
}

function Sparkle({
  x,
  y,
  size,
  accent,
}: {
  x: number;
  y: number;
  size: number;
  accent: string;
}) {
  const half = size / 2;
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d={`M 0 ${-half} L ${size * 0.18} ${-size * 0.18} L ${half} 0 L ${size * 0.18} ${size * 0.18} L 0 ${half} L ${-size * 0.18} ${size * 0.18} L ${-half} 0 L ${-size * 0.18} ${-size * 0.18} Z`}
        fill={accent}
        opacity="0.95"
      />
    </g>
  );
}
