"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Word-split headings
    document.querySelectorAll<HTMLElement>(".split-heading").forEach((el) => {
      if (el.dataset.split === "done") return;
      el.dataset.split = "done";
      const original = el.innerHTML;
      // Split by space, preserving italic/em spans
      const words = el.innerText.trim().split(/\s+/);
      let i = 0;
      el.innerHTML = el.innerHTML.replace(/\S+/g, () => {
        const w = words[i++] ?? "";
        return `<span class="word-mask"><span class="word-inner">${w}</span></span>`;
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(".anim-fade, .split-heading, .anim-lines, .anim-stagger")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
