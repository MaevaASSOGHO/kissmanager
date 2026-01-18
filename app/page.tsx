'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ServicesNetflix from "@/components/ServicesNetflix";
import WorkGrid from "@/components/WorkGrid";
import Contact from "@/components/Contact";
import AboutSection from '@/components/AboutSection';
import CollabSplit from '@/components/CollabSplit';
import image from 'next/image';

<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#C9A24D" />
</head>

type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description?: string;
  tags?: string[];
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeCollaboration, setActiveCollaboration] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const [openMail, setOpenMail] = useState(false);
  const CTA_IMAGE = "/cta/cta-banner.jpg";

  // Données des services
  const services: ServiceItem[] = [
     {
      id: "04",
      title: "Consulting",
      subtitle: "Nous proposons un accompagnement expert, adapté à vos besoins ou à ceux de vos équipes. Que ce soit sous forme d’audit détaillé, de suivi personnalisé ou de formation sur mesure en présentiel ou à distance, notre objectif est d’amplifier votre rayonnement et d’optimiser vos performances commerciales.",
      image: "/services/cnsulting.jpg",
    },
    {
      id: "01",
      title: "Stratégie Réseaux",
      subtitle: "Nous immergeons dans l’essence de votre marque pour en saisir l’ADN et définir votre cible idéale. Sur cette base, nous élaborons une stratégie distinctive, conçue pour vous différencier durablement, cultiver une présence digitale désirable et accroître votre chiffre d’affaires.",
      image: "/services/strategie.jpg",
    },
    {
      id: "02",
      title: "Community Management",
      subtitle: "Notre agence orchestre l’intégralité de votre présence digitale avec rigueur et créativité. De la conception stratégique à la rédaction sur-mesure, en passant par la production de contenus premium et la gestion de vos plateformes, nous assurons une représentation parfaite de votre marque.",
      image: "/services/community.jpg",
    },
    // {
    //   id: "03",
    //   title: "Marketing Campaigns",
    //   subtitle: "Des campagnes pensées pour performer sur toute la chaîne.",
    //   image: "/services/strategy.jpg",
    // },
   
  ];


  // Données des collaborations
  const collaborations = [
    {
      id: 2,
      company: "Safarel Obiang – Artiste",
      description: "Direction artistique et création de contenus stratégiques pour le lancement du son TANA. Nous avons construit une identité visuelle forte et une narration digitale cohérente, pensée pour capter l’attention et créer de l’engagement autour du projet. Résultat : une campagne digitale alignée à l’image de l’artiste, des contenus viraux et une meilleure connexion avec la communauté.",
      category: "Musique",
      image: "/collaborations/safarel.jpg",
    },
    {
      id: 1,
      company: "Iron Man Supplements",
      description: "Gestion complète de la stratégie Instagram et TikTok pour une marque de mode de nutrition sportive.. Résultat : +300% d'engagement en 3 mois.",
      category: "Mode Nutrition",
      image: "/collaborations/iron.jpg"
    },
     {
    //   id: 3,
       company: "ADIGBALOU",
       description: "Mise en place d’une stratégie digitale complète, de zéro à une marque visible et rentable. Création de contenus performants, animation quotidienne de la communauté et structuration du positionnement digital. Résultats : Passage de 0 à 15 000 abonnés\n• +500 engagements générés\n• Ventes directes issues des réseaux sociaux",
       category: "Fitness",
       image: "/collaborations/adigbalou.jpg"
     },
    {
       id: 4,
       company: "Lisa – Miss Cosmo Côte d’Ivoire",
       description: "Création de contenus mettant en valeur l’image, la prestance et l’univers personnel de Lisa. Un travail visuel et narratif pensé pour renforcer son positionnement et sa visibilité digitale. Résultat : une image plus affirmée et une communication plus cohérente sur les réseaux sociaux.",
       category: "Personnalité Publique",
       image: "/collaborations/miss.jpg",
    }
  ];

  // Marques partenaires  
  const brands = [
    { id: 1, name: "Palmita", logo: "/work/collab1.JPG", preview: "/work/collab1.JPG" },
    { id: 2, name: "Djelika", logo: "/work/collab4.JPG", preview: "/work/collab4.JPG" },
    { id: 3, name: "BC.Darling", logo: "/work/collab5.JPG", preview: "/work/collab5.JPG" },
    { id: 5, name: "Iron Man Supplements", logo: "/work/collab7.JPG", preview: "/work/collab7.JPG" },
    { id: 6, name: "Mariz Boutik", logo: "/work/collab8.JPG", preview: "/work/collab8.JPG" },
    { id: 7, name: "The Sunny", logo: "/work/collab9.JPG", preview: "/work/collab9.JPG" },
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

            {/* Overlay + Drawer */}
            <div
              className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Backdrop (cliquable pour fermer) */}
              <button
                aria-label="Fermer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              />

              {/* Drawer */}
              <div
                className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-black/95 border-l border-white/10
                  transition-transform duration-300 ease-out
                  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}
              >
                <div className="px-8 pt-24 pb-10">
                  <div className="space-y-6">
                    {[
                      { id: "hero", label: "Accueil" },
                      { id: "about", label: "À Propos" },
                      { id: "services", label: "Services" },
                      { id: "portfolio", label: "Portfolio" },
                      { id: "contact", label: "Contact" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left text-2xl text-white/90 hover:text-gold transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/10 text-white/60 text-sm">
                    <div className="tracking-[0.25em] uppercase">Kiss Manager</div>
                  </div>
                </div>
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
                  Expertise d&apos;excellence en stratégie réseaux sociaux
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
      <AboutSection />

      {/* Section Services */}
      <ServicesNetflix services={services} />


      {/* Section Portfolio */}
      <section id="portfolio" className="py-20 pt-8 bg-white">
        <div className="w-full">
          {/* Marques partenaires */}
          <WorkGrid brands={brands} />

          {/* Collaborations récentes */}
          <section className="bg-black text-white">
            {/* Header */}
            <div className="px-6 sm:px-10 lg:px-14 pt-16">
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60">
                <span className="h-px w-10 bg-gold/80" />
                <span className="text-white">Collaborations</span>
              </div>

              <h5 className="mt-5 mb-8 text-lg sm:text-2xl md:text-3xl font-semibold leading-tight">
                Les plus récentes
              </h5>
            </div>

            {/* Split */}
            <CollabSplit
              collaborations={collaborations}
              activeIndex={activeCollaboration}
              setActiveIndex={setActiveCollaboration}
            />
          </section>

        </div>
      </section>


      {/* Section Contact CTA */}
      <Contact
        calendlyUrl="https://calendly.com/TON-LIEN-ICI"
        emailTo="contact@kissmanager.com"
        ctaImage="/cta/cta-banner.jpg"
      />


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
              <p className="mt-4 text-gray-500">
                📍 Abidjan, Côte d&apos;Ivoire
              </p>
              <p className='mt-4 text-gray-500'>
                📞 +225 05 66 88 52 89
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
              &copy; {new Date().getFullYear()} MEEZIUM. Tous droits réservés.
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/kissmanager?igsh=MTg2Mm50Y3hoMTk4aw==" className="text-gray-400 hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@shanakissoff?_r=1&_t=ZM-92a6fYeuP4S" className="text-gray-400 hover:text-gold transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
