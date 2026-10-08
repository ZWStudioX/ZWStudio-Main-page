import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/zw/Navbar";
import { Footer } from "@/components/zw/Footer";
import { Kicker, Reveal } from "@/components/zw/Reveal";
import { MagneticButton } from "@/components/zw/MagneticButton";
import { PROJECTS } from "@/lib/projects";
import { initLenis } from "@/lib/scroll";
import { CONTACT_EMAIL } from "@/lib/assets";

const TONE: Record<string, string> = {
  crimson: "border-[#FF5A64]/60 text-[#FF5A64]",
  volt: "border-sky-300/60 text-sky-300",
  bone: "border-white/50 text-white",
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? PROJECTS[index] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    return initLenis();
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-obsidian text-bone">
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center px-6 pt-16">
          <div className="text-center" data-testid="project-not-found">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-crimson">404 / Lost World</p>
            <h1 className="mt-6 font-heading text-4xl font-bold tracking-tighter sm:text-5xl">
              This world doesn't exist yet.
            </h1>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-bright px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-crimson hover:text-crimson"
              data-testid="not-found-home-link"
            >
              <ArrowLeft size={14} /> Back to the studio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <Navbar />
      <main className="pt-16">
        <article className="mx-auto max-w-[1440px] px-6 lg:px-12" data-testid="project-detail">
          <Reveal className="py-10 lg:py-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog transition-colors hover:text-crimson"
              data-testid="project-back-link"
            >
              <ArrowLeft size={14} /> All Work
            </Link>
          </Reveal>

          <header className="pb-12 lg:pb-16">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <Kicker>{project.kind}</Kicker>
                <span
                  className={`rounded-full border bg-ink px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${TONE[project.statusTone]}`}
                  data-testid="project-status"
                >
                  {project.status}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">{project.n}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="mt-8 max-w-5xl font-heading text-5xl font-bold leading-[0.92] tracking-tighter text-bone sm:text-6xl lg:text-8xl"
                data-testid="project-title"
              >
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fog lg:text-xl">{project.tagline}</p>
            </Reveal>
          </header>

          <Reveal>
            <div className="group relative overflow-hidden rounded-xl border border-line-bright" data-testid="project-hero-image">
              <img
                src={project.img}
                alt={project.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] lg:aspect-[21/9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </Reveal>

          <div className="grid gap-16 py-20 lg:grid-cols-3 lg:py-28">
            <div className="lg:col-span-2">
              <Reveal>
                <Kicker>The Story</Kicker>
              </Reveal>
              <div className="mt-8 space-y-6">
                {project.story.map((para, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <p className="max-w-2xl text-base leading-relaxed text-fog lg:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal delay={0.1}>
                <Kicker>Inside the Build</Kicker>
                <ol className="mt-8 space-y-0">
                  {project.features.map((f, i) => (
                    <li key={f} className="flex items-baseline gap-4 border-b border-line py-4" data-testid={`feature-${i + 1}`}>
                      <span className="font-mono text-xs tracking-[0.2em] text-crimson">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-relaxed text-bone/90">{f}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>

          <section className="border-t border-line pt-16 lg:pt-24" data-testid="project-cast">
            <Reveal>
              <Kicker>Meet the Cast</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 font-heading text-3xl font-bold tracking-tighter text-bone sm:text-4xl lg:text-5xl">
                The characters of <span className="text-outline-crimson">{project.title}</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.cast.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.12}>
                  <div
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-panel"
                    data-testid={`cast-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    <img
                      src={c.img}
                      alt={`${c.name} — ${c.role}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-heading text-xl font-bold uppercase tracking-tight text-white">{c.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300">{c.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <div className="mt-20 flex flex-wrap items-center gap-4">
              <MagneticButton testId="project-contact-cta" href={`mailto:${CONTACT_EMAIL}?subject=About%20${encodeURIComponent(project.title)}`}>
                Start a Conversation
              </MagneticButton>
              {project.cta && (
                <a
                  href={project.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-crimson/60 px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-crimson transition-all duration-300 hover:bg-crimson hover:text-white"
                  data-testid="project-external-cta"
                >
                  {project.cta.label} <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal>
            <Link
              to={`/work/${next.slug}`}
              className="group mt-24 flex items-center justify-between gap-6 border-t border-line py-12"
              data-testid="next-project-link"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Next Project — {next.n}</p>
                <p className="mt-4 font-heading text-3xl font-bold uppercase tracking-tighter text-bone transition-colors duration-300 group-hover:text-crimson sm:text-4xl lg:text-6xl">
                  {next.title}
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-bright text-bone transition-all duration-500 group-hover:rotate-45 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </Reveal>
        </article>
      </main>
      <Footer />
    </div>
  );
}
