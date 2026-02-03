"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Image from "next/image";

const MotionGallery = dynamic(() => import("@/components/MotionGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white/60 text-sm">Loading gallery...</p>
    </div>
  ),
});

const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white/60 text-sm">Loading gallery...</p>
    </div>
  ),
});

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

// Floating images for testimonials
const floatingImages = [
  "/hello (3).png",
  "/hello (4).png",
  "/hello (5).png",
  "/ChatGPT Image Feb 3, 2026, 08_01_55 PM.png",
  "/ChatGPT Image Feb 3, 2026, 08_13_49 PM.png",
  "/4a8a0b50-2bc7-4689-a08c-642dc235cd20.png",
];

// Auto-scrolling Marquee Component
function InfiniteMarquee({ images, direction = "left", speed = 25 }: { images: string[]; direction?: "left" | "right"; speed?: number }) {
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
        {/* Triple the images for seamless loop */}
        {[...images, ...images, ...images].map((src, index) => (
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Floating Image Component for Testimonials - Circular Layout
function FloatingImages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Calculate circular positions for 6 images
  const imageCount = 6;
  const circularPositions = Array.from({ length: imageCount }, (_, index) => {
    const angle = (index * 360) / imageCount - 90; // Start from top
    const angleRad = (angle * Math.PI) / 180;
    
    // Responsive radius - smaller on mobile, larger on desktop
    const radiusXMobile = 40;
    const radiusYMobile = 42;
    const radiusXDesktop = 48;
    const radiusYDesktop = 45;
    
    const xMobile = 50 + radiusXMobile * Math.cos(angleRad);
    const yMobile = 50 + radiusYMobile * Math.sin(angleRad);
    const xDesktop = 50 + radiusXDesktop * Math.cos(angleRad);
    const yDesktop = 50 + radiusYDesktop * Math.sin(angleRad);
    
    return {
      leftMobile: `${xMobile}%`,
      topMobile: `${yMobile}%`,
      leftDesktop: `${xDesktop}%`,
      topDesktop: `${yDesktop}%`,
      size: "w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48",
      rotate: angle * 0.15,
      delay: index * 0.2,
      zIndex: index % 3 + 1,
    };
  });

  return (
    <div ref={ref}>
      {floatingImages.map((src, index) => {
        const pos = circularPositions[index % circularPositions.length];
        return (
          <motion.div
            key={index}
            className={`absolute ${pos.size} group cursor-pointer -translate-x-1/2 -translate-y-1/2`}
            style={{
              zIndex: pos.zIndex,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              left: '50%',
              top: '50%',
              rotate: 0,
            }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1, 
              left: pos.leftMobile,
              top: pos.topMobile,
              rotate: pos.rotate,
            } : {}}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
            transition={{
              duration: 1.2,
              delay: pos.delay,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-[3px] sm:border-4 border-white backdrop-blur-sm ring-2 ring-[#3e4e3b]/10">
              <Image
                src={src}
                alt={`School memory ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, 224px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#3e4e3b]/10 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Animated Section Component
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
}

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
    const handleScroll = () => {
      const sections = ["home", "about", "features", "alumni", "achievements", "admissions", "gallery", "testimonials", "contact"];
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
    };

    window.addEventListener("scroll", handleScroll);
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
        textColor="white"
        movementDirection="top-down"
      />
      <Header activeSection={activeSection} />
      
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen w-full bg-slate-950 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: "url('/ChatGPT%20Image%20Feb%203%2C%202026%2C%2008_59_31%20PM.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 md:hidden bg-black/30" />
          <div 
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: "url('/ChatGPT%20Image%20Feb%203%2C%202026%2C%2008_42_59%20PM.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3e4e3b]/70 via-[#3e4e3b]/50 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-12 py-20 md:py-24 items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-7 text-center md:text-left">
            
            {/* Hero Text */}
            <motion.p 
              className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Established 2002
            </motion.p>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mt-4 sm:mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Vagdevi
              <span className="block text-white/80">Vidya Mandir</span>
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-white/70 max-w-lg mx-auto md:mx-0 leading-relaxed mt-4 sm:mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Where learning meets growth. Quality education with cultural values in a nurturing green campus environment.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a 
                href="#admissions" 
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#3e4e3b] font-semibold rounded-full hover:bg-white/90 active:scale-95 transition-all text-sm"
              >
                Apply Now
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 active:scale-95 transition-all text-sm"
              >
                Learn More
              </a>
            </motion.div>
            </div>
            <div className="hidden lg:block lg:col-span-5" />
            
            {/* Empty Row Spacer */}
            <div className="col-span-4 md:col-span-8 lg:col-span-12 h-16 sm:h-20 lg:h-24" />
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent z-20" />
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="w-6 h-10 border-2 border-slate-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-slate-400/70 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full bg-gradient-to-b from-slate-950 via-[#f8fafc] to-white pt-0 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
        {/* Auto-scrolling Image Marquee at Top */}
        <div className="relative w-full bg-slate-950 py-10 sm:py-14 lg:py-16">
          <div className="space-y-4">
            {/* First Row - scrolls left */}
            <div className="opacity-70 hover:opacity-90 transition-opacity">
              <InfiniteMarquee images={marqueeImages} direction="left" speed={30} />
            </div>
            {/* Second Row - scrolls right */}
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <InfiniteMarquee images={[...marqueeImages].reverse()} direction="right" speed={20} />
            </div>
          </div>
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
          {/* Bottom gradient fade to section */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>
        
        {/* Gradient transition from dark to light */}
        <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-b from-slate-950 via-slate-800/50 to-transparent -mt-1" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3e4e3b]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3e4e3b]/5 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 max-w-3xl mb-10 sm:mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e4e3b]/5 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#3e4e3b] rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#3e4e3b]">About Us</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
              25 Years of Nurturing Excellence
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              A legacy built on quality education, strong values, and holistic development.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-20">
            
            {/* Story */}
            <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100/50 hover:shadow-lg hover:border-[#3e4e3b]/10 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">Our Journey</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    Twenty-five years ago, Vagdevi Vidya Mandir was founded with a vision to create a school that goes beyond academics. We set out to build something different—a nurturing environment where both mind and body flourish.
                  </p>
                  <p>
                    Our lush green campus and expansive playground provide the perfect environment for students to learn, grow, and develop holistically through a balance of academics, sports, and extracurricular activities.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100">
                  {["Holistic Education", "Green Campus", "Sports Focus"].map((tag, i) => (
                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#3e4e3b]/5 text-[#3e4e3b] text-xs sm:text-sm font-medium rounded-full hover:bg-[#3e4e3b]/10 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-6 space-y-4 sm:space-y-6">
              
              {/* Vision */}
              <div className="bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Our Vision</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  To create an institution that nurtures holistic development, combining academic excellence with cultural values and physical well-being.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100/50 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900">Our Mission</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600">
                  {[
                    "Foster critical thinking and creativity",
                    "Balance academic and physical development",
                    "Instill strong moral values",
                    "Promote environmental awareness"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-[#3e4e3b]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <svg className="absolute top-4 right-4 w-8 h-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="relative text-base sm:text-lg lg:text-xl font-medium text-white italic">
                  &ldquo;Where Learning Meets Growth&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-white/50 mt-2 sm:mt-3">— Our Philosophy</p>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-10 sm:mt-16 lg:mt-24">
            {[
              { title: "Excellence", desc: "Striving for the highest standards in everything we do", icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" },
              { title: "Integrity", desc: "Upholding honesty and strong moral principles", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { title: "Innovation", desc: "Encouraging creative thinking and new ideas", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { title: "Compassion", desc: "Fostering empathy, kindness, and respect", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
            ].map((value, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-100/50 hover:shadow-lg hover:border-[#3e4e3b]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#3e4e3b] transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#3e4e3b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h4 className="text-sm sm:text-lg lg:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">{value.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
        </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full bg-gradient-to-b from-white via-[#3e4e3b]/3 to-white py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(62,78,59,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e4e3b]/5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#3e4e3b] rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#3e4e3b]">Our Facilities</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
                World-Class Infrastructure
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                State-of-the-art facilities designed to nurture every aspect of student development
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  title: "Smart Classrooms",
                  desc: "Interactive digital boards and modern teaching aids for enhanced learning experiences",
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  color: "from-blue-500/10 to-blue-600/5"
                },
                {
                  title: "Science Laboratories",
                  desc: "Fully equipped physics, chemistry, and biology labs for hands-on experimentation",
                  icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                  color: "from-purple-500/10 to-purple-600/5"
                },
                {
                  title: "Library & Resources",
                  desc: "Extensive collection of books, digital resources, and quiet study spaces",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  color: "from-amber-500/10 to-amber-600/5"
                },
                {
                  title: "Sports Complex",
                  desc: "Multi-purpose grounds, indoor courts, and professional sports coaching",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "from-green-500/10 to-green-600/5"
                },
                {
                  title: "Computer Labs",
                  desc: "Advanced computing facilities with latest technology and coding programs",
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  color: "from-cyan-500/10 to-cyan-600/5"
                },
                {
                  title: "Arts & Music Room",
                  desc: "Dedicated spaces for creative expression through visual arts and music",
                  icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
                  color: "from-rose-500/10 to-rose-600/5"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-100/50 hover:shadow-xl hover:border-[#3e4e3b]/20 hover:-translate-y-1 transition-all duration-500`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3e4e3b] transition-colors duration-300">
                      <svg className="w-6 h-6 text-[#3e4e3b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Facilities Banner */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 sm:mt-16 bg-gradient-to-r from-[#3e4e3b] via-[#4a5d47] to-[#3e4e3b] rounded-2xl p-6 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">More Than Just Facilities</h3>
                  <p className="text-white/70 text-sm sm:text-base">
                    Green campus • Solar powered • Rainwater harvesting • Organic garden
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["CBSE Affiliated", "Eco-Friendly", "Safe Campus"].map((badge, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs sm:text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Alumni Section */}
      <section id="alumni" className="relative w-full bg-gradient-to-b from-[#3e4e3b] via-[#4a5d47] to-[#3e4e3b] py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
            <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-white">Our Community</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4 sm:mb-6">Our Alumni</h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed px-2">
                Celebrating 25 years of excellence and the remarkable journey of our 5000+ alumni making an impact worldwide.
              </p>
            </motion.div>
          </div>
          </AnimatedSection>
        </div>

        {/* Dome Gallery */}
        <div className="w-full px-2 sm:px-4 lg:px-8" style={{ height: '60vh', minHeight: '400px', maxHeight: '800px' }}>
          <DomeGallery
            fit={1.0}
            minRadius={700}
            maxVerticalRotationDeg={20}
            segments={34}
            dragDampening={0}
            grayscale
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Stats */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {[
              { value: "5000", suffix: "+", label: "Alumni" },
              { value: "98", suffix: "%", label: "Success Rate" },
              { value: "25", suffix: "+", label: "Years Legacy" },
              { value: "50", suffix: "+", label: "Countries" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[8px] sm:text-[10px] lg:text-xs font-medium tracking-wider uppercase text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-5 sm:p-8 lg:p-12 mt-4 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our alumni have achieved remarkable success in medicine, engineering, business, arts, and public service. They carry forward the values and education imparted at Vagdevi Vidya Mandir, making a positive impact worldwide.
            </p>
          </motion.div>

          <motion.p variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center text-xs sm:text-sm text-white/40 mt-6 sm:mt-8">
            Drag or swipe to explore our alumni gallery
          </motion.p>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="relative w-full bg-gradient-to-b from-white via-[#3e4e3b]/3 to-white py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3e4e3b]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3e4e3b]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e4e3b]/5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#3e4e3b] rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#3e4e3b]">Recognition</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
                Awards & Achievements
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                Recognized excellence in education, sports, and holistic development
              </p>
            </motion.div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {[
                {
                  year: "2024",
                  title: "Best CBSE School",
                  org: "State Education Awards",
                  icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                },
                {
                  year: "2023",
                  title: "Green Campus Award",
                  org: "Environmental Excellence",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                },
                {
                  year: "2023",
                  title: "Sports Excellence",
                  org: "National Level Recognition",
                  icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                },
                {
                  year: "2022",
                  title: "Innovation in Teaching",
                  org: "EdTech Excellence Award",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                },
                {
                  year: "2022",
                  title: "Cultural Excellence",
                  org: "Arts & Heritage Council",
                  icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                },
                {
                  year: "2021",
                  title: "Community Impact",
                  org: "Social Responsibility Award",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-100/50 hover:shadow-xl hover:border-[#3e4e3b]/20 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#3e4e3b]/10 rounded-full">
                    <span className="text-xs font-semibold text-[#3e4e3b]">{award.year}</span>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={award.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">{award.title}</h3>
                  <p className="text-sm text-slate-500">{award.org}</p>
                </motion.div>
              ))}
            </div>

            {/* Academic Results Banner */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">100%</p>
                  <p className="text-xs sm:text-sm text-white/60">Board Results</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">45+</p>
                  <p className="text-xs sm:text-sm text-white/60">Distinctions</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">15+</p>
                  <p className="text-xs sm:text-sm text-white/60">National Ranks</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">200+</p>
                  <p className="text-xs sm:text-sm text-white/60">Medals Won</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="relative w-full bg-gradient-to-b from-[#f8fafc] to-white py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3e4e3b]/3 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Header */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e4e3b]/5 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#3e4e3b] rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#3e4e3b]">Join Us</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">Admissions</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed px-2">
              Begin your journey with us. Our streamlined admission process makes it easy to join the Vagdevi family.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-7 max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16 lg:mb-0">
            {[
              { step: "01", title: "Inquiry", desc: "Contact our admission office or submit an online inquiry form", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { step: "02", title: "Application", desc: "Complete the application with all required documents", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { step: "03", title: "Interaction", desc: "Meet with our admission team for a brief interaction", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
              { step: "04", title: "Assessment", desc: "Age-appropriate assessment to understand student needs", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
              { step: "05", title: "Confirmation", desc: "Receive admission confirmation and complete enrollment", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-4 sm:gap-6 bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-sm border border-slate-100/50 hover:shadow-lg hover:border-[#3e4e3b]/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#3e4e3b]/40">{item.step}</span>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-5 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-2xl mx-auto shadow-xl">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">Ready to Join?</h3>
            <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8">
              Contact our admission office for more information about enrollment.
            </p>
            <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#3e4e3b] font-semibold rounded-full hover:bg-white/90 hover:shadow-lg active:scale-95 transition-all text-sm sm:text-base group">
              Start Application
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            {/* Quick Contact */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs text-white/50 mb-2">Have questions?</p>
              <p className="text-sm text-white/80">Call: +91 XXXXX XXXXX</p>
            </div>
          </motion.div>
        </div>
        </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative w-full bg-gradient-to-b from-[#3e4e3b] via-[#4a5d47] to-[#3e4e3b] py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
            <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-white">Campus Life</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">Gallery</h2>
              <p className="text-sm sm:text-base text-white/70">
                Explore moments from our vibrant campus life
              </p>
            </motion.div>
          </div>
          </AnimatedSection>
        </div>

        {/* Motion Gallery */}
        <div className="w-full overflow-hidden">
          <div className="hidden lg:block" style={{ height: '500px' }}>
            <MotionGallery bend={8} scrollSpeed={1.5} scrollEase={0.06} />
          </div>
          <div className="hidden md:block lg:hidden" style={{ height: '400px' }}>
            <MotionGallery bend={6} scrollSpeed={1.2} scrollEase={0.08} />
          </div>
          <div className="block md:hidden" style={{ height: '320px' }}>
            <MotionGallery bend={3} scrollSpeed={0.6} scrollEase={0.12} />
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-white/40 mt-4 sm:mt-6 lg:mt-8">
          <span className="lg:hidden">← Swipe to explore →</span>
          <span className="hidden lg:inline">Drag or scroll to explore</span>
        </p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full bg-gradient-to-br from-slate-50 via-white to-[#3e4e3b]/5 py-20 sm:py-24 lg:py-40 min-h-screen overflow-hidden flex items-center justify-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#3e4e3b]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#3e4e3b]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#3e4e3b]/5 to-transparent rounded-full blur-3xl" />
        
        {/* Floating Images Background */}
        <FloatingImages />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(62,78,59,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(62,78,59,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header - Centered Content */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#3e4e3b]/10 via-[#3e4e3b]/5 to-[#3e4e3b]/10 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10 shadow-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3e4e3b]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Our Community Gallery</span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-[#3e4e3b] bg-clip-text text-transparent leading-tight tracking-tight mb-6 sm:mb-8">
                Moments That Define Excellence
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
                Experience the vibrant tapestry of our school life through cherished memories, celebrating achievements, and the unwavering spirit of our community
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/30"></div>
                <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/40"></div>
                <div className="w-24 h-[2px] bg-[#3e4e3b]/30"></div>
                <div className="w-2 h-2 rounded-full bg-[#3e4e3b]/40"></div>
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/30"></div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-gradient-to-b from-[#f8fafc] to-white py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3e4e3b]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3e4e3b]/5 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Header */}
          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e4e3b]/5 rounded-full mb-4">
              <span className="w-2 h-2 bg-[#3e4e3b] rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#3e4e3b]">Get in Touch</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">Contact Us</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed px-2">
              We&apos;d love to hear from you. Reach out with any questions about admissions or our programs.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
            
            {/* Form */}
            <div className="col-span-4 md:col-span-8 lg:col-span-7 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-lg border border-slate-100/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Send a Message</h3>
              </div>
              <form className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone" 
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Subject</label>
                  <select className="w-full bg-slate-50/80 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all">
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="general">General Information</option>
                    <option value="fees">Fee Structure</option>
                    <option value="visit">Campus Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you?" 
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#3e4e3b] to-[#4a5d47] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:shadow-lg active:scale-[0.98] transition-all text-sm sm:text-base flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-span-4 md:col-span-8 lg:col-span-5 space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-100/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mb-2">Address</h4>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                      Vagdevi Vidya Mandir<br />
                      School Address<br />
                      City, State - PIN
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">Phone</h4>
                  <p className="text-xs sm:text-sm text-slate-600">+91 XXXXX XXXXX</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-[#3e4e3b]/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-[#3e4e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">Email</h4>
                  <p className="text-xs sm:text-sm text-slate-600 break-all">info@vvm.edu</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-lg sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">Office Hours</h4>
                    <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                      Monday - Saturday<br />
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100/50">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", name: "Twitter" },
                    { icon: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z", name: "Facebook" },
                    { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", name: "Instagram" },
                    { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", name: "LinkedIn" },
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className="w-10 h-10 bg-slate-100 hover:bg-[#3e4e3b] rounded-xl flex items-center justify-center group transition-colors duration-300"
                      aria-label={social.name}
                    >
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-slate-900 to-slate-950">
        {/* Main Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#3e4e3b] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Vagdevi Vidya Mandir</p>
                  <p className="text-xs text-white/50">Est. 2002</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Nurturing minds, building character, and creating future leaders through holistic education.
              </p>
              <div className="flex gap-3">
                {["Twitter", "Facebook", "Instagram", "YouTube"].map((social, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-9 h-9 bg-white/5 hover:bg-[#3e4e3b] rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label={social}
                  >
                    <svg className="w-4 h-4 text-white/60 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Admissions", "Gallery", "Contact"].map((link, i) => (
                  <li key={i}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academics */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Academics</h4>
              <ul className="space-y-3">
                {["Primary School", "Middle School", "High School", "CBSE Curriculum", "Examinations"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {["Student Portal", "Parent Login", "Fee Payment", "Calendar", "Downloads"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>City, State - PIN</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 XXXXX XXXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@vvm.edu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-white/40 text-center md:text-left">
                © {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {["Privacy Policy", "Terms of Service", "Sitemap"].map((link, i) => (
                  <a key={i} href="#" className="text-xs sm:text-sm text-white/40 hover:text-white/70 transition-colors">
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
