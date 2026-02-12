"use client";

import { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import Image from "next/image";
import { ParallaxBackground } from "@/components/ui/parallax-background";

// Lazy load heavy components
const TestimonialsCard = lazy(() => import("@/components/ui/testimonials-card").then(mod => ({ default: mod.TestimonialsCard })));
const GalleryWithTab = lazy(() => import("@/components/ui/gallery-with-tab").then(mod => ({ default: mod.GalleryWithTab })));
const FacilitiesCarousel = lazy(() => import("@/components/FacilitiesCarousel"));

// Auto-scrolling marquee images
const marqueeImages = [
  "/hello (3).png",
  "/hello (4).png",
  "/hello (5).png",
  "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png",
  "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png",
  "/ChatGPT Image Jan 29, 2026, 01_36_09 PM.png",
  "/ChatGPT Image Jan 29, 2026, 01_41_49 PM.png",
];

// Auto-scrolling Marquee Component - Memoized
const InfiniteMarquee = memo(function InfiniteMarquee({ images, direction = "left", speed = 25 }: { images: string[]; direction?: "left" | "right"; speed?: number }) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time, delta) => {
    const moveBy = (delta / 1000) * speed;
    setPosition((prev) => {
      const newPos = direction === "left" ? prev - moveBy : prev + moveBy;
      // Reset position when one set of images has scrolled past
      if (Math.abs(newPos) >= 100) {
        return 0;
      }
      return newPos;
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        style={{ x: `${position}%` }}
      >
        {/* Double images for seamless loop - reduced from triple */}
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-48 rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt={`Campus image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
              loading={index < 4 ? "eager" : "lazy"}
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

// Animation variants - removed blur for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Animated Section Component - Memoized
const AnimatedSection = memo(function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
});

// Counter Animation Component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ["home", "foreword", "features", "admissions", "testimonials", "gallery", "about", "contact"];
          const scrollPosition = window.scrollY + 100;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetBottom = offsetTop + element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <RevealLoader
        text="VAGDEVI VIDYA MANDIR"
        bgColors={["#4a5d47", "#3e4e3b", "#5a6d57"]}
        angle={135}
        staggerOrder="center-out"
        textFadeDelay={0.5}
        textSize="clamp(32px, 10vw, 150px)"
        textColor="#e9e9e9"
        movementDirection="top-down"
      />
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen w-full bg-slate-950 overflow-hidden"
      >
        {/* Video Background */}
        {/* Video Background with Parallax */}
        <ParallaxBackground className="z-0" speed={0.2}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </ParallaxBackground>
        {/* Green Blur Overlay */}
        <div className="absolute inset-0 bg-[#3e4e3b]/40" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-12 py-20 md:py-24 items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-7 text-center md:text-left">

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#e9e9e9]/10 backdrop-blur-md border border-[#e9e9e9]/10 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-amber-100/90">Established 2002 &bull; CBSE Affiliated</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent drop-shadow-2xl">Vagdevi</span>
                <span className="block bg-gradient-to-r from-amber-200/90 via-[#e9e9e9] to-amber-200/70 bg-clip-text text-transparent">Vidya Mandir</span>
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                className="flex items-center gap-3 my-6 justify-center md:justify-start"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-300/40" />
                <div className="w-2 h-2 rounded-full bg-amber-300/40" />
                <div className="w-24 h-[2px] bg-amber-200/25" />
              </motion.div>

              <motion.p
                className="text-sm sm:text-base lg:text-lg text-[#e9e9e9]/80 max-w-lg mx-auto md:mx-0 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Nurturing minds, building character, and creating future leaders through quality education with cultural values in a lush green campus.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-8 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a
                  href="#admissions"
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-50 to-[#e9e9e9] text-[#3e4e3b] font-bold rounded-full hover:shadow-[0_0_40px_rgba(233,233,233,0.25)] active:scale-95 transition-all text-sm border border-[#e9e9e9]/20"
                >
                  Apply Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#foreword"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border border-amber-200/20 text-amber-50 font-medium rounded-full hover:bg-amber-100/10 hover:border-amber-200/40 active:scale-95 transition-all text-sm backdrop-blur-sm"
                >
                  Explore Our Legacy
                </a>
              </motion.div>

            </div>
            <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-end h-full">

              {/* Quick Stats Row */}
              <motion.div
                className="flex flex-wrap gap-8 justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {[
                  { value: "25+", label: "Years" },
                  { value: "5000+", label: "Alumni" },
                  { value: "100%", label: "Results" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#e9e9e9] to-amber-100/80 bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-amber-200/40 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20" />

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] text-[#e9e9e9]/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#e9e9e9]/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-[#e9e9e9]/50 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Foreword Section */}
      <section id="foreword" className="relative w-full bg-[#f8fafc] pt-0 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
        {/* Auto-scrolling Image Marquee at Top */}
        <div className="relative w-full py-10 sm:py-14 lg:py-16 z-20">
          <div className="space-y-4">
            {/* First Row - scrolls left */}
            <div className="opacity-100 transition-opacity">
              <InfiniteMarquee images={marqueeImages} direction="left" speed={30} />
            </div>
            {/* Second Row - scrolls right */}
            <div className="opacity-100 transition-opacity">
              <InfiniteMarquee images={[...marqueeImages].reverse()} direction="right" speed={20} />
            </div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-[#3e4e3b]/[0.015] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3e4e3b]/[0.02] rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
          <AnimatedSection>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">

              {/* Section Header - Centered */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#3e4e3b]/10 via-[#3e4e3b]/5 to-[#3e4e3b]/10 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Foreword</span>
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-3 sm:mb-4">
                  Foreword
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#3e4e3b] mb-2">
                  A Message from Our Correspondent
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/40" />
                  <div className="w-24 h-[2px] bg-[#3e4e3b]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/40" />
                  <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/30" />
                </div>
              </motion.div>

              {/* Content Grid - Premium Layout */}
              <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">

                {/* Left Image with Correspondent Info */}
                <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-4 order-1">
                  <div className="sticky top-32">
                    {/* Professional Image Card */}
                    <div className="relative group">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-white">
                        <img
                          src="/aboutus.png"
                          alt="Ramineni Radha Krishna - Correspondent"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                        {/* Name overlay on image bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                            Ramineni Radha Krishna
                          </h4>
                          <p className="text-xs sm:text-sm text-white/90 font-medium tracking-wider uppercase">
                            Correspondent
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick info cards below image */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200 text-center">
                        <p className="text-xl sm:text-2xl font-bold text-[#3e4e3b]">25+</p>
                        <p className="text-[9px] sm:text-[10px] text-[#3e4e3b]/60 uppercase tracking-wider mt-0.5">Years Leading</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200 text-center">
                        <p className="text-xl sm:text-2xl font-bold text-[#3e4e3b]">5000+</p>
                        <p className="text-[9px] sm:text-[10px] text-[#3e4e3b]/60 uppercase tracking-wider mt-0.5">Lives Shaped</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content - Right Side */}
                <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-8 order-2 space-y-6">


                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-100/50 hover:shadow-xl transition-shadow duration-500">
                    <div className="space-y-5 text-sm sm:text-base text-[#3e4e3b]/70 leading-[1.8]">
                      <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#3e4e3b] first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                        It is with immense pride and profound gratitude that I welcome you to Vagdevi Vidya Mandir, an institution that has been steadfastly nurturing young minds and shaping exemplary futures for over two decades. From our humble beginnings to our current standing as a beacon of holistic education, we have remained unwavering in our commitment to fostering excellence in academics, character development, and essential life skills.
                      </p>

                      <p>
                        Nestled within a sprawling campus surrounded by lush greenery, our school provides a serene and inspiring environment that is highly conducive to learning. Our expansive play areas stand as a testament to our firm belief in the importance of physical activity, encouraging students to develop strength, resilience, and teamwork—qualities essential for success in all spheres of life.
                      </p>

                      <p>
                        Our dedicated and highly experienced faculty forms the cornerstone of our success, guiding students with unwavering care, professional expertise, and a profound sense of responsibility. We take immense pride in delivering an education that seamlessly balances modern pedagogical methods with a deep respect for our cultural heritage and traditions. Through a judicious blend of academic rigor, cultural enrichment, and diverse extracurricular engagement, we strive to nurture well-rounded individuals equipped to excel in an ever-evolving world.
                      </p>

                      <p>
                        At Vagdevi Vidya Mandir, every child&apos;s growth and potential are cherished, nurtured, and celebrated. Together, let us continue to inspire, empower, and guide our students toward a brighter and more promising tomorrow.
                      </p>
                    </div>

                    {/* Signature area */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#3e4e3b]">Ramineni Radha Krishna</p>
                        <p className="text-xs text-[#3e4e3b] font-medium">Correspondent, Vagdevi Vidya Mandir</p>
                      </div>

                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Why Choose VVM */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 mt-16 sm:mt-20 lg:mt-28">
                <div className="text-center mb-10">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]/60 mb-3">Why Choose Us</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3e4e3b]">Why Choose Vagdevi Vidya Mandir</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { title: "25+ Years Legacy", desc: "Over two decades of trust, excellence, and proven results in holistic education", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-amber-500/10 to-amber-600/5" },
                    { title: "CBSE Curriculum", desc: "Affiliated to CBSE with a structured, nationally recognized academic framework", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", gradient: "from-blue-500/10 to-blue-600/5" },
                    { title: "Green Campus", desc: "Lush green environment with expansive playgrounds for physical and mental well-being", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-green-500/10 to-green-600/5" },
                    { title: "Holistic Growth", desc: "Equal focus on academics, sports, arts, and character building for well-rounded development", icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z", gradient: "from-purple-500/10 to-purple-600/5" },
                  ].map((value, index) => (
                    <div
                      key={index}
                      className={`group relative bg-white rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#3e4e3b]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative">
                        <div className="w-12 h-12 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3e4e3b] transition-all duration-300 group-hover:shadow-lg">
                          <svg className="w-6 h-6 text-[#3e4e3b] group-hover:text-[#e9e9e9] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                          </svg>
                        </div>
                        <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[#3e4e3b] mb-2">{value.title}</h4>
                        <p className="text-xs sm:text-sm text-[#3e4e3b]/60 leading-relaxed">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full bg-gradient-to-b from-white via-[#f8fafc] to-white py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(62,78,59,0.12) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#3e4e3b]/5 to-transparent rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-14 sm:mb-18 lg:mb-24">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#3e4e3b]/10 via-[#3e4e3b]/5 to-[#3e4e3b]/10 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Our Facilities</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-4 sm:mb-6">
                World-Class Infrastructure
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#3e4e3b]/70 leading-relaxed max-w-2xl mx-auto">
                State-of-the-art facilities meticulously designed to nurture every aspect of student development
              </p>
            </motion.div>

            {/* Facilities Carousel */}
            <motion.div variants={fadeInUp}>
              <Suspense fallback={
                <div className="w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl sm:rounded-3xl bg-[#2a3a28] animate-pulse flex items-center justify-center">
                  <div className="text-white/40 text-sm">Loading facilities...</div>
                </div>
              }>
                <FacilitiesCarousel />
              </Suspense>
            </motion.div>


          </AnimatedSection>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="relative w-full bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3e4e3b]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3e4e3b]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3e4e3b 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">

              {/* Header */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-4xl mx-auto mb-12 sm:mb-18">
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#3e4e3b]/5 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Join Us</span>
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-4 sm:mb-6">Admissions Open</h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#3e4e3b]/60 leading-relaxed px-2 max-w-2xl mx-auto">
                  Begin your child&apos;s journey with us. Our streamlined admission process makes it easy to join the Vagdevi family.
                </p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/20" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                  <div className="w-24 h-[2px] bg-[#3e4e3b]/20" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                  <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/20" />
                </div>
              </motion.div>

              {/* Process Steps - Image */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-6 relative mb-10 sm:mb-16 lg:mb-0">
                <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src="/admissionprocess.png"
                    alt="Admission Process - 5 Steps: Inquiry, Application, Interaction, Assessment, Confirmation"
                    width={800}
                    height={1000}
                    className="w-full h-auto opacity-90"
                    sizes="(min-width: 1024px) 650px, (min-width: 768px) 550px, 100vw"
                  />
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-6">
                <div className="sticky top-32 rounded-3xl overflow-hidden group max-w-md mx-auto">
                  {/* Image */}
                  <div className="relative aspect-[2/3]">
                    <Image
                      src="/children.png"
                      alt="Students at Vagdevi Vidya Mandir"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 380px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Content overlaid at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                        <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent">Ready to Join</span><br />
                        <span className="bg-gradient-to-r from-amber-200/90 via-[#e9e9e9] to-amber-200/70 bg-clip-text text-transparent">Our Family?</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-100/50 mb-6 leading-relaxed max-w-xs">
                        Begin your child&apos;s journey towards excellence with world-class education.
                      </p>

                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 bg-gradient-to-r from-amber-50 to-[#e9e9e9] text-[#3e4e3b] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(233,233,233,0.2)] active:scale-[0.97] transition-all text-sm group/btn border border-[#e9e9e9]/20"
                      >
                        Start Application
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>

                      {/* Trust indicators */}
                      <div className="mt-5 flex items-center justify-between gap-2">
                        {[
                          { value: "CBSE", sub: "Affiliated" },
                          { value: "25+", sub: "Years" },
                          { value: "5000+", sub: "Alumni" },
                        ].map((item, i) => (
                          <div key={i} className="flex-1 text-center py-2.5 bg-[#e9e9e9]/[0.06] backdrop-blur-md rounded-xl border border-amber-200/10">
                            <p className="text-xs sm:text-sm font-bold bg-gradient-to-b from-[#e9e9e9] to-amber-100/80 bg-clip-text text-transparent leading-none">{item.value}</p>
                            <p className="text-[8px] sm:text-[9px] text-amber-200/40 uppercase tracking-wider mt-0.5">{item.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full py-24 sm:py-28 lg:py-36 overflow-hidden">
        {/* Background Image */}
        {/* Background Image with Parallax */}
        <ParallaxBackground
          image="/testmonials_background.JPG"
          mobileImage="/testmonialsbackgroundmobile.jpg"
          imageAlt="Testimonials background"
          speed={0.15}
          className="z-0"
        />
        {/* Green Blur Overlay */}
        <div className="absolute inset-0 bg-[#3e4e3b]/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#e9e9e9]/10 backdrop-blur-sm rounded-full mb-6 border border-[#e9e9e9]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-amber-100/90">Voices of Excellence</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent">Teacher Testimonials</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-amber-50/60 leading-relaxed max-w-3xl mx-auto font-light">
                Hear from our dedicated educators who shape young minds and inspire excellence every day
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-300/40" />
                <div className="w-2 h-2 rounded-full bg-amber-300/40" />
                <div className="w-24 h-[2px] bg-amber-200/25" />
                <div className="w-2 h-2 rounded-full bg-amber-300/40" />
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-300/40" />
              </div>
            </motion.div>

            {/* Testimonials Card */}
            <div className="flex justify-center">
              <Suspense fallback={
                <div className="w-full max-w-[700px] h-[400px] rounded-xl bg-[#e9e9e9]/10 animate-pulse flex items-center justify-center">
                  <div className="text-[#e9e9e9]/40 text-sm">Loading testimonials...</div>
                </div>
              }>
                <TestimonialsCard
                  items={[
                    {
                      id: 1,
                      title: "Mrs. Priya Sharma — Mathematics Teacher",
                      description: "Teaching at Vagdevi Vidya Mandir has been a profoundly rewarding journey. The supportive environment and focus on holistic development allow us to nurture not just academic excellence but also strong character in our students.",
                      image: "/sudharani.png",
                    },
                    {
                      id: 2,
                      title: "Mr. Rajesh Kumar — Science Teacher",
                      description: "The state-of-the-art laboratories and innovative teaching methods here enable us to provide hands-on learning experiences. Watching students discover their passion for science is the most fulfilling aspect of my career.",
                      image: "/sudharani.png",
                    },
                    {
                      id: 3,
                      title: "Ms. Anjali Reddy — English Teacher",
                      description: "What sets VVM apart is the emphasis on creative expression and critical thinking. Our students don't just learn; they explore, question, and grow into confident communicators and leaders.",
                      image: "/sudharani.png",
                    },
                    {
                      id: 4,
                      title: "Mr. Suresh Patel — Physical Education",
                      description: "The expansive sports facilities and strong emphasis on physical fitness create an ideal environment for developing well-rounded individuals. Sports teach discipline, teamwork, and resilience—values that last a lifetime.",
                      image: "/sudharani.png",
                    },
                    {
                      id: 5,
                      title: "Mrs. Lakshmi Iyer — Arts & Music Teacher",
                      description: "VVM celebrates creativity and artistic expression. Our dedicated Arts & Music studio provides students with the space and resources to discover their talents and pursue their passions with confidence.",
                      image: "/sudharani.png",
                    },
                    {
                      id: 6,
                      title: "Mr. Venkat Rao — Computer Science",
                      description: "The modern computer labs and progressive curriculum equip our students with essential digital skills. We're preparing them not just for exams, but for the technology-driven future that awaits them.",
                      image: "/sudharani.png",
                    },
                  ]}
                  width={700}
                  autoPlay={true}
                  autoPlayInterval={5000}
                />
              </Suspense>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative w-full bg-gradient-to-br from-slate-50 via-white to-[#3e4e3b]/5 py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-[#3e4e3b]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#3e4e3b]/6 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#3e4e3b]/10 via-[#3e4e3b]/5 to-[#3e4e3b]/10 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Campus Life</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-6">
                Our Gallery
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[#3e4e3b]/60 leading-relaxed max-w-3xl mx-auto font-light">
                Capturing the spirit of excellence, creativity, and joy across every activity
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/20" />
                <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                <div className="w-24 h-[2px] bg-[#3e4e3b]/20" />
                <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/20" />
              </div>
            </motion.div>

            {/* Gallery Tabs */}
            <motion.div variants={fadeInUp}>
              <Suspense fallback={
                <div className="w-full h-[500px] rounded-xl bg-[#3e4e3b]/5 animate-pulse flex items-center justify-center">
                  <div className="text-[#3e4e3b]/40 text-sm">Loading gallery...</div>
                </div>
              }>
                <GalleryWithTab
                  data={[
                    {
                      label: "Skating",
                      value: "skating",
                      images: [
                        { imageLink: "/hello (3).png" },
                        { imageLink: "/hello (4).png" },
                        { imageLink: "/hello (5).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png" },
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_36_09 PM.png" },
                      ],
                    },
                    {
                      label: "Cricket",
                      value: "cricket",
                      images: [
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_41_49 PM.png" },
                        { imageLink: "/hello (3).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_42_59 PM.png" },
                        { imageLink: "/hello (4).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_59_31 PM.png" },
                        { imageLink: "/hello (5).png" },
                      ],
                    },
                    {
                      label: "Yoga",
                      value: "yoga",
                      images: [
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png" },
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_36_09 PM.png" },
                        { imageLink: "/hello (3).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png" },
                        { imageLink: "/hello (4).png" },
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_41_49 PM.png" },
                      ],
                    },
                    {
                      label: "Sports",
                      value: "sports",
                      images: [
                        { imageLink: "/hello (5).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_42_59 PM.png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_59_31 PM.png" },
                        { imageLink: "/hello (3).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png" },
                      ],
                    },
                    {
                      label: "Dance",
                      value: "dance",
                      images: [
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_36_09 PM.png" },
                        { imageLink: "/hello (4).png" },
                        { imageLink: "/ChatGPT Image Jan 29, 2026, 01_41_49 PM.png" },
                        { imageLink: "/hello (5).png" },
                        { imageLink: "/ChatGPT Image Feb 3, 2026, 08_42_59 PM.png" },
                        { imageLink: "/hello (3).png" },
                      ],
                    },
                  ]}
                />
              </Suspense>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Background Image */}
        {/* Background Image with Parallax */}
        <ParallaxBackground
          image="/aboutusbackground.JPG"
          imageAlt="About Us background"
          speed={0.15}
          className="z-0"
        />
        {/* Dark overlay for readability - outside for static positioning */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3e4e3b]/85 via-[#4a5d47]/80 to-[#3e4e3b]/85" />

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a5d47]/30 rounded-full blur-[120px]" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#e9e9e9]/10 backdrop-blur-sm rounded-full mb-6 border border-[#e9e9e9]/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-amber-100/90">About Us</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent">A Legacy of </span><span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">25 Years</span><span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent"> in Education</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-300/40" />
                <div className="w-2 h-2 rounded-full bg-amber-300/40" />
                <div className="w-24 h-[2px] bg-amber-200/25" />
                <div className="w-2 h-2 rounded-full bg-amber-300/40" />
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-300/40" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Content */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-300 via-amber-300/50 to-transparent rounded-full hidden sm:block" />
                  <p className="text-amber-50/80 text-sm sm:text-base lg:text-lg leading-relaxed sm:pl-6">
                    Twenty-five years ago, Vagdevi Vidya Mandir was founded with a vision to create a school that goes beyond just academics. Observing many schools with only buildings and no playgrounds, where students suffered from stress due to a lack of outdoor activities, we set out to build something different—a school that nurtures both the mind and body.
                  </p>
                </div>

                <p className="text-amber-50/65 text-sm sm:text-base leading-relaxed">
                  At Vagdevi Vidya Mandir, we believe that education is not just about books but also about a child&apos;s mental and physical well-being. Our lush green campus and expansive playground provide the perfect environment for students to learn, grow, and play freely. We give equal importance to physical activities, ensuring that every child develops holistically with a balance of academics, sports, and extracurricular activities.
                </p>

                <p className="text-amber-50/65 text-sm sm:text-base leading-relaxed">
                  Today, after 25 years, our school stands as a proud institution shaping young minds with knowledge, values, and discipline. We continue to uphold our mission of creating a joyful learning experience, fostering creativity, and encouraging overall development.
                </p>

                {/* Tagline */}
                <div className="relative mt-8 p-5 sm:p-6 rounded-2xl bg-amber-100/[0.06] border border-amber-200/10 backdrop-blur-sm">
                  <svg className="absolute top-3 left-4 w-8 h-8 text-amber-300/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base sm:text-lg lg:text-xl font-semibold italic pl-8 sm:pl-10">
                    <span className="bg-gradient-to-r from-amber-100 via-[#e9e9e9] to-amber-100 bg-clip-text text-transparent">Vagdevi Vidya Mandir – Where Learning Meets Growth!</span>
                  </p>
                </div>
              </motion.div>

              {/* Right - Stats & Highlights */}
              <motion.div variants={fadeInUp} className="space-y-5">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { number: "25+", label: "Years of Excellence", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { number: "5000+", label: "Alumni Network", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
                    { number: "100%", label: "Holistic Development", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138" },
                    { number: "50+", label: "Qualified Faculty", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="group relative p-5 sm:p-6 rounded-2xl bg-amber-100/[0.05] border border-amber-200/10 hover:bg-amber-100/[0.08] hover:border-amber-200/20 transition-all duration-500 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-300/10 flex items-center justify-center mb-3 group-hover:bg-amber-300/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                        </svg>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold mb-1"><span className="bg-gradient-to-r from-amber-200 via-[#e9e9e9] to-amber-200 bg-clip-text text-transparent">{stat.number}</span></div>
                      <div className="text-xs sm:text-sm text-amber-50/50 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Vision highlights */}
                <div className="space-y-3">
                  {[
                    { title: "Holistic Education", desc: "Balancing academics, sports, and extracurricular activities for complete development" },
                    { title: "Green Campus", desc: "Lush green environment with expansive playgrounds for physical well-being" },
                    { title: "Value-Based Learning", desc: "Instilling knowledge, discipline, and strong moral values in every student" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-amber-100/[0.04] border border-amber-200/8 hover:bg-amber-100/[0.07] transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-300/15 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-amber-50 mb-0.5">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-amber-50/45 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section >

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-[#f8fafc] py-20 sm:py-24 lg:py-36 overflow-visible">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3e4e3b 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3e4e3b]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3e4e3b]/5 rounded-full blur-3xl" />

        {/* Decorative Images Around Contact */}
        {/* Animated Floating Decorative Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { src: "/hello (3).png", top: "12%", left: "5%", width: "w-48", height: "h-36", rotate: -6, delay: 0 },
            { src: "/hello (4).png", top: "40%", right: "4%", width: "w-52", height: "h-40", rotate: 6, delay: 1.5 },
            { src: "/hello (5).png", bottom: "15%", left: "8%", width: "w-44", height: "h-32", rotate: -3, delay: 0.8 },
            { src: "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png", bottom: "20%", right: "10%", width: "w-48", height: "h-36", rotate: 3, delay: 2.2 },
            { src: "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png", top: "55%", left: "-2%", width: "w-40", height: "h-32", rotate: -12, delay: 1.2 },
            { src: "/ChatGPT Image Jan 29, 2026, 01_36_09 PM.png", top: "18%", right: "12%", width: "w-44", height: "h-32", rotate: 8, delay: 2.8 },
          ].map((img, index) => (
            <motion.div
              key={index}
              className={`hidden lg:block absolute ${img.width} ${img.height} rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40 z-[5] will-change-transform`}
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                bottom: img.bottom,
                rotate: img.rotate
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10" />
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">

              {/* Header */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-4xl mx-auto mb-12 sm:mb-18">
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#3e4e3b]/5 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Get in Touch</span>
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-4 sm:mb-6">Contact Us</h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#3e4e3b]/60 leading-relaxed px-2 max-w-2xl mx-auto">
                  We&apos;d love to hear from you. Reach out with any questions about admissions, programs, or campus visits.
                </p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/20" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                  <div className="w-24 h-[2px] bg-[#3e4e3b]/20" />
                  <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/30" />
                  <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/20" />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto relative">

                <div className="col-span-4 md:col-span-8 lg:col-span-7 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3e4e3b] to-[#4a5d47] rounded-[2rem] opacity-20 group-hover:opacity-40 blur transition duration-500" />
                  <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-[1.8rem] p-8 sm:p-10 border border-white/40 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-6 h-6 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#3e4e3b]">Send a Message</h3>
                        <p className="text-sm text-[#3e4e3b]/60 font-medium mt-1">We typically respond within 24 hours</p>
                      </div>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="group/input relative">
                          <input
                            type="text"
                            id="name"
                            className="peer w-full bg-white/50 border border-[#3e4e3b]/10 rounded-xl px-5 py-4 text-[#3e4e3b] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                            placeholder="Full Name"
                          />
                          <label
                            htmlFor="name"
                            className="absolute left-5 -top-2.5 bg-white/80 px-2 text-xs font-semibold text-[#3e4e3b] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#3e4e3b]/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#3e4e3b]"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="group/input relative">
                          <input
                            type="tel"
                            id="phone"
                            className="peer w-full bg-white/50 border border-[#3e4e3b]/10 rounded-xl px-5 py-4 text-[#3e4e3b] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                            placeholder="Phone Number"
                          />
                          <label
                            htmlFor="phone"
                            className="absolute left-5 -top-2.5 bg-white/80 px-2 text-xs font-semibold text-[#3e4e3b] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#3e4e3b]/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#3e4e3b]"
                          >
                            Phone Number
                          </label>
                        </div>
                      </div>

                      <div className="group/input relative">
                        <input
                          type="email"
                          id="email"
                          className="peer w-full bg-white/50 border border-[#3e4e3b]/10 rounded-xl px-5 py-4 text-[#3e4e3b] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                          placeholder="Email Address"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-5 -top-2.5 bg-white/80 px-2 text-xs font-semibold text-[#3e4e3b] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#3e4e3b]/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#3e4e3b]"
                        >
                          Email Address
                        </label>
                      </div>

                      <div className="relative">
                        <select
                          id="subject"
                          className="peer w-full bg-white/50 border border-[#3e4e3b]/10 rounded-xl px-5 py-4 text-[#3e4e3b] focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled selected>Select a subject</option>
                          <option value="admissions">Admissions Inquiry</option>
                          <option value="general">General Information</option>
                          <option value="fees">Fee Structure</option>
                          <option value="visit">Campus Visit</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3e4e3b]/50">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <label
                          htmlFor="subject"
                          className="absolute left-5 -top-2.5 bg-white/80 px-2 text-xs font-semibold text-[#3e4e3b]"
                        >
                          Subject
                        </label>
                      </div>

                      <div className="group/input relative">
                        <textarea
                          id="message"
                          rows={4}
                          className="peer w-full bg-white/50 border border-[#3e4e3b]/10 rounded-xl px-5 py-4 text-[#3e4e3b] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all resize-none"
                          placeholder="Message"
                        />
                        <label
                          htmlFor="message"
                          className="absolute left-5 -top-2.5 bg-white/80 px-2 text-xs font-semibold text-[#3e4e3b] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#3e4e3b]/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#3e4e3b]"
                        >
                          How can we help you?
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#3e4e3b] to-[#4a5d47] text-white py-4 rounded-xl font-bold tracking-wide hover:shadow-lg hover:shadow-[#3e4e3b]/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      >
                        <span className="relative z-10">Send Message</span>
                        <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4a5d47] to-[#3e4e3b] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Contact Info */}
                {/* Contact Info Panel & Map */}
                <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col gap-6 sm:gap-8">

                  {/* Unified Contact Info Card */}
                  <div className="bg-[#3e4e3b] rounded-[2rem] p-8 sm:p-10 text-[#e9e9e9] shadow-2xl relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>

                    <div className="space-y-8 relative z-10">
                      <div className="flex items-start gap-4 group/item">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover/item:bg-white/20 transition-all duration-300">
                          <svg className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">Address</p>
                          <p className="text-lg font-medium leading-relaxed">
                            Vagdevi Vidya Mandir<br />
                            School Address<br />
                            City, State - PIN
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group/item">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover/item:bg-white/20 transition-all duration-300">
                          <svg className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">Phone</p>
                          <p className="text-lg font-medium">+91 XXXXX XXXXX</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group/item">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover/item:bg-white/20 transition-all duration-300">
                          <svg className="w-5 h-5 group-hover/item:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">Email</p>
                          <p className="text-lg font-medium">info@vvm.edu</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group/item pt-4 border-t border-white/10">
                        <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-amber-400/20 group-hover/item:bg-amber-400/30 transition-all duration-300">
                          <svg className="w-5 h-5 text-amber-300 group-hover/item:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-200/60 mb-1">Office Hours</p>
                          <p className="text-base font-medium text-amber-50">Mon - Sat: 9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Map */}
                  <div className="flex-1 min-h-[300px] bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 relative group">
                    {/* Overlay that fades out on hover */}
                    <div className="absolute inset-0 bg-[#3e4e3b]/10 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5837!2d78.3906!3d17.4485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzU0LjYiTiA3OMKwMjMnMjYuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-bold text-[#3e4e3b] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Locate Us
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section >

      {/* Footer */}
      <footer className="w-full relative overflow-hidden">
        {/* Background Image */}
        {/* Background Image with Parallax */}
        <ParallaxBackground
          image="/footerimage.JPG"
          imageAlt="Footer background"
          speed={0.15}
          className="z-0"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-950/90" />

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(233,233,233,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#e9e9e9]/10 to-transparent" />

        {/* Main Footer */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-18 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-[#e9e9e9] font-bold text-lg">V</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#e9e9e9] tracking-tight">Vagdevi Vidya Mandir</p>
                  <p className="text-[10px] tracking-widest uppercase text-[#e9e9e9]/40">Est. 2002</p>
                </div>
              </div>
              <p className="text-sm text-[#e9e9e9]/50 leading-relaxed mb-7">
                Nurturing minds, building character, and creating future leaders through holistic education for over two decades.
              </p>
              <div className="flex gap-2.5">
                {["Twitter", "Facebook", "Instagram", "YouTube"].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 bg-[#e9e9e9]/5 hover:bg-[#3e4e3b] rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 border border-[#e9e9e9]/5 hover:border-[#3e4e3b]"
                    aria-label={social}
                  >
                    <svg className="w-3.5 h-3.5 text-[#e9e9e9]/50 hover:text-[#e9e9e9]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#e9e9e9]/70 mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Foreword", "Admissions", "Gallery", "Contact"].map((link, i) => (
                  <li key={i}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-sm text-[#e9e9e9]/40 hover:text-[#e9e9e9] hover:translate-x-1 inline-block transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academics */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#e9e9e9]/70 mb-5">Academics</h4>
              <ul className="space-y-3">
                {["Primary School", "Middle School", "High School", "CBSE Curriculum", "Examinations"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-[#e9e9e9]/40 hover:text-[#e9e9e9] hover:translate-x-1 inline-block transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#e9e9e9]/70 mb-5">Resources</h4>
              <ul className="space-y-3">
                {["Student Portal", "Parent Login", "Fee Payment", "Calendar", "Downloads"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-[#e9e9e9]/40 hover:text-[#e9e9e9] hover:translate-x-1 inline-block transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#e9e9e9]/70 mb-5">Contact</h4>
              <ul className="space-y-3.5 text-sm text-[#e9e9e9]/40">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e9e9e9]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>City, State - PIN</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#e9e9e9]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 XXXXX XXXXX</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#e9e9e9]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@vvm.edu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-[#e9e9e9]/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#e9e9e9]/30 text-center md:text-left">
                © {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {["Privacy Policy", "Terms of Service", "Sitemap"].map((link, i) => (
                  <a key={i} href="#" className="text-xs text-[#e9e9e9]/30 hover:text-[#e9e9e9]/60 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
