// components/ClientLayout.tsx
"use client";

import { useState, useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="grid h-screen place-items-center">
        <span className="animate-ping rounded-full bg-secondary/20 p-8" />
      </div>
    );
  }

  return <>{children}</>;
}