"use client";
import { useEffect, useRef, useState } from "react";

type Collab = {
  company: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
};

export default function CollabSplit({
  collaborations,
  activeIndex,
  setActiveIndex,
}: {
  collaborations: Collab[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewIndex, setViewIndex] = useState(activeIndex);
  const [contentKey, setContentKey] = useState(0);

  const timeoutRef = useRef<number | null>(null);

  // ✅ Swipe target
  const swipeRef = useRef<HTMLDivElement | null>(null);

  // ✅ internal swipe state
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const wheelAccRef = useRef(0);
  const wheelTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setViewIndex(activeIndex);
  }, [activeIndex]);

  const goTo = (next: number) => {
    if (isTransitioning) return;

    const total = collaborations.length;
    const normalized = (next + total) % total;

    setIsTransitioning(true);

    setActiveIndex(normalized);
    setViewIndex(normalized);
    setContentKey((k) => k + 1);

    timeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 520);
  };

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  const collab = collaborations[viewIndex];

  const tags = collab.tags?.length
    ? collab.tags
    : ["Stratégie social media", "Création", "Performance"];

  // ✅ Helper: ignore swipe when clicking interactive elements
  const isInteractiveTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("button,a,input,textarea,select,[role='button']"));
  };

  // ✅ Attach real listeners (non-passive touch) + wheel (trackpad)
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;

    const THRESHOLD = 65; // distance swipe touch
    const FAST_MS = 450;
    const FAST_THRESHOLD = 45;

    const onTouchStart = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target)) return;
      if (isTransitioning) return;

      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    };

    const onTouchMove = (e: TouchEvent) => {
      // If it's a clear horizontal swipe, prevent vertical scroll
      const s = touchStartRef.current;
      if (!s) return;

      const t = e.touches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        // critical: needs passive:false
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const s = touchStartRef.current;
      touchStartRef.current = null;
      if (!s) return;
      if (isTransitioning) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      const dt = Date.now() - s.t;

      // ignore if mostly vertical
      if (Math.abs(dy) > Math.abs(dx)) return;

      const ok =
        Math.abs(dx) >= THRESHOLD || (dt <= FAST_MS && Math.abs(dx) >= FAST_THRESHOLD);

      if (!ok) return;

      if (dx < 0) next();
      else prev();
    };

    const onWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      if (isInteractiveTarget(e.target)) return;

      // Trackpad swipe horizontal = deltaX, sometimes deltaY used with shift
      const dx = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : 0;
      const dy = Math.abs(e.deltaY);

      // If user is scrolling mostly vertical, ignore
      if (dx === 0 && dy > 0) return;

      // accumulate horizontal intent
      wheelAccRef.current += dx;

      // reset accumulator after a short pause
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelAccRef.current = 0;
      }, 180);

      const WHEEL_THRESHOLD = 140;
      if (wheelAccRef.current <= -WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        next();
      } else if (wheelAccRef.current >= WHEEL_THRESHOLD) {
        wheelAccRef.current = 0;
        prev();
      }
    };

    // attach (touchmove needs passive:false)
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [isTransitioning, activeIndex]); // keep it simple

  return (
    <div
      ref={swipeRef}
      className="grid lg:grid-cols-2 select-none"
      // helps iOS treat as swipe area
      style={{ touchAction: "pan-y" }}
    >
      {/* Image */}
      <div className="relative min-h-[360px] lg:min-h-[520px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />

        <img
          key={`img-${contentKey}`}
          src={collab.image}
          alt={collab.company}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            animation: "collabImageIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
          }}
          draggable={false}
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.9)_100%)]" />

        <div className="relative z-10 h-full p-8 sm:p-10 lg:p-12 flex items-end">
          <div
            key={`imgtxt-${contentKey}`}
            className="max-w-lg"
            style={{
              animation: "collabFadeUp 0.95s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div className="text-white/70 text-sm tracking-[0.25em] uppercase">
              {collab.category}
            </div>
            <div className="mt-3 text-white text-3xl sm:text-4xl font-semibold leading-tight">
              {collab.company}
            </div>
          </div>
        </div>
      </div>

      {/* Texte */}
      <div className="px-6 sm:px-10 lg:px-12 py-12 lg:py-16 flex items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 rounded-full">
            <span className="text-xs tracking-[0.25em] uppercase text-white/70">
              Étude de cas
            </span>
          </div>

          <div
            key={`content-${contentKey}`}
            style={{
              animation: "collabFadeUp 0.95s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <h4 className="mt-5 text-2xl sm:text-3xl font-semibold">
              {collab.company}
            </h4>

            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              {collab.description}
            </p>

            <div key={`tags-${contentKey}`} className="mt-7 flex flex-wrap gap-3">
              {tags.slice(0, 4).map((t, i) => (
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

          {/* Boutons (optionnels) */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={prev}
              className="h-12 w-12 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:bg-gold/5 transition disabled:opacity-50"
              aria-label="Collaboration précédente"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={next}
              className="h-12 w-12 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:bg-gold/5 transition disabled:opacity-50"
              aria-label="Collaboration suivante"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="ml-2 rounded-xl px-6 py-3 bg-gold text-black font-semibold hover:brightness-95 transition"
            >
              Discuter avec nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
