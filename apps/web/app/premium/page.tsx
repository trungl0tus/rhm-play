"use client";

import { useRouter } from "next/navigation";
import PaywallSheet from "../components/PaywallSheet";

export default function PremiumPage() {
  const router = useRouter();
  return (
    <div className="h-full w-full">
      <PaywallSheet onClose={() => router.back()} />
    </div>
  );
}
