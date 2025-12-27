"use client";
import { useEffect, useMemo, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumberFR(n: number) {
  // 10000 -> 10 000
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

function useCountUp({
  to,
  duration = 1400,
  startWhen,
}: {
  to: number;
  duration?: number;
  startWhen: boolean;
}) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startWhen) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setVal(from + (to - from) * eased);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startWhen, to, duration]);

  return val;
}

function useInViewOnce<T extends HTMLElement>(rootMargin = "-10% 0px -20% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // once
        }
      },
      { rootMargin, threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

function StatAnimated({
  value,
  suffix = "",
  prefix = "+",
  label,
  accent = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: boolean;
}) {
  // déclenchement se fait via inView dans le parent
  const [start, setStart] = useState(false);

  // permet une petite “mise en scène” + un delay par item (côté parent)
  const display = useCountUp({ to: value, duration: 1700, startWhen: start });

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl border border-white/10
        bg-white/[0.04] backdrop-blur
        px-6 py-6
        shadow-[0_18px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* glow ciné */}
      <div
        className={[
          "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl",
          accent ? "bg-gold/20" : "bg-white/10",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_55%)]" />

      <div className="relative">
        <div
          className={[
            "text-3xl sm:text-4xl font-semibold tracking-tight",
            accent ? "text-gold" : "text-white",
          ].join(" ")}
        >
          {prefix}
          {formatNumberFR(display)}
          {suffix}
        </div>

        <div className="mt-2 text-white/70 text-sm tracking-[0.18em] uppercase">
          {label}
        </div>

        {/* bouton caché pour déclencher (piloté par parent via ref callback) */}
        <button
          type="button"
          className="sr-only"
          onClick={() => setStart(true)}
        >
          start
        </button>
      </div>

      {/* animation d’entrée ciné (fade + lift) */}
      <style jsx>{`
        div[role="stat"] {
          animation: statIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes statIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export function StatsStrip() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  const items = useMemo(
    () => [
      {
        value: 10000,
        suffix: "",
        label: "Nouveaux abonnés",
        accent: true,
      },
      {
        value: + 3000,
        suffix: "%",
        label: "d'engagement",
        accent: false,
      },
      {
        value: 5000000,
        // suffix: " FCFA",
        label: "Chiffre généré",
        accent: false,
      },
    ],
    []
  );

  // On déclenche les 3 compteurs avec un petit décalage “ciné”
  const startRefs = useRef<Array<(() => void) | null>>([]);

  useEffect(() => {
    if (!inView) return;

    const timers = items.map((_, i) =>
      window.setTimeout(() => {
        startRefs.current[i]?.();
      }, i * 220) // stagger
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, items]);

  return (
    <div ref={ref} className="px-6 sm:px-10 lg:px-14 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div
            key={it.label}
            role="stat"
            className="opacity-0"
            style={{
              animation:
                "statIn 1.15s cubic-bezier(0.22,1,0.36,1) " +
                `${i * 140}ms both`,
            }}
          >
            {/* hack simple: on expose une fonction de démarrage via ref */}
            <StatStarter
              index={i}
              register={(fn) => (startRefs.current[i] = fn)}
            >
              <StatAnimated
                value={it.value}
                suffix={it.suffix}
                label={it.label}
                accent={it.accent}
              />
            </StatStarter>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes statIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function StatStarter({
  children,
  index,
  register,
}: {
  children: React.ReactNode;
  index: number;
  register: (fn: () => void) => void;
}) {
  // On clique le bouton “sr-only” du StatAnimated pour démarrer
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fn = () => {
      const btn = wrapRef.current?.querySelector("button.sr-only") as
        | HTMLButtonElement
        | undefined;
      btn?.click();
    };
    register(fn);
  }, [index, register]);

  return <div ref={wrapRef}>{children}</div>;
}
