// shared navigation config + Lenis-powered section scrolling, used by the
// header, the mobile menu and the sticky apply bar so they stay in sync.

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQs", href: "#faqs" },
];

export const APPLY_HREF =
  "https://mainstack.com/p/ship-real-mvps-with-ai-agents-kaykav";

// 20% Father's Day discount — single source of truth for the modal + promo bars
export const PROMO_CODE = "DADDYWA20";

export const SOCIAL_LINKS: NavItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/kaykav.academy/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kaykav-academy" },
];

// smooth-scroll to a section, riding the shared Lenis instance so the easing
// matches the rest of the page; lands the section just below the sticky header
export function scrollToSection(hash: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;

  const header = document.querySelector("header");
  const ruler =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--ruler"),
    ) || 0;
  const offset = (header?.offsetHeight ?? 0) + ruler + 8;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.1 });
  } else {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
}
