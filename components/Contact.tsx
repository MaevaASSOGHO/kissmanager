"use client";

import { useEffect, useRef, useState } from "react";
import { StatsStrip } from "./StatsStrip";

type ContactProps = {
  calendlyUrl: string;
  emailTo: string;
  ctaImage?: string;
};

export default function Contact({
  calendlyUrl,
  emailTo,
  ctaImage = "/cta/cta-banner.jpg",
}: ContactProps) {
  const [openMail, setOpenMail] = useState(false);
  const mailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openMail) {
      setTimeout(() => {
        mailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }, [openMail]);

  const mailtoHref = `mailto:${emailTo}?subject=${encodeURIComponent(
    "Demande d'accompagnement — Kiss Manager"
  )}`;

  return (
    <section id="contact" className="bg-black text-white pt-14 pb-10">
      {/* Label */}
      <div className="px-6 sm:px-10 lg:px-14">
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
          <span className="h-px w-10 bg-gold/80" />
          <span>Contact</span>
        </div>
      </div>

      {/* Banner */}
      <div className="mt-6 relative overflow-hidden border-y border-white/10">
        <div
          className="h-[240px] sm:h-[320px] lg:h-[380px] bg-center bg-cover"
          style={{ backgroundImage: `url(${ctaImage})` }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="px-6 sm:px-10 lg:px-14 max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[0.95]">
              METTEZ-NOUS
              <br />
              AU DÉFI
            </h2>
          </div>
        </div>
      </div>

      <StatsStrip />

      {/* Actions */}
      <div className="px-6 sm:px-10 lg:px-14">
        {/* Layout: card 1 centered, panel appears when openMail */}
        <div
          className={`
            mt-10 grid gap-8
            ${openMail ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}
          `}
        >
          {/* CARD 1: centered when alone */}
          <div className={`${openMail ? "" : "lg:max-w-3xl lg:mx-auto"}`}>
            <div className="relative overflow-hidden border border-black/10 bg-white/5 p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 bg-gold/12 blur-3xl" />
              <div className="relative">
                <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                  Appel stratégique
                </div>

                <h3 className="mt-3 text-3xl sm:text-4xl font-semibold">
                  Réserver un créneau
                </h3>

                <p className="mt-5 text-white/70 leading-relaxed text-lg max-w-xl">
                  Planifiez un appel pour cadrer vos objectifs et définir une stratégie social media claire et performante.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center
                      rounded-xl px-7 py-4
                      bg-gold text-black font-semibold
                      hover:brightness-95 transition
                      shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                    "
                  >
                    Réserver un appel <span className="ml-3">→</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setOpenMail(true)}
                    className="
                      inline-flex items-center justify-center
                      rounded-xl px-7 py-4
                      border border-white/18 bg-white/5
                      text-white font-semibold
                      hover:bg-white/10 hover:border-white/28 transition
                    "
                  >
                    Écrire un message
                  </button>
                </div>

                <p className="mt-6 text-xs text-white/50">
                  Vous serez redirigé(e) vers Calendly pour choisir un créneau.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: appears only when openMail=true */}
          {openMail && (
            <div
              ref={mailRef}
              className="
                transition-all duration-500 ease-out
                opacity-100 translate-y-0
              "
            >
              <div className="relative overflow-hidden border border-white/10 bg-white/5 p-10">
                <div className="absolute -left-24 -bottom-24 h-72 w-72 bg-purple-500/12 blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                        Message
                      </div>
                      <h3 className="mt-3 text-3xl font-semibold">Nous écrire</h3>

                      <p className="mt-5 text-white/70 leading-relaxed text-lg">
                        Vous pouvez aussi nous contacter directement :
                      </p>

                      <a
                        href={mailtoHref}
                        className="mt-4 inline-block text-gold font-semibold hover:underline"
                      >
                        {emailTo}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenMail(false)}
                      className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 hover:border-white/25 transition"
                    >
                      Fermer
                    </button>
                  </div>

                  <form className="mt-8 grid grid-cols-1 gap-4" action="/api/contact" method="POST">
                    <input
                      name="name"
                      placeholder="Nom"
                      className="h-12 px-4 bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-gold/60"
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="h-12 px-4 bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-gold/60"
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Votre message…"
                      rows={5}
                      className="p-4 bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-gold/60 resize-none"
                      required
                    />

                    <button
                      type="submit"
                      className="
                        mt-2 inline-flex items-center justify-center
                        rounded-xl px-7 py-4
                        border border-white/18 bg-white/5
                        text-white font-semibold
                        hover:bg-white/10 hover:border-white/28 transition
                      "
                    >
                      Envoyer <span className="ml-3">↗</span>
                    </button>

                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-semibold text-white">{k}</div>
      <div className="mt-2 text-xs tracking-[0.25em] uppercase text-white/60">
        {v}
      </div>
    </div>
  );
}
