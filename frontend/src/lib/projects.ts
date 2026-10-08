import { ASSETS, PORTRAITS } from "./assets";

export interface ProjectCast {
  name: string;
  role: string;
  img: string;
}

export interface Project {
  slug: string;
  n: string;
  title: string;
  kind: string;
  status: string;
  statusTone: "crimson" | "volt" | "bone";
  img: string;
  blurb: string;
  tagline: string;
  story: string[];
  features: string[];
  cast: ProjectCast[];
  cta?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "realm-of-echoes",
    n: "Project 01",
    title: "Realm of Echoes",
    kind: "Original Roblox Experience",
    status: "In Development",
    statusTone: "crimson",
    img: ASSETS.workGames,
    blurb: "A floating-island adventure built around exploration, secrets, and a world that reacts to its players.",
    tagline: "A floating-island world that remembers what you do.",
    story: [
      "Realm of Echoes started as a question: what if a Roblox world actually listened? Every island in the sky holds a secret, and every secret changes how the world treats you back.",
      "We're building it around three pillars — exploration that rewards curiosity, characters with actual personality, and a community that shapes the map season after season.",
      "Built in public. Played early. Shipped when it's weird enough to be remembered.",
    ],
    features: [
      "Reactive floating-island world",
      "Character-driven quests & hidden lore",
      "Seasonal community events",
      "60fps movement-first gameplay",
    ],
    cast: [
      { name: "Sunburst", role: "The Guide", img: ASSETS.heroCharacter },
      { name: "N°10", role: "The Striker", img: ASSETS.short1 },
      { name: "N°9", role: "The Rival", img: ASSETS.short2 },
    ],
  },
  {
    slug: "latent-flesh-chrome",
    n: "Project 02",
    title: "Latent Flesh & Chrome",
    kind: "AI Visual Concept & Lore Bible",
    status: "Experimental",
    statusTone: "volt",
    img: ASSETS.workAi,
    blurb: "A generative visual lab — character lineages, key art, and a world bible grown from latent space.",
    tagline: "A world bible grown from latent space, curated by hand.",
    story: [
      "Latent Flesh & Chrome is our AI laboratory — a growing visual universe of characters, key art, and lore developed with generative models as creative partners, never as shortcuts.",
      "Every concept starts as a human idea, gets exploded into hundreds of machine variations, then is curated, corrected, and canonized by hand. The AI proposes. The studio disposes.",
      "The result is a living lore bible that feeds our games and shorts with characters nobody else has.",
    ],
    features: [
      "Neural character pipelines",
      "Concept art & key visual generation",
      "Lore & worldbuilding documents",
      "Style-consistent asset systems",
    ],
    cast: [
      { name: "GPT Unit", role: "The Analyst", img: PORTRAITS.gpt },
      { name: "Gemini Unit", role: "The Dreamer", img: PORTRAITS.gemini },
      { name: "Sunburst", role: "The Prototype", img: ASSETS.short3 },
    ],
  },
  {
    slug: "zero-and-the-glitch",
    n: "Project 03",
    title: "Zero & The Glitch",
    kind: "Comedic 3D Micro-Shorts Series",
    status: "Ongoing",
    statusTone: "bone",
    img: ASSETS.workAnimation,
    blurb: "A wingless hero versus a broken universe. Weekly chaos in under sixty seconds.",
    tagline: "A wingless hero versus a broken universe — weekly, under sixty seconds.",
    story: [
      "Zero & The Glitch is our comedic micro-shorts series: fast, absurd, and built for the feed without feeling like feed filler.",
      "Every episode is a tiny story — a setup, a disaster, a punchline — animated in 3D and tuned for replay value. Recurring cast, running gags, escalating chaos.",
      "New episodes drop on YouTube Shorts. The universe expands every week.",
    ],
    features: [
      "Weekly episode cadence",
      "Recurring cast & running gags",
      "Built for Shorts, TikTok & Reels",
      "Sound-first comedic timing",
    ],
    cast: [
      { name: "Sunburst", role: "The Hero", img: ASSETS.short3 },
      { name: "N°10", role: "The Show-off", img: ASSETS.short1 },
      { name: "N°9", role: "The Menace", img: ASSETS.short2 },
    ],
    cta: { label: "Watch on YouTube", href: "https://www.youtube.com/@ZWxStudio" },
  },
];
