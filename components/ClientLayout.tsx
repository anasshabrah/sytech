"use client";

import { useState, useEffect } from "react";
import Bootstrap from "./Bootstrap";

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="loader-container w-100 d-flex align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Bootstrap>
      {children}
    </Bootstrap>
  );
}
