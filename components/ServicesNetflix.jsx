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
          <div className="flex gap-0 pb-6">
            {services.map((s, idx) => (
              <article
                key={s.id ?? idx}
                data-card
                className="
                    snap-start shrink-0
                    w-[88vw] sm:w-[54vw] md:w-[420px] lg:w-[520px] xl:w-[560px]
                "
                >
                <div
                    className="
                    group relative overflow-hidden
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

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/70" />

                    {/* Top title */}
                    <div className="absolute inset-x-0 top-0 p-7 sm:p-8">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1] tracking-tight">
                        {s.title}
                    </h3>
                    </div>

                    {/* One-line service explanation (lower) */}
                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed line-clamp-2 max-w-[34ch]">
                        {s.description ?? s.subtitle ?? ""}
                    </p>
                    </div>

                    {/* Center CTA */}
                    <div className="absolute inset-0 grid place-items-center">
                    <button
                        onClick={() => {
                        const el = document.getElementById("contact");
                        if (!el) return;
                        const headerOffset = 72;
                        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                        }}
                        className="
                        inline-flex items-center justify-center
                        rounded-xl px-6 py-4
                        bg-gold text-black font-semibold
                        shadow-[0_16px_55px_rgba(0,0,0,0.45)]
                        hover:brightness-95 transition
                        "
                    >
                        Discuter avec nous
                    </button>
                    </div>

                    {/* Hover accent */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 bg-gold/12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
