"use client";

import { usePathname } from "next/navigation";

/**
 * Remounts children on pathname change so the CSS `route-fade` animation
 * retriggers — gives the app a native-feeling page transition without
 * depending on the View Transitions API.
 */
export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-fade h-full w-full">
      {children}
    </div>
  );
}
