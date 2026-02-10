"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Facility {
  title: string;
  desc: string;
  image: string;
  icon: string;
  accent: string;
  accentColor: string;
}

const facilities: Facility[] = [
  {
    title: "Smart Classrooms",
    desc: "Interactive digital boards and modern teaching aids for enhanced, immersive learning experiences",
    image: "/facilities/smart-classroom.png",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    accent: "from-blue-500 to-blue-700",
    accentColor: "#3b82f6",
  },
  {
    title: "Science Laboratories",
    desc: "Fully equipped physics, chemistry, and biology labs for hands-on experimental learning",
    image: "/facilities/science-lab.jpg",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    accent: "from-purple-500 to-purple-700",
    accentColor: "#a855f7",
  },
  {
    title: "Library & Digital Resources",
    desc: "Extensive collection of books, digital resources, and quiet study spaces for focused learning",
    image: "/facilities/library.jpg",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    accent: "from-amber-500 to-amber-700",
    accentColor: "#f59e0b",
  },
  {
    title: "Sports Complex",
    desc: "Multi-purpose grounds, indoor courts, and professional coaching for athletic excellence",
    image: "/facilities/sports-complex.jpg",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "from-green-500 to-green-700",
    accentColor: "#22c55e",
  },
  {
    title: "Computer Labs",
    desc: "Advanced computing facilities with latest technology, coding programs, and digital literacy",
    image: "/facilities/computer-lab.jpg",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    accent: "from-cyan-500 to-cyan-700",
    accentColor: "#06b6d4",
  },
  {
    title: "Arts & Music Studio",
    desc: "Dedicated creative spaces for visual arts, performing arts, and musical expression",
    image: "/facilities/arts-studio.jpg",
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
    accent: "from-rose-500 to-rose-700",
    accentColor: "#f43f5e",
  },
];

export default function FacilitiesCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const DURATION = 6000;
  const PROGRESS_STEP = 30;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const paginate = useCallback(
    (dir: number) => {
      const next = (current + dir + facilities.length) % facilities.length;
      goTo(next);
    },
    [current, goTo]
  );

  // Auto-scroll thumbnail into view
  useEffect(() => {
    if (!thumbContainerRef.current) return;
    const container = thumbContainerRef.current;
    const activeBtn = container.children[current] as HTMLElement | undefined;
    if (activeBtn) {
      const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [current]);

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + (PROGRESS_STEP / DURATION) * 100, 100));
    }, PROGRESS_STEP);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % facilities.length);
      setProgress(0);
    }, DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, current]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      paginate(dx > 0 ? 1 : -1);
    }
  };

  const facility = facilities[current];

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2a3a28]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image layers - crossfade for smooth transitions */}
        {facilities.map((f, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === current ? 1 : 0,
              scale: i === current ? 1.05 : 1.12,
            }}
            transition={{
              opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 6, ease: "linear" },
            }}
            style={{ zIndex: i === current ? 1 : 0 }}
          >
            {/* Green gradient placeholder - behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3e4e3b] via-[#4a5d47] to-[#2a3a28]" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            <Image
              src={f.image}
              alt={f.title}
              fill
              className="object-cover relative z-[1]"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority={i === 0}
            />
          </motion.div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-black/30 sm:via-transparent sm:to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pb-6 sm:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.25 } },
                }}
              >
                <div
                  className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${facility.accent} shadow-lg`}
                  style={{ boxShadow: `0 4px 20px ${facility.accentColor}40` }}
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={facility.icon} />
                  </svg>
                  <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-white/90">
                    {String(current + 1).padStart(2, "0")} / {String(facilities.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="mt-3 sm:mt-4 text-xl sm:text-3xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight"
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                  exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.2 } },
                }}
              >
                {facility.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed max-w-md lg:max-w-xl"
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
                }}
              >
                {facility.desc}
              </motion.p>

              {/* Progress indicators */}
              <motion.div
                className="mt-5 sm:mt-7 flex items-center gap-1.5 sm:gap-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                }}
              >
                {facilities.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`relative rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                      i === current ? "w-10 sm:w-14 h-1.5 sm:h-[7px]" : "w-1.5 sm:w-[7px] h-1.5 sm:h-[7px]"
                    }`}
                    style={{ background: i === current ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.25)" }}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    {i === current && (
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: "linear" }}
                      />
                    )}
                    {i !== current && (
                      <div className="absolute inset-0 rounded-full bg-white/50" />
                    )}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows – hidden on small mobile, visible from sm up */}
        <button
          onClick={() => paginate(-1)}
          className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 items-center justify-center text-white/80 hover:bg-white/15 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-px transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 items-center justify-center text-white/80 hover:bg-white/15 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 group-hover:translate-x-px transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail navigation strip */}
      <div
        ref={thumbContainerRef}
        className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide px-0.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {facilities.map((f, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group relative flex-shrink-0 flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border transition-all duration-400 ${
              i === current
                ? "bg-[#3e4e3b] border-[#3e4e3b] shadow-md shadow-[#3e4e3b]/15"
                : "bg-white border-[#3e4e3b]/8 hover:border-[#3e4e3b]/20 hover:bg-[#3e4e3b]/[0.03]"
            }`}
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                i === current
                  ? "bg-white/15"
                  : "bg-[#3e4e3b]/5 group-hover:bg-[#3e4e3b]/10"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                  i === current ? "text-white" : "text-[#3e4e3b]/60 group-hover:text-[#3e4e3b]"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
              </svg>
            </div>
            <span
              className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                i === current ? "text-white" : "text-[#3e4e3b]/60 group-hover:text-[#3e4e3b]"
              }`}
            >
              {f.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
