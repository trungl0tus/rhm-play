type Props = {
  size?: "sm" | "md";
};

export default function LockBadge({ size = "sm" }: Props) {
  const padding = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ${padding}`}
      style={{ background: "var(--premium-soft)", color: "var(--premium)" }}
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        width="11"
        height="11"
        fill="currentColor"
      >
        <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm-2 6V4.5a2 2 0 1 1 4 0V7H6Z" />
      </svg>
      Premium
    </span>
  );
}
