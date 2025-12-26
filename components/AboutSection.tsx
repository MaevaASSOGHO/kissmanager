"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const [chipsKey, setChipsKey] = useState(0);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // remonte le bloc des tags => rejoue l’animation
          setChipsKey((k) => k + 1);
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    /* Section À Propos */
    <section
      id="about"
      ref={aboutRef}
      className="relative bg-black text-white"
    >
      {/* Decorative lines / grid (subtle) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.16)_0%,transparent_40%),radial-gradient(circle_at_30%_85%,rgba(168,85,247,0.16)_0%,transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2 min-h-[90svh]">
          {/* LEFT: Image / Visual block */}
          <div className="relative overflow-hidden min-h-[55vh] lg:min-h-[90svh]">
            <div className="absolute inset-0">
              <img src="/about.JPG" alt="" className="h-full w-full object-cover" />

              {/* overlays MUST be absolute */}
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_20%,rgba(245,158,11,0.25)_0%,rgba(0,0,0,0)_50%),radial-gradient(120%_80%_at_80%_30%,rgba(168,85,247,0.22)_0%,rgba(0,0,0,0)_55%),linear-gradient(to_br,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.9)_100%)]" />
            </div>

            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-12 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -left-10 top-28 h-52 w-52 rounded-full border border-white/10" />
              <div className="absolute right-12 top-14 h-40 w-40 rounded-full border border-gold/20" />
              <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute left-10 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            {/* Card */}
            <div className="relative z-10 flex h-full items-end p-6 sm:p-8">
              <div className="max-w-sm rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                  Depuis 2018
                </div>
                <h3 className="mt-2 text-lg sm:text-xl font-semibold leading-tight">
                  Une approche premium
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT: Text */}
          <div className="relative flex items-center px-6 sm:px-10 lg:px-14 py-16 lg:py-0">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
                <span className="h-px w-10 bg-gold/70" />
                <span>À propos</span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05]">
                L&apos;Excellence au service de votre croissance
              </h2>

              <div className="mt-6 space-y-5 text-white/70 text-base sm:text-lg leading-relaxed">
                <p>
                  Chez <span className="font-semibold text-gold">Kiss Manager</span>, nous croyons
                  que chaque marque a le potentiel de briller sur les réseaux sociaux.
                  Notre mission est de transformer ce potentiel en réalité tangible.
                </p>
                <p>
                  Fondée par des experts du digital, notre agence allie créativité,
                  stratégie et analyse data pour développer des solutions qui génèrent
                  un impact mesurable sur votre business.
                </p>
              </div>

              {/* Chips re-animated on scroll into view */}
              <div key={chipsKey} className="mt-10 flex flex-wrap gap-3">
                {["Stratégie", "Création", "Communauté", "Performance"].map((t, i) => (
                  <span
                    key={t}
                    className="
                      rounded-full border border-white/12 bg-white/5
                      px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/75
                      backdrop-blur
                      hover:bg-white/10 hover:border-white/25 hover:text-white
                      transition
                    "
                    style={{
                    animation:
                        `chipInCine 1.35s cubic-bezier(0.22, 1, 0.36, 1) ${i * 220}ms both, ` +
                        `chipGlow 1.35s ease-out ${i * 220}ms both`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
