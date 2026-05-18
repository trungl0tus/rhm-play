"use client";

import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  rounded?: string;
};

export default function Thumbnail({ src, alt, className = "", rounded = "rounded-2xl" }: Props) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {showImg ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 medical-fallback flex items-center justify-center">
          <span className="text-3xl">🦷</span>
        </div>
      )}
    </div>
  );
}
