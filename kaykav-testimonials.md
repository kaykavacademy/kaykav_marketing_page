# KayKav Academy - Testimonials Content (Cohort 01)

> **Purpose:** Source-of-truth content for the "Testimonies From Others" carousel.
> This file is CONTENT ONLY. Do not change the slide animation, scroll behaviour,
> layout, styling, fonts, colours, or the slide-counter logic. Only populate the
> testimonial data with the entries below.

---

## Slide structure (per the existing design)

Each testimonial slide has four content fields:

| Field | Maps to | Notes |
|---|---|---|
| `name` | Floating highlighted name + the full roster of names | First name, uppercase (e.g. `ZAINAB`) |
| `quote` | The large quote body | Rendered in normal (sentence) case |
| `attribution` | The "- NAME" line under the quote | Same as `name` |
| `tag` | The topic label (bottom-right) | Short, 2–4 words, all-caps in the design |

The slide counter (e.g. `07 - 09`) should derive from the length of the
testimonial array; do not hardcode it.

---

## ⚠️ Open items to confirm before publishing

1. **Olaoluwa Obafemi** had two separate posts; already merged into one slide (#5).
2. Quotes are condensed for the carousel. Full versions are kept under `Full source`
   for each entry; swap in if preferred.
3. **Display name for #1:** listed as ADESEWA (her LinkedIn name). Switch to SEWA
   if she goes by that publicly.

---

## Testimonials

### 1. Adesewa Owoeye
- **name:** ADESEWA
- **tag:** ONE BUILDER, WHOLE PRODUCT TEAM
- **quote:**
  "The value I got was way more than the money I paid. As a designer, I moved through every function of a proper product team on one journey, walking away with a new understanding of databases and code stacks."
- **Alternate quote (tag: BUILDING REAL SOLUTIONS; previously a separate SEWA slide, removed as a duplicate of Adesewa):**
  "The value I got was way more than the money I paid. I joined just to build my portfolio, and now I'm creating a tool that solves a real problem: a wedding and ideas journal app."
- **Product built:** a wedding and ideas journal app (Vows&Co)
- **Full source:** "My experience with KayKav's Built Not Prompted course was quite impactful… the value I got was way more than the money I paid… I'm creating a tool that solves a real problem: a wedding and ideas journal app… I was able to move through all the functions you'd find in a proper product team (product management, business analysis, UI/UX, frontend and backend) on one singular journey (including the role of a CEO), handled effectively through the multi-agent workflow… As a designer, I walked away with new understanding of databases and code stacks… everyone should have a side project. KayKav is where you come to build it."

### 2. John Taiwo
- **name:** JOHN
- **tag:** FROM IDEA TO LAUNCH
- **quote:**
  "In May 2026, I had no idea how to build my product ideas. One month later, I built BitePlan to 80% launch readiness and started two more products. For me, that's a huge leap. Thanks to Kaykav and the team. Anyone serious about building products should take the class."
- **Product built:** BitePlan
- **Note:** John has two testimonials, merged into one slide showing the newer
  BitePlan quote. The earlier one is kept below; swap in if preferred.
- **Previous quote (tag: THE MISSING PIECE):**
  "As a Product Manager and Designer, the only piece missing from my skill set was development. This has been one of my best investments this year. I've learned to build products from scratch with AI, and I'm already applying it in my 9-5 by collaborating more effectively with my dev team."
- **Full source (previous):** "As a Product Manager and Designer, the only piece missing from my skill set was development. Enrolling in this class has been one of my best investments this year. I've learned how to build products from scratch using AI, worked on my personal projects and I'm already applying these skills in my 9-5 work by collaborating more effectively with my development team. A huge thank you to KayKav and the entire team for an incredible learning experience."

### 3. Eniola Alex
- **name:** ENIOLA
- **tag:** ENGINEERING FOR MY STARTUP
- **quote:**
  "I came in to learn how to set up the engineering for my startup, and this gave me all the empowerment I needed to get started. It's mind-blowing what's now possible just from knowing how to think systematically."
- **Product built:** Precision: precision care for skin issues (https://www.tryprecisioncare.com)
- **Full source:** "I came in with the goal of learning the ropes on how to set up the engineering for my startup, and this gave me all the empowerment I needed to get started. It's mind-blowing seeing how learning engineering is changing, and what's now possible just from knowing how to think systematically."

### 4. Gideon Adeyemi
- **name:** GIDEON
- **tag:** IDEAS INTO REALITY
- **quote:**
  "I joined Kaykav to finally build a product my 9-to-5 kept pushing back. The cohort gave me structure, accountability, and community. It never felt like a class, just builders pushing each other. In 4 weeks I built something I'm proud of. I'd recommend Kaykav to anyone ready to turn ideas into reality."
- **Full source:** "I joined Kaykav to finally build a product I had been putting off because of a heavy 9 to 5. The cohort gave me the structure, accountability and community I needed. It never felt like a class, just builders learning and pushing each other. Big shoutout to Mudia, Miracle and everyone in the cohort. In 4 weeks I have built something I am proud of and I would recommend Kaykav to anyone ready to turn ideas into reality."
- **Note:** Replaced Wole Adaramola's slide ("Prompting is a technical skill") on 2026-06-12; Wole's entry is recoverable from git history if needed.

### 5. Olaoluwa Obafemi
- **name:** OLAOLUWA
- **tag:** SHIPPING PRODUCTS FAST
- **quote:**
  "A dream come true. You gave the first cohort a spark. Three weeks in, I'd shipped an expense tracker with Claude and Google Antigravity using well-constructed prompts. Cheers to shipping products fast."
- **Full source (post 1):** "It's a dream come true and you made it possible… you gave me and other students of the first cohort a spark. Thank you. Cheers to shipping products fast!!!"
- **Full source (post 2):** "I just got a new solo levelling skill… course on shipping MVP fast, we are 3 weeks down. So we built out an Expense tracker, using well constructed prompts on Claude and Google Antigravity… More projects to come."

---

## Roster note

The floating-name roster (currently showing placeholder names like AYOMIDE,
CHIJIOKE, DANIEL, TOYIN, LANRE, IFEOMA) should be replaced with the real
`name` values from the testimonials above. More testimonials are coming, so the
roster and the array are expected to grow; keep the structure data-driven.
