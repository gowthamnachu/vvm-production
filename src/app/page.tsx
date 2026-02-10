"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { GalleryWithTab } from "@/components/ui/gallery-with-tab";
import FacilitiesCarousel from "@/components/FacilitiesCarousel";
import Image from "next/image";

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
        textColor="#e9e9e9"
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
          {/* Animated grain overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
        </div>



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
      <section id="foreword" className="relative w-full bg-gradient-to-b from-slate-950 via-[#f8fafc] to-white pt-0 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
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
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
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
                {/* Image Card with border glow */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#3e4e3b]/20 via-transparent to-[#3e4e3b]/20 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500" />
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/aboutus.png" 
                      alt="Ramineni Radha Krishna - Correspondent" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    {/* Name overlay on image bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-bold text-[#e9e9e9] mb-0.5 drop-shadow-lg">
                        Ramineni Radha Krishna
                      </h4>
                      <p className="text-xs sm:text-sm text-[#e9e9e9]/80 font-medium tracking-wider uppercase">
                        Correspondent
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick info cards below image */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100/50 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-[#3e4e3b]">25+</p>
                    <p className="text-[9px] sm:text-[10px] text-[#3e4e3b]/60 uppercase tracking-wider mt-0.5">Years Leading</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100/50 text-center">
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
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm border border-slate-100/50 hover:shadow-xl hover:border-[#3e4e3b]/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
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
              <FacilitiesCarousel />
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
        <div className="absolute inset-0">
          {/* Mobile Background */}
          <Image src="/testmonialsbackgroundmobile.jpg" alt="Testimonials background" fill className="object-cover object-center sm:hidden" sizes="100vw" />
          {/* Desktop Background */}
          <Image src="/testmonials_background.JPG" alt="Testimonials background" fill className="hidden sm:block object-cover object-center" sizes="100vw" />
        </div>
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
                autoPlayInterval={4000}
              />
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
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full bg-gradient-to-br from-[#3e4e3b] via-[#4a5d47] to-[#3e4e3b] py-20 sm:py-28 lg:py-36 overflow-hidden">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-20 sm:py-24 lg:py-36 overflow-hidden">
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

          <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
            
            {/* Form */}
            <div className="col-span-4 md:col-span-8 lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#3e4e3b]">Send a Message</h3>
                  <p className="text-xs text-[#3e4e3b]/50">We typically respond within 24 hours</p>
                </div>
              </div>
              <form className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-[#3e4e3b]/80 font-semibold mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      className="w-full bg-[#3e4e3b]/5 border border-[#3e4e3b]/15 rounded-xl px-4 py-3 text-sm text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] hover:border-[#3e4e3b]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-[#3e4e3b]/80 font-semibold mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone" 
                      className="w-full bg-[#3e4e3b]/5 border border-[#3e4e3b]/15 rounded-xl px-4 py-3 text-sm text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] hover:border-[#3e4e3b]/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-[#3e4e3b]/80 font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-[#3e4e3b]/5 border border-[#3e4e3b]/15 rounded-xl px-4 py-3 text-sm text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] hover:border-[#3e4e3b]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-[#3e4e3b]/80 font-semibold mb-2">Subject</label>
                  <select className="w-full bg-[#3e4e3b]/5 border border-[#3e4e3b]/15 rounded-xl px-4 py-3 text-sm text-[#3e4e3b] focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] hover:border-[#3e4e3b]/30 transition-all">
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="general">General Information</option>
                    <option value="fees">Fee Structure</option>
                    <option value="visit">Campus Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-[#3e4e3b]/80 font-semibold mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you?" 
                    className="w-full bg-[#3e4e3b]/5 border border-[#3e4e3b]/15 rounded-xl px-4 py-3 text-sm text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] hover:border-[#3e4e3b]/30 transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#3e4e3b] to-[#4a5d47] text-[#e9e9e9] py-3.5 sm:py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-[#3e4e3b]/20 active:scale-[0.98] transition-all text-sm sm:text-base flex items-center justify-center gap-2.5 group"
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
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#3e4e3b] mb-1.5">Address</h4>
                    <p className="text-xs sm:text-sm lg:text-base text-[#3e4e3b]/60 leading-relaxed">
                      Vagdevi Vidya Mandir<br />
                      School Address<br />
                      City, State - PIN
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#3e4e3b] mb-1">Phone</h4>
                  <p className="text-xs sm:text-sm text-[#3e4e3b]/60">+91 XXXXX XXXXX</p>
                </div>
                
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#3e4e3b] to-[#4a5d47] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#3e4e3b] mb-1">Email</h4>
                  <p className="text-xs sm:text-sm text-[#3e4e3b]/60 break-all">info@vvm.edu</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#3e4e3b] via-[#3e4e3b] to-[#2d3a2a] rounded-2xl p-6 sm:p-7 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(233,233,233,0.2) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
                <div className="relative flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#e9e9e9]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#e9e9e9]/10">
                    <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#e9e9e9] mb-1.5">Office Hours</h4>
                    <p className="text-xs sm:text-sm lg:text-base text-[#e9e9e9]/70 leading-relaxed">
                      Monday - Saturday<br />
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
                <h4 className="text-sm sm:text-base font-bold text-[#3e4e3b] mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", name: "Twitter", color: "hover:bg-sky-500" },
                    { icon: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z", name: "Facebook", color: "hover:bg-blue-600" },
                    { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", name: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500" },
                    { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", name: "LinkedIn", color: "hover:bg-blue-700" },
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className={`w-11 h-11 bg-[#3e4e3b]/10 ${social.color} rounded-xl flex items-center justify-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                      aria-label={social.name}
                    >
                      <svg className="w-4 h-4 text-[#3e4e3b]/60 group-hover:text-[#e9e9e9] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
      <footer className="w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
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
