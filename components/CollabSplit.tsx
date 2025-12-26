"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type Collaboration = {
  company: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
};

type Props = {
  collaborations: Collaboration[];
  onCta?: () => void;
};

export default function CollabSplit({ collaborations, onCta }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Pour rejouer l’animation “ciné” quand le slide actif change
  const [cineKey, setCineKey] = useState(0);

  // Drag-to-scroll (Netflix style)
  const drag = useRef({
    isDown: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  const items = useMemo(() => collaborations ?? [], [collaborations]);

  useEffect(() => {
    setCineKey((k) => k + 1);
  }, [active]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const card = cards[i];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cards.length) return;

    const center = el.scrollLeft + el.clientWidth / 2;

    let best = 0;
    let bestDist = Infinity;

    cards.forEach((c, idx) => {
      const cCenter = c.offsetLeft + c.clientWidth / 2;
      const dist = Math.abs(cCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    });

    setActive(best);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.isDown = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startLeft = el.scrollLeft;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current;
    if (!el) return;
    if (!drag.current.isDown) return;

    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.isDown = false;

    // Snap “soft” vers la carte la plus proche (petit délai pour laisser le scroll finir)
    setTimeout(() => {
      scrollToIndex(active);
    }, 50);
  };

  const prev = () => scrollToIndex(Math.max(0, active - 1));
  const next = () => scrollToIndex(Math.min(items.length - 1, active + 1));

  const current = items[active] || items[0];
  const tags = (current?.tags?.length ? current.tags : ["Stratégie", "Création", "Community", "Performance"]).slice(0, 4);

  return (
    <section className="bg-black text-white">
      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-14 pt-16">
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
          <span className="h-px w-10 bg-gold/80" />
          <span className="text-white">Collaborations</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-6">
          <h5 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-tight">
            Les plus récentes
          </h5>

          {/* Progress dots */}
          <div className="hidden sm:flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Aller à la collaboration ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-8 bg-gold" : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-8">
        <div className="relative">
          {/* Arrows (desktop) */}
          <button
            onClick={prev}
            className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur hover:border-gold hover:bg-gold/10 transition"
            aria-label="Précédent"
          >
            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur hover:border-gold hover:bg-gold/10 transition"
            aria-label="Suivant"
          >
            <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="
              flex gap-0 overflow-x-auto
              scroll-smooth snap-x snap-mandatory
              [scrollbar-width:none] [-ms-overflow-style:none]
              cursor-grab active:cursor-grabbing
              px-6 sm:px-10 lg:px-14
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* hide scrollbar (webkit) */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {items.map((c, i) => (
              <article
                key={c.company + i}
                data-card
                className="
                  snap-center shrink-0
                  w-[88vw] sm:w-[70vw] lg:w-[58vw] xl:w-[52vw]
                  pr-0
                "
              >
                {/* Card (split inside) */}
                <div className="grid lg:grid-cols-2 border-y border-white/10">
                  {/* Visual */}
                  <div className="relative min-h-[360px] lg:min-h-[520px] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.company}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.9)_100%)]" />

                    <div className="relative z-10 h-full p-8 sm:p-10 lg:p-12 flex items-end">
                      <div className="max-w-lg">
                        <div className="text-white/70 text-sm tracking-[0.25em] uppercase">
                          {c.category}
                        </div>
                        <div className="mt-3 text-white text-3xl sm:text-4xl font-semibold leading-tight">
                          {c.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 sm:px-10 lg:px-12 py-12 lg:py-16 flex items-center">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 rounded-full">
                        <span className="text-xs tracking-[0.25em] uppercase text-white/70">
                          Étude de cas
                        </span>
                      </div>

                      <h4 className="mt-5 text-2xl sm:text-3xl font-semibold">
                        {c.company}
                      </h4>

                      <p className="mt-5 text-white/70 text-lg leading-relaxed">
                        {c.description}
                      </p>

                      <div className="mt-8">
                        <button
                          onClick={() => {
                            const el = document.getElementById("contact");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="rounded-xl px-6 py-3 bg-gold text-black font-semibold hover:brightness-95 transition"
                        >
                          Discuter avec nous
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic details for ACTIVE slide (below slider) */}
      {current && (
        <div className="px-6 sm:px-10 lg:px-14 pt-10 pb-16">
          <div
            key={cineKey}
            className="max-w-4xl"
            style={{
              animation: "collabFadeUp 0.95s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div className="text-xs tracking-[0.35em] uppercase text-white/60">
              Focus
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-semibold">
              {current.company}
            </div>

            {/* Tags ciné */}
            <div key={`tags-${cineKey}`} className="mt-6 flex flex-wrap gap-3">
              {tags.map((t, i) => (
                <span
                  key={t}
                  className="
                    px-4 py-2 rounded-full
                    bg-white/[0.08] border border-white/10
                    text-white/85 text-sm font-medium
                    backdrop-blur
                    hover:bg-white/[0.12] hover:border-white/20 hover:text-white
                    transition
                  "
                  style={{
                    animation:
                      `chipInCine 1.35s cubic-bezier(0.22,1,0.36,1) ${i * 220}ms both, ` +
                      `chipGlow 1.35s ease-out ${i * 220}ms both`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
