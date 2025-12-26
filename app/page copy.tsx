'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeCollaboration, setActiveCollaboration] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesContainerRef = useRef<HTMLDivElement>(null);

  // Données des services
  // const services = [
  //   {
  //     id: 1,
  //     title: "COMMUNITY MANAGEMENT",
  //     subtitle: "Nous prenons le contrôle de tes réseaux de A à Z",
  //     description: "Mes équipes et moi, on s'occupe de tout pour toi : de la création de la stratégie à l'écriture des scripts, la production de contenus et vidéos, jusqu'à la gestion de ta présence en ligne et la couverture de tes événements. On le fait pour toi, pour maximiser ta visibilité!",
  //     color: "from-purple-900/80 to-blue-900/80"
  //   },
  //   {
  //     id: 2,
  //     title: "STRATÉGIE RÉSEAUX SOCIAUX",
  //     subtitle: "Je crée ta stratégie réseaux sur-mesure pour exploser sur toutes les plateformes",
  //     description: "Je plonge dans l'univers de ta marque, j'analyse son ADN, son client idéal, et je conçois une stratégie sur-mesure qui te permet de te démarquer de tes concurrents, de développer une présence irrésistible sur les réseaux sociaux et de booster tes ventes !",
  //     color: "from-blue-900/80 to-cyan-900/80"
  //   },
  //   {
  //     id: 3,
  //     title: "CONSULTING & FORMATION",
  //     subtitle: "Conseil, formation, conférence",
  //     description: "Que ce soit pour toi ou tes équipes, je suis là pour te fournir un suivi spécialisé, un audit, ou une formation 1:1 afin de faire exploser ta visibilité et tes ventes. Je peux me déplacer sur place ou organiser une formation sur mesure à distance pour t'accompagner et booster tes résultats !",
  //     color: "from-amber-900/80 to-orange-900/80"
  //   }
  // ];
  const services = [
    {
      id: "01",
      title: "Marketing Strategies",
      subtitle: "Une stratégie claire, alignée à votre ADN de marque.",
      image: "/services/strategy.jpg",
    },
    {
      id: "02",
      title: "Content Creation",
      subtitle: "Des contenus premium, cohérents, qui captent l’attention.",
      image: "/services/creation.jpg",
    },
    {
      id: "03",
      title: "Marketing Campaigns",
      subtitle: "Des campagnes pensées pour performer sur toute la chaîne.",
      image: "/services/campaigns.jpg",
    },
    {
      id: "04",
      title: "Social Media Marketing",
      subtitle: "Gestion, publication, communauté : une exécution complète.",
      image: "/services/social.jpg",
    },
    // Ajoute “Data Analytics”, “Dashboards & Reports” si tu veux
  ];

  // Données des collaborations
  const collaborations = [
    {
      id: 1,
      company: "Luxe Fashion Paris",
      description: "Gestion complète de la stratégie Instagram et TikTok pour une marque de mode de luxe. Résultat : +300% d'engagement en 3 mois.",
      category: "Mode Luxe"
    },
    {
      id: 2,
      company: "TechInnovate Solutions",
      description: "Consulting et formation de l'équipe marketing sur les meilleures pratiques LinkedIn. Augmentation de 150% des leads générés.",
      category: "Technologie"
    },
    {
      id: 3,
      company: "Gourmet Experience",
      description: "Community management sur Facebook et Instagram pour un groupe de restaurants gastronomiques. Croissance de 200% de la communauté.",
      category: "Restauration"
    },
    {
      id: 4,
      company: "Wellness & Co",
      description: "Stratégie de contenu et gestion communautaire pour une marque de bien-être. +250% de croissance d'audience en 4 mois.",
      category: "Bien-être"
    }
  ];

  // Marques partenaires
  const brands = [
    { id: 1, name: "Premium Brand", initial: "P" },
    { id: 2, name: "Elite Corp", initial: "E" },
    { id: 3, name: "Luxury Group", initial: "L" },
    { id: 4, name: "Exclusive", initial: "X" },
    { id: 5, name: "Prestige", initial: "P" },
    { id: 6, name: "Signature", initial: "S" }
  ];

  // Navigation fluide
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll des services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
      if (servicesContainerRef.current) {
        servicesContainerRef.current.scrollLeft = 
          (activeService * servicesContainerRef.current.offsetWidth);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeService, services.length]);

  // Navigation des collaborations
  const nextCollaboration = () => {
    setActiveCollaboration((prev) => (prev + 1) % collaborations.length);
  };

  const prevCollaboration = () => {
    setActiveCollaboration((prev) => (prev - 1 + collaborations.length) % collaborations.length);
  };

  /** --- Components / Icons --- */
function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
      <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/7 hover:border-white/15">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/12 text-gold border border-gold/20">
            {icon}
          </div>
          <div>
            <h4 className="text-white font-semibold">{title}</h4>
            <p className="mt-1 text-white/65 text-sm leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
    );
  }

  function IconCompass() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5 9 11l1.5 5.5 5.5-1.5L14.5 9.5Z" />
      </svg>
    );
  }
  function IconSpark() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.2 4.3L18 8l-4.8 1.7L12 14l-1.2-4.3L6 8l4.8-1.7L12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l.7 2.5L8 17l-2.3.8L5 20l-.7-2.2L2 17l2.3-.5L5 14Z" />
      </svg>
    );
  }
  function IconChart() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16v-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v-9" />
      </svg>
    );
  }
  function IconBolt() {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-white font-bold text-2xl tracking-wider">
              <span className="text-gold">KISS</span> MANAGER
            </div>

            {/* Menu Hamburger */}
            <button
              className="relative z-50 w-10 h-10 flex flex-col justify-center items-center group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </button>

            {/* Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <div className="text-center space-y-8">
                {[
                  { id: 'hero', label: 'Accueil' },
                  { id: 'about', label: 'À Propos' },
                  { id: 'services', label: 'Services' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-3xl md:text-4xl text-white hover:text-gold transition-all duration-300 transform hover:scale-105"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
{/* Section Hero (refined, video-forward) */}
<section
  id="hero"
  className="relative min-h-[100svh] overflow-hidden flex items-center"
>
  {/* Video background */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero-poster.jpg"
      className="
        h-full w-full object-cover
        [filter:brightness(.85)_contrast(1.08)_saturate(1.08)]
      "
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>

    {/* Cinematic overlay: keeps video visible but gives readability */}
    <div className="absolute inset-0 bg-black/35" />
    <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />

    {/* Subtle premium grain (optional, but looks “luxe”) */}
    <div
      className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
      }}
    />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="max-w-3xl">
        {/* Small kicker like Novicom-style */}
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/70">
          <span className="h-px w-10 bg-gold/70" />
          <span>Agence social media</span>
        </div>

        <h1 className="mt-5 text-white font-semibold leading-[0.95]">
          <span className="block text-5xl sm:text-6xl md:text-7xl tracking-tight">
            KISS MANAGER
          </span>
          <span className="mt-4 block text-lg sm:text-xl md:text-2xl font-light text-white/75 leading-snug">
            Expertise d&apos;excellence en stratégie, contenu & community management — avec une exécution premium.
          </span>
        </h1>

        {/* CTAs - more “luxe/corporate”: less chunky, more glass + fine borders */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="
              group inline-flex items-center justify-center gap-2
              rounded-xl px-7 py-4
              bg-gold text-black font-semibold
              shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              transition-transform duration-300 hover:-translate-y-0.5
            "
          >
            Prendre rendez-vous
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className="
              inline-flex items-center justify-center
              rounded-xl px-7 py-4
              border border-white/20
              bg-white/5 text-white font-semibold
              backdrop-blur-md
              hover:bg-white/10 hover:border-white/30
              transition-all duration-300
            "
          >
            Découvrir nos services
          </button>
        </div>

        {/* Trust line (optional premium touch) */}
        <p className="mt-8 text-sm text-white/60">
          Stratégie • Création • Community management • Ads • Reporting
        </p>
      </div>
    </div>
  </div>

  {/* Scroll indicator (more discreet) */}
  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
    <div className="flex flex-col items-center gap-2 text-white/60">
      <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      <div className="h-10 w-px bg-white/25 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-4 w-px bg-gold animate-[pulse_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  </div>
</section>


      {/* Section À Propos */}
      <section id="about" className="relative bg-black text-white">
        {/* Decorative lines / grid (subtle) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.16)_0%,transparent_40%),radial-gradient(circle_at_30%_85%,rgba(168,85,247,0.16)_0%,transparent_45%)]" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="w-full">
          <div className="grid lg:grid-cols-2 min-h-[90svh]">
            {/* LEFT: Image / Visual block */}
            <div className="relative overflow-hidden">
              {/* Replace this block with a real image if you want: add <img ... /> */}
              <div className="absolute inset-0">
                {/* Example: video or image background */}
                <img src="/about.JPG" alt="" className="h-full w-full object-cover" />
                <div className="h-full w-full bg-[radial-gradient(120%_80%_at_20%_20%,rgba(245,158,11,0.25)_0%,rgba(0,0,0,0)_50%),radial-gradient(120%_80%_at_80%_30%,rgba(168,85,247,0.22)_0%,rgba(0,0,0,0)_55%),linear-gradient(to_br,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.9)_100%)]" />
              </div>

              {/* “Illustrations” like Novicom: rings + strokes + floating cards */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-12 h-72 w-72 rounded-full border border-white/10" />
                <div className="absolute -left-10 top-28 h-52 w-52 rounded-full border border-white/10" />
                <div className="absolute right-12 top-14 h-40 w-40 rounded-full border border-gold/20" />
                <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute left-10 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
              </div>

              {/* Content inside visual block */}
              <div className="relative z-10 flex h-full items-end p-8 sm:p-12">
                <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                    Depuis 2018
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-semibold leading-tight">
                    L’excellence en action
                  </h3>
                  <p className="mt-3 text-white/70 leading-relaxed">
                    Une approche premium, pensée pour des marques qui veulent des résultats
                    mesurables et une image cohérente.
                  </p>
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

                {/* Modern feature list (SVG icons, not emojis) */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Feature
                    title="Stratégie sur-mesure"
                    desc="Une direction claire, alignée à votre ADN de marque."
                    icon={<IconCompass />}
                  />
                  <Feature
                    title="Création premium"
                    desc="Des contenus élégants, cohérents et performants."
                    icon={<IconSpark />}
                  />
                  <Feature
                    title="Pilotage data"
                    desc="KPI, reporting, itérations : on optimise en continu."
                    icon={<IconChart />}
                  />
                  <Feature
                    title="Exécution rapide"
                    desc="Organisation, process, réactivité — sans compromis."
                    icon={<IconBolt />}
                  />
                </div>

                {/* Small “illustration chips” like Novicom */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {["Strategy", "Creation", "Community", "Performance"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] uppercase text-white/70 backdrop-blur"
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

      {/* Section Services */}
      <section id="services" className="relative bg-black text-white">
              {/* Header */}
              <div className="px-6 sm:px-10 lg:px-14 pt-20 pb-10">
                <div className="max-w-5xl">
                  <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
                    <span className="h-px w-10 bg-gold/70" />
                    <span>Services</span>
                  </div>
                </div>
              </div>
      
              {/* Cards (full width, background images) */}
              <div className="space-y-6 pb-20 px-4 sm:px-6 lg:px-8">
                {services.map((s) => (
                  <article
                    key={s.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        priority={false}
                        className="object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                      {/* Overlay: keep image visible but readable */}
                      <div className="absolute inset-0 bg-black/35" />
                      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.9)_100%)]" />
                    </div>
      
                    {/* Content */}
                    <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-8 sm:p-10 lg:p-12 min-h-[340px]">
                      <div className="lg:col-span-8">
                        <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                          Service {s.id}
                        </div>
      
                        <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.95]">
                          {s.title}
                        </h3>
      
                        <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-2xl">
                          {s.subtitle}
                        </p>
                      </div>
      
                      <div className="lg:col-span-4 flex lg:justify-end items-end">
                        <button
                          onClick={() => scrollToSection("contact")}
                          className="
                            inline-flex items-center justify-center gap-2
                            rounded-xl px-6 py-4
                            bg-white/10 border border-white/15
                            backdrop-blur-md
                            hover:bg-white/15 hover:border-white/25
                            transition-all duration-300
                          "
                        >
                          Discuter de ce service <span className="translate-y-[1px]">→</span>
                        </button>
                      </div>
      
                      {/* subtle “illustration” accent */}
                      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </article>
                ))}
              </div>
     </section>
      

      {/* Section Portfolio */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Marques partenaires */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Ils Nous Font Confiance
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {brands.map((brand) => (
                <div 
                  key={brand.id}
                  className="group relative bg-gray-50 rounded-xl p-8 flex items-center justify-center h-32 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold/70 group-hover:text-gold transition-colors">
                      {brand.initial}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 font-medium">
                      {brand.name}
                    </div>
                  </div>
                  
                  {/* Effet hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-xl transition-colors"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaborations récentes */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos Récentes Collaborations
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Image */}
              <div className="lg:w-1/2 w-full">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-6">💼</div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {collaborations[activeCollaboration].company}
                        </h4>
                        <p className="text-gold">{collaborations[activeCollaboration].category}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Décoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full translate-y-20 -translate-x-20 blur-3xl"></div>
                </div>
              </div>

              {/* Contenu et navigation */}
              <div className="lg:w-1/2 w-full">
                <div className="mb-8">
                  <div className="inline-block bg-gold/10 px-4 py-2 rounded-full mb-4">
                    <span className="text-gold font-semibold">
                      Étude de cas #{activeCollaboration + 1}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    {collaborations[activeCollaboration].company}
                  </h4>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {collaborations[activeCollaboration].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
                      Stratégie Social Media
                    </span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
                      Growth Hacking
                    </span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
                      Analyse Performance
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={prevCollaboration}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                      aria-label="Collaboration précédente"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={nextCollaboration}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                      aria-label="Collaboration suivante"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Collaboration</div>
                    <div className="text-2xl font-bold text-gray-900">
                      <span className="text-gold">{activeCollaboration + 1}</span>
                      <span className="text-gray-300 mx-2">/</span>
                      <span>{collaborations.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à Transformer Votre Présence en Ligne ?
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Planifiez un appel stratégique avec nos experts pour discuter de vos objectifs et découvrir comment nous pouvons vous aider à les atteindre.
            </p>
            
            {/* Intégration Calendly */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="h-[500px] rounded-xl bg-gradient-to-br from-black/50 to-gray-900/50 flex flex-col items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Planifions Votre Succès</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Sélectionnez un créneau qui vous convient pour une consultation stratégique gratuite de 30 minutes.
                  </p>
                  
                  <a 
                    href="https://calendly.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gold text-black font-bold px-10 py-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Planifier un Rendez-vous
                  </a>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mt-6">
                En cliquant sur le bouton, vous serez redirigé vers notre Calendly pour sélectionner un créneau qui vous convient.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="text-center">
                <div className="text-gold text-2xl font-bold mb-2">24/7</div>
                <p className="text-gray-400">Support Réactif</p>
              </div>
              <div className="text-center">
                <div className="text-gold text-2xl font-bold mb-2">100%</div>
                <p className="text-gray-400">Satisfaction Client</p>
              </div>
              <div className="text-center">
                <div className="text-gold text-2xl font-bold mb-2">48h</div>
                <p className="text-gray-400">Délai Moyen de Réponse</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4">
                <span className="text-gold">KISS</span> MANAGER
              </div>
              <p className="text-gray-400 max-w-md">
                Expertise d&apos;excellence en stratégie réseaux sociaux pour les marques ambitieuses.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4">Navigation</h4>
                <div className="space-y-3">
                  {['services', 'portfolio', 'contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="block text-gray-400 hover:text-gold transition-colors capitalize"
                    >
                      {item === 'services' ? 'Services' : 
                       item === 'portfolio' ? 'Portfolio' : 
                       'Contact'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Légal</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-400 hover:text-gold transition-colors">
                    Mentions légales
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-gold transition-colors">
                    Politique de confidentialité
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-gold transition-colors">
                    CGV
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Kiss Manager. Tous droits réservés.
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}