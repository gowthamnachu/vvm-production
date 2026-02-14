"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Facility {
  title: string;
  desc: string;
  image: string;
  icon: string;
}

const facilities: Facility[] = [
  {
    title: "Sports",
    desc: "Multi-purpose sports facilities fostering teamwork, fitness, and competitive spirit",
    image: "/facilities/Sports.JPG",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Cricket Coaching",
    desc: "Professional cricket coaching with expert trainers to nurture future champions",
    image: "/facilities/CricketCoaching.JPG",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Badminton Courts",
    desc: "Well-maintained indoor badminton courts for competitive and recreational play",
    image: "/facilities/badmintoncourts.JPG",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Skating",
    desc: "Dedicated skating facility for students to learn and enjoy skating activities",
    image: "/facilities/skatingring.JPG",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Karate",
    desc: "Karate training program developing discipline, self-defense skills, and confidence",
    image: "/facilities/Karate.JPG",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Yoga",
    desc: "Yoga sessions promoting physical fitness, mental well-being, and inner peace",
    image: "/facilities/Yoga.JPG",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Dance",
    desc: "Creative dance programs encouraging artistic expression and cultural appreciation",
    image: "/facilities/Dance.JPG",
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  },
  {
    title: "Ground",
    desc: "Spacious playground and grounds for outdoor activities and sports events",
    image: "/facilities/ground.JPG",
    icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
  },
  {
    title: "Kids Play Zone",
    desc: "Safe and fun play area designed for younger children to explore and enjoy",
    image: "/facilities/kidsplayzone.JPG",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Smart Classrooms",
    desc: "Interactive digital boards and modern teaching aids for enhanced, immersive learning",
    image: "/facilities/smartclassroom.png",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Computer Lab",
    desc: "Advanced computing facilities with latest technology, coding programs, and digital literacy",
    image: "/facilities/computerlab.JPG",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Physics Lab",
    desc: "Fully equipped physics laboratory for hands-on experimental learning and discovery",
    image: "/facilities/Physicslab.JPG",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    title: "Biology Lab",
    desc: "Well-equipped biology laboratory for practical study of life sciences and experiments",
    image: "/facilities/Biologylab.JPG",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
];

export default function FacilitiesCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0); // 0 to 1
  const lastFrameTime = useRef(0);
  const rafRef = useRef<number>(0);
  const DURATION = 5000;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const paginate = useCallback(
    (dir: number) => {
      const next = (current + dir + facilities.length) % facilities.length;
      goTo(next);
    },
    [current, goTo]
  );

  // Reset progress on slide change
  useEffect(() => {
    progressRef.current = 0;
    lastFrameTime.current = 0;
    if (pencilRef.current) {
      pencilRef.current.style.width = '0%';
    }
  }, [current]);

  // requestAnimationFrame loop for pencil progress
  useEffect(() => {
    const tick = (timestamp: number) => {
      if (!lastFrameTime.current) lastFrameTime.current = timestamp;

      if (!isPaused) {
        const delta = timestamp - lastFrameTime.current;
        progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);

        if (pencilRef.current) {
          pencilRef.current.style.width = `${progressRef.current * 100}%`;
        }

        if (progressRef.current >= 1) {
          // Advance to next slide
          setCurrent((prev) => (prev + 1) % facilities.length);
          lastFrameTime.current = timestamp;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      lastFrameTime.current = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

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

  // Auto-play handled by rAF loop above — remove old interval

  // Keyboard navigation
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
        className="relative w-full aspect-[3/4] sm:aspect-[16/10] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image layers with crossfade */}
        {facilities.map((f, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === current ? 1 : 0,
              scale: i === current ? 1.02 : 1.08,
            }}
            transition={{
              opacity: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 8, ease: "linear" },
            }}
            style={{ zIndex: i === current ? 1 : 0 }}
          >
            <Image
              src={f.image}
              alt={f.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority={i === 0}
            />
          </motion.div>
        ))}

        {/* Overlays matching theme */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/40 to-black/5" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 lg:p-12">
          
          {/* Top row: Counter badge */}
          <div className="flex items-start justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#3e4e3b] backdrop-blur-md border border-[#e9e9e9]/15">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e9e9e9]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={facility.icon} />
                  </svg>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#e9e9e9]/80">
                    {String(current + 1).padStart(2, "0")}<span className="text-[#e9e9e9]/40 mx-1">/</span>{String(facilities.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom area: Title, description & controls */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="max-w-xl lg:max-w-2xl"
              >
                {/* Title */}
                <motion.h3
                  className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#e9e9e9] leading-[1.1] tracking-tight"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                  }}
                >
                  {facility.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-[#e9e9e9]/65 leading-relaxed max-w-lg"
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
                    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
                  }}
                >
                  {facility.desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Timer line with pencil & Navigation */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Progress line with pencil */}
              <div className="flex-1 relative h-6 flex items-center">
                {/* Background line */}
                <div className="absolute left-0 right-0 h-[2px] bg-[#e9e9e9]/15 rounded-full" />
                {/* Filled line + pencil */}
                <div
                  ref={pencilRef}
                  className="absolute left-0 top-0 h-full flex items-center"
                  style={{ width: '0%' }}
                >
                  {/* Filled portion */}
                  <div className="absolute left-0 right-3 h-[2px] bg-[#e9e9e9]/60 rounded-full" />
                  {/* Pencil icon at the tip */}
                  <div className="absolute right-0 -translate-y-0 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#e9e9e9]/90 drop-shadow-lg rotate-[135deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slide counter */}
              <span className="text-[10px] sm:text-xs text-[#e9e9e9]/40 font-medium tracking-wider uppercase flex-shrink-0">
                {String(current + 1).padStart(2, "0")}/{String(facilities.length).padStart(2, "0")}
              </span>

              {/* Nav arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => paginate(-1)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#e9e9e9]/10 backdrop-blur-sm border border-[#e9e9e9]/10 flex items-center justify-center text-[#e9e9e9]/70 hover:bg-[#e9e9e9]/20 hover:text-[#e9e9e9] transition-all duration-200 active:scale-95"
                  aria-label="Previous"
                  suppressHydrationWarning
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#e9e9e9]/10 backdrop-blur-sm border border-[#e9e9e9]/10 flex items-center justify-center text-[#e9e9e9]/70 hover:bg-[#e9e9e9]/20 hover:text-[#e9e9e9] transition-all duration-200 active:scale-95"
                  aria-label="Next"
                  suppressHydrationWarning
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div
        ref={thumbContainerRef}
        className="mt-5 sm:mt-6 flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {facilities.map((f, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
              i === current
                ? "ring-2 ring-[#3e4e3b] ring-offset-2 ring-offset-white"
                : "opacity-60 hover:opacity-90"
            }`}
            suppressHydrationWarning
          >
            <div className="relative w-16 h-11 sm:w-20 sm:h-14 lg:w-24 lg:h-16">
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-cover"
                sizes="96px"
                loading="lazy"
              />
              {/* Overlay on inactive */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                i === current
                  ? "bg-transparent"
                  : "bg-[#3e4e3b]/30 group-hover:bg-[#3e4e3b]/10"
              }`} />
            </div>
            {/* Title below thumbnail */}
            <div className={`px-1 py-1 text-center transition-colors duration-300 ${
              i === current
                ? "bg-[#3e4e3b]"
                : "bg-[#f1f5f9] group-hover:bg-[#3e4e3b]/10"
            }`}>
              <span className={`text-[8px] sm:text-[9px] lg:text-[10px] font-semibold tracking-wide uppercase leading-none transition-colors duration-300 ${
                i === current ? "text-white" : "text-[#3e4e3b]/60 group-hover:text-[#3e4e3b]"
              }`}>
                {f.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
