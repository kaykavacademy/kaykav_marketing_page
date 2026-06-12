"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Etc/GMT-1", // GMT+1 (Etc/* zones invert the sign)
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// live clock — renders a placeholder on the server, starts ticking after mount
export default function FooterClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // fixed-width slot per character — the font has no tabular figures, so
  // without this the cell's width changes every second and reflows the row
  return (
    <span className="inline-flex">
      {(time ?? "--:--:--").split("").map((c, i) => (
        <span
          key={i}
          className={`inline-block text-center ${c === ":" ? "w-[0.34em]" : "w-[0.66em]"}`}
        >
          {c}
        </span>
      ))}
    </span>
  );
}
