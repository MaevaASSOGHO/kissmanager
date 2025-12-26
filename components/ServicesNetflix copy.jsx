import { useEffect, useMemo, useRef, useState } from "react";

export default function ServicesNetflix({ services = [], onCta }) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scrollByCards = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const cardW = card?.getBoundingClientRect().width || 360;
    const gap = 20; // doit matcher gap-x
    el.scrollBy({ left: dir * (cardW + gap) * 2, behavior: "smooth" });
  };

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < max);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  return (
    <section id="services" className="relative bg-black text-white py-16">
      <div className="px-6 sm:px-10 lg:px-14">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
            <span className="h-px w-10 bg-gold/70" />
            <span>Services</span>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mt-10">
        {/* Left/Right soft gradients (Netflix vibe) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Arrows */}
        <button
          onClick={() => scrollByCards(-1)}
          disabled={!canLeft}
          className={`hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-20
            h-11 w-11 rounded-full border border-white/12 bg-white/5 backdrop-blur
            transition hover:bg-white/10
            ${!canLeft ? "opacity-30 cursor-not-allowed" : "opacity-100"}
          `}
          aria-label="Précédent"
        >
          ‹
        </button>

        <button
          onClick={() => scrollByCards(1)}
          disabled={!canRight}
          className={`hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-20
            h-11 w-11 rounded-full border border-white/12 bg-white/5 backdrop-blur
            transition hover:bg-white/10
            ${!canRight ? "opacity-30 cursor-not-allowed" : "opacity-100"}
          `}
          aria-label="Suivant"
        >
          ›
        </button>

        {/* Scroller */}
        <div
          ref={scrollerRef}
          className="
            px-6 sm:px-10 lg:px-14
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-5 sm:gap-6 pb-6">
            {services.map((s, idx) => (
              <article
                key={s.id || idx}
                data-card
                className="
                  snap-start shrink-0
                  w-[78vw] sm:w-[44vw] md:w-[320px] lg:w-[360px] xl:w-[380px]
                "
              >
                <div
                  className="
                    group relative overflow-hidden rounded-3xl
                    border border-white/10 bg-white/5
                    aspect-[4/5]
                    shadow-[0_18px_70px_rgba(0,0,0,0.55)]
                    transition-transform duration-500
                    hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(0,0,0,0.7)]
                  "
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  {/* Overlays (title readable, image still visible) */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/70" />

                  {/* Top title */}
                  <div className="absolute inset-x-0 top-0 p-6">
                    <div className="text-xs tracking-[0.35em] uppercase text-white/70">
                      Service {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-semibold leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  {/* Bottom text */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-white/80 leading-relaxed line-clamp-3">
                      {s.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => onCta?.(s)}
                        className="
                          inline-flex items-center justify-center
                          rounded-xl px-5 py-3
                          bg-gold text-black font-semibold
                          hover:brightness-95 transition
                        "
                      >
                        En savoir plus
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById("contact");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="
                          inline-flex items-center justify-center
                          rounded-xl px-5 py-3
                          border border-white/15 bg-white/5
                          text-white font-semibold backdrop-blur
                          hover:bg-white/10 hover:border-white/25 transition
                        "
                      >
                        Calendly
                      </button>
                    </div>
                  </div>

                  {/* Hover accent */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Hide scrollbar (webkit) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
