"use client";

import { useState } from "react";
import { PROMO_CODE } from "./nav";

// copy the promo code to the clipboard and flash a confirmation, shared by the
// modal and the promo bars. falls back to execCommand on insecure contexts.
export function useCopyCode() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROMO_CODE;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}
