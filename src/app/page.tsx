"use client";

import { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import Image from "next/image";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { AnimatedCounter } from "@/components/ui/animated-counter";

// Lazy load heavy components
const TestimonialsCard = lazy(() => import("@/components/ui/testimonials-card").then(mod => ({ default: mod.TestimonialsCard })));
const ScrollingTestimonials = lazy(() => import("@/components/ui/scrolling-testimonials").then(mod => ({ default: mod.ScrollingTestimonials })));
const GalleryWithTab = lazy(() => import("@/components/ui/gallery-with-tab").then(mod => ({ default: mod.GalleryWithTab })));
const FacilitiesCarousel = lazy(() => import("@/components/FacilitiesCarousel"));

// Auto-scrolling marquee images - Row 1 (first 10)
const marqueeImagesRow1 = [
  "/scrolling/MSP02217.JPG",
  "/scrolling/MSP02224.JPG",
  "/scrolling/MSP02298.JPG",
  "/scrolling/MSP02363.JPG",
  "/scrolling/MSP02400.JPG",
  "/scrolling/MSP02421.JPG",
  "/scrolling/MSP02461.JPG",
  "/scrolling/MSP02476.JPG",
  "/scrolling/MSP02526.JPG",
  "/scrolling/MSP02576.JPG",
];

// Auto-scrolling marquee images - Row 2 (last 10)
const marqueeImagesRow2 = [
  "/scrolling/MSP02611.JPG",
  "/scrolling/MSP02631.JPG",
  "/scrolling/MSP02645 (1).JPG",
  "/scrolling/MSP02686.JPG",
  "/scrolling/MSP02715.JPG",
  "/scrolling/MSP02797.JPG",
  "/scrolling/MSP02805.JPG",
  "/scrolling/MSP02865.JPG",
  "/scrolling/MSP02962.JPG",
  "/scrolling/MSP03077.JPG",
];

// Auto-scrolling Marquee Component - CSS-only animation (no JS per-frame loop)
const InfiniteMarquee = memo(function InfiniteMarquee({ images, direction = "left" }: { images: string[]; direction?: "left" | "right" }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(marqueeRef, { amount: 0.1 });

  return (
    <div ref={marqueeRef} className="overflow-hidden">
      <div
        className={`flex gap-4 will-change-transform ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "max-content", animationPlayState: isInView ? "running" : "paused" }}
      >
        {/* Double images for seamless infinite loop */}
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
      </div>
    </div>
  );
});

// Animation variants - enhanced
const easeSmooth: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: easeSmooth }
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: easeSmooth }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: easeSmooth }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

// Parallax scroll hook for section elements
function useParallaxScroll(offset = 50) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return { ref, y };
}

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

// Section Divider component
const SectionDivider = memo(function SectionDivider({ variant = "light" }: { variant?: "light" | "dark" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const isDark = variant === "dark";
  
  return (
    <motion.div
      ref={ref}
      className="relative w-full flex items-center justify-center py-2"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={`h-[1px] ${isDark ? 'bg-gradient-to-r from-transparent via-[#e9e9e9]/20 to-transparent' : 'bg-gradient-to-r from-transparent via-[#3e4e3b]/15 to-transparent'}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: "80%" } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.div>
  );
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>('email');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const notificationTimer = useRef<NodeJS.Timeout | null>(null);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    if (notificationTimer.current) clearTimeout(notificationTimer.current);
    const titles = { success: 'Success!', error: 'Something went wrong', info: 'Heads up' };
    setNotification({ type, title: titles[type], message });
    notificationTimer.current = setTimeout(() => setNotification(null), 5000);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const sendViaWhatsApp = (formData: typeof contactForm) => {
    const lines = [
      `*New Contact Form Submission*`,
      ``,
      `*Name:* ${formData.name}`,
      formData.phone ? `*Phone:* ${formData.phone}` : "",
      formData.email ? `*Email:* ${formData.email}` : "",
      formData.subject ? `*Subject:* ${formData.subject}` : "",
      formData.message ? `*Message:* ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const encoded = encodeURIComponent(lines);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919490670461&text=${encoded}`;
    window.location.href = whatsappUrl;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, subject, message } = contactForm;

    // Validation
    if (!name || !phone || !email) {
      showNotification('error', 'Please fill in your name, phone number, and email address.');
      return;
    }

    if (sendMethod === 'whatsapp') {
      sendViaWhatsApp(contactForm);
      return;
    }

    setIsSubmitting(true);

    try {
      // Try to send via email first
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        // Email sent successfully
        showNotification('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        setContactForm({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (data.fallbackToWhatsApp) {
        // Fallback to WhatsApp (daily limit reached or service unavailable)
        showNotification('info', 'Email service temporarily unavailable. Redirecting to WhatsApp...');
        setTimeout(() => sendViaWhatsApp(contactForm), 1500);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback to WhatsApp on any error
      showNotification('info', 'Switching to WhatsApp for your convenience...');
      setTimeout(() => sendViaWhatsApp(contactForm), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };
  const isHeroInView = useInView(heroSectionRef, { amount: 0.3 });

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

  // Play/pause video based on hero section visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHeroInView) {
      video.play().catch(() => {
        // Ignore play errors (e.g., if autoplay is blocked)
      });
    } else {
      video.pause();
    }
  }, [isHeroInView]);

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence mode="wait">
        {notification && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => { if (info.offset.y < -40) setNotification(null); }}
            className="fixed top-3 left-3 right-3 sm:top-5 sm:left-auto sm:right-5 sm:max-w-[420px] z-[9999]"
          >
            {/* Mobile drag handle */}
            <div className="flex justify-center pt-2 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-[#3e4e3b]/20" />
            </div>

            <div className={`
              relative overflow-hidden
              mx-0 sm:mx-0
              rounded-2xl
              shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:shadow-2xl
              border sm:border-2
              backdrop-blur-xl
              ${notification.type === 'error'
                ? 'bg-white/95 border-red-200 sm:bg-white/98'
                : 'bg-white/95 border-[#3e4e3b]/20 sm:bg-white/98'
              }
            `}>
              {/* Colored accent bar — top on mobile, left on desktop */}
              <div className={`
                absolute top-0 left-0 right-0 h-1 sm:h-auto sm:top-0 sm:bottom-0 sm:w-1.5 sm:right-auto
                ${notification.type === 'error' ? 'bg-gradient-to-r sm:bg-gradient-to-b from-red-400 to-rose-500' : ''}
                ${notification.type !== 'error' ? 'bg-gradient-to-r sm:bg-gradient-to-b from-[#4a5d47] to-[#3e4e3b]' : ''}
              `} />

              <div className="flex items-start gap-3 px-4 py-4 sm:pl-6 sm:pr-4 sm:py-5">
                {/* Icon with colored background circle */}
                <div className={`
                  flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
                  ${notification.type === 'error' ? 'bg-red-100 text-red-600' : ''}
                  ${notification.type !== 'error' ? 'bg-[#3e4e3b]/10 text-[#3e4e3b]' : ''}
                `}>
                  {notification.type === 'success' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  )}
                  {notification.type === 'info' && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                {/* Title + Message */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className={`
                    text-sm sm:text-[15px] font-bold tracking-tight
                    ${notification.type === 'error' ? 'text-red-800' : 'text-[#3e4e3b]'}
                  `}>
                    {notification.title}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#3e4e3b]/70 leading-snug break-words">
                    {notification.message}
                  </p>
                  {/* Swipe hint on mobile */}
                  <p className="mt-1.5 text-[10px] text-[#3e4e3b]/40 sm:hidden">Swipe up to dismiss</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setNotification(null)}
                  className="flex-shrink-0 p-1.5 -mt-1 -mr-1 rounded-full hover:bg-[#3e4e3b]/5 active:bg-[#3e4e3b]/10 transition-colors"
                  aria-label="Close notification"
                >
                  <svg className="w-4 h-4 text-[#3e4e3b]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Animated progress bar */}
              <div className="h-0.5 w-full bg-[#3e4e3b]/5">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className={`h-full ${
                    notification.type === 'error' ? 'bg-red-400' : 'bg-[#3e4e3b]/60'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
      <ScrollToTop />
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        id="home"
        className="relative min-h-screen w-full bg-slate-950 overflow-hidden"
      >
        {/* Video Background */}
        {/* Video Background with Parallax */}
        <ParallaxBackground className="z-0" speed={0.2}>
          <video
            ref={videoRef}
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
        
        {/* Animated grain overlay */}
        <div className="absolute inset-0 noise-overlay opacity-30 z-[1]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-12 py-20 md:py-24 items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-7 text-center md:text-left">

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full mb-6"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-[#e9e9e9]/60">Est. 2002</span>
                <span className="w-px h-2.5 bg-[#e9e9e9]/15" />
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-[#e9e9e9]/60">AP Govt Recognized</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.span 
                  className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent drop-shadow-2xl inline-block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Vagdevi
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-amber-200/90 via-[#e9e9e9] to-amber-200/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Vidya Mandir
                </motion.span>
              </motion.h1>

              {/* Decorative line - enhanced with draw animation */}
              <motion.div
                className="flex items-center gap-3 my-6 justify-center md:justify-start"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div 
                  className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-300/40"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-amber-300/40"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
                <motion.div 
                  className="w-24 h-[2px] bg-amber-200/25"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                />
              </motion.div>

              <motion.p
                className="text-sm sm:text-base lg:text-lg text-[#e9e9e9]/80 max-w-lg mx-auto md:mx-0 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                A Place Where Knowledge Meets Excellence! Nurturing minds, building character, and creating future leaders through quality education.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-8 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
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

              {/* Quick Stats Row - Enhanced with AnimatedCounter */}
              <motion.div
                className="flex flex-wrap gap-8 justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {[
                  { value: 25, suffix: "+", label: "Years" },
                  { value: 5000, suffix: "+", label: "Alumni" },
                  { value: 100, suffix: "%", label: "Results" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.15 }}
                  >
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-[#e9e9e9] to-amber-100/80 bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-amber-200/40 uppercase tracking-widest mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20" />

        {/* Scroll indicator — CSS-only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-[fadeIn_0.8s_ease_1.5s_both]">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#e9e9e9]/30 font-medium animate-pulse">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-[#e9e9e9]/20 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-[#e9e9e9]/50 animate-[scrollDot_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Foreword Section */}
      <section id="foreword" className="relative w-full bg-[#f8fafc] pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
        {/* Green grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(to right, #3e4e3b 1px, transparent 1px), linear-gradient(to bottom, #3e4e3b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating decorative elements */}

        {/* Auto-scrolling Image Marquee at Top */}
        <div className="relative w-full z-20">
          <div className="space-y-4">
            {/* First Row - scrolls left (first 10 images) */}
            <div className="opacity-100 transition-opacity">
              <InfiniteMarquee images={marqueeImagesRow1} direction="left" />
            </div>
            {/* Second Row - scrolls right (last 10 images) */}
            <div className="opacity-100 transition-opacity">
              <InfiniteMarquee images={marqueeImagesRow2} direction="right" />
            </div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-[#3e4e3b]/[0.015] rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
          <AnimatedSection>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-10">

              {/* Section Header - Centered */}
              <motion.div variants={fadeInUp} className="col-span-4 md:col-span-8 lg:col-span-12 text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
                <motion.span 
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#3e4e3b]/10 via-[#3e4e3b]/5 to-[#3e4e3b]/10 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Foreword</span>
                </motion.span>
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
                <motion.div variants={fadeInLeft} className="col-span-4 md:col-span-8 lg:col-span-4 order-1">
                  <div className="sticky top-32">
                    {/* Professional Image Card */}
                    <div className="relative group gradient-border-animated rounded-2xl">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-white card-lift">
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
                <motion.div variants={fadeInRight} className="col-span-4 md:col-span-8 lg:col-span-8 order-2 space-y-6">


                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-100/50 hover:shadow-xl transition-shadow duration-500 card-lift">
                    <div className="space-y-5 text-sm sm:text-base text-[#3e4e3b]/70 leading-[1.8]">
                      <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#3e4e3b] first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                        IIt is with immense pride and profound gratitude that I welcome you to Vagdevi Vidya Mandir, an institution that has been steadfastly nurturing young minds and shaping exemplary futures for over two decades. From our humble beginnings to our current standing as a beacon of holistic education, we have remained unwavering in our commitment to fostering excellence in academics, character development, and essential life skills.
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
                <div className="text-center mb-10 sm:mb-14">
                  <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#3e4e3b]/5 backdrop-blur-sm rounded-full mb-5 border border-[#3e4e3b]/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]/70">Why Choose Us</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2d3a2e] tracking-tight">
                    Why Choose Vagdevi Vidya Mandir
                  </h3>
                </div>

                <div className="flex justify-center">
                  <img src="/whychooseus.gif" alt="Why Choose Vagdevi Vidya Mandir" className="w-full max-w-4xl" />
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full bg-[#3e4e3b] py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Centered Section Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <motion.span 
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9e9e9] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9e9e9]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#e9e9e9]">Our Facilities</span>
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e9e9e9] leading-tight tracking-tight mb-4 sm:mb-6">
                World-Class Infrastructure
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#e9e9e9]/60 leading-relaxed max-w-2xl mx-auto">
                State-of-the-art facilities meticulously designed to nurture every aspect of student development
              </p>
            </motion.div>

            {/* Two-column: Carousel left, God image right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Left — Carousel */}
              <motion.div variants={fadeInUp} className="lg:col-span-8">
                <Suspense fallback={
                  <div className="w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl sm:rounded-3xl bg-white/5 animate-pulse flex items-center justify-center">
                    <div className="text-white/40 text-sm">Loading facilities...</div>
                  </div>
                }>
                  <FacilitiesCarousel />
                </Suspense>
              </motion.div>

              {/* Right — God image (transparent container) */}
              <motion.div variants={fadeInRight} className="lg:col-span-4 flex items-center justify-center lg:sticky lg:top-24">
                <div className="relative w-full max-w-sm lg:max-w-none flex flex-col items-center">

                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                      <Image
                        src="/facilities/god_image.png"
                        alt="Divine blessings"
                        width={400}
                        height={500}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        priority={false}
                      />
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="relative w-full bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3e4e3b]/3 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3e4e3b]/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: '-4s' }} />
        {/* Green grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(to right, #3e4e3b 1px, transparent 1px), linear-gradient(to bottom, #3e4e3b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating elements */}

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
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-4 sm:mb-6">
                  Admissions Open
                </h2>
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
              <motion.div variants={fadeInLeft} className="col-span-4 md:col-span-8 lg:col-span-6 relative mb-10 sm:mb-16 lg:mb-0">
                <motion.div 
                  className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image
                    src="/admissionprocess.png"
                    alt="Admission Process - 5 Steps: Inquiry, Application, Interaction, Assessment, Confirmation"
                    width={800}
                    height={1000}
                    className="w-full h-auto opacity-90"
                    sizes="(min-width: 1024px) 650px, (min-width: 768px) 550px, 100vw"
                  />
                </motion.div>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInRight} className="col-span-4 md:col-span-8 lg:col-span-6">
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
                          { value: "AP Govt", sub: "Recognized" },
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
        {/* Background Image with Parallax */}
        <ParallaxBackground
          image="/testmonials_background.JPG"
          mobileImage="/testmonialsbackgroundmobile.jpg"
          imageAlt="Testimonials background"
          speed={0.15}
          className="z-0"
        />
        {/* Green Blur Overlay */}
        <div className="absolute inset-0 bg-[#3e4e3b]/85 backdrop-blur-[2px]" />
        
        {/* Floating elements */}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#e9e9e9]/10 backdrop-blur-sm rounded-full mb-6 border border-[#e9e9e9]/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9e9e9] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9e9e9]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#e9e9e9]/80">Voices of Excellence</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5 sm:mb-6 text-[#e9e9e9]">
                Teacher Testimonials
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#e9e9e9]/50 leading-relaxed max-w-2xl mx-auto">
                Hear from our dedicated educators who shape young minds and inspire excellence every day
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent to-[#e9e9e9]/25" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e9e9e9]/30" />
                <div className="w-20 h-[1.5px] bg-[#e9e9e9]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e9e9e9]/30" />
                <div className="w-12 h-[1.5px] bg-gradient-to-l from-transparent to-[#e9e9e9]/25" />
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
                      title: "Pasumarthi Sudha Rani — Director",
                      description: "Leading Vagdevi Vidya Mandir has been a journey of passion and purpose. Our commitment to nurturing academic brilliance and moral values continues to shape generations of confident, well-rounded individuals.",
                      image: "/testmonials/Pasumarthi%20Sudha%20Rani.png",
                      experience: "24 Yrs",
                    },
                    {
                      id: 2,
                      title: "Vijjapu Devi — English Teacher",
                      description: "Teaching at Vagdevi Vidya Mandir has been profoundly rewarding. The supportive environment and focus on holistic development allow us to nurture not just academic excellence but also strong character in our students.",
                      image: "/testmonials/VIJJAPU%20%20DEVI.png",
                      experience: "22 Yrs",
                    },
                    {
                      id: 3,
                      title: "Gampala Bhaskara Rao — Primary Telugu Teacher",
                      description: "Teaching Telugu at the primary level at VVM has been a deeply fulfilling experience. Instilling a love for the mother tongue in young learners and watching them grow confident in their language skills brings immense joy and purpose to my work.",
                      image: "/testmonials/GAMPALA%20BHASKARA%20RAO.png",
                      experience: "16 Yrs",
                    },
                    {
                      id: 4,
                      title: "Radha Rani Agarwal — Hindi Teacher",
                      description: "VVM celebrates cultural heritage alongside modern education. Our dedicated approach to Hindi language teaching helps students connect with their roots while building strong communication skills for the future.",
                      image: "/testmonials/RADHA%20RANI%20AGARWAL.png",
                      experience: "22 Yrs",
                    },
                    {
                      id: 5,
                      title: "Kandukuri Satya Veni — Science Teacher",
                      description: "The state-of-the-art laboratories and innovative teaching methods here enable us to provide hands-on learning experiences. Watching students discover their passion for science is the most fulfilling aspect of my career.",
                      image: "/testmonials/KANDUKURI%20SATYA%20VENI.png",
                      experience: "21 Yrs",
                    },
                    {
                      id: 6,
                      title: "Kotinadham Vasundhara Devi — Higher Maths Teacher",
                      description: "The progressive curriculum and collaborative environment at VVM empower us as educators. Every day, I see students developing into responsible, compassionate young citizens of tomorrow.",
                      image: "/testmonials/KOTINADHAM%20VASUNDHARA%20DEVI.png",
                      experience: "19 Yrs",
                    },
                    {
                      id: 7,
                      title: "Dalli Sharmila — Mother Teacher",
                      description: "What sets VVM apart is the emphasis on creative expression and critical thinking. Our students don't just learn; they explore, question, and grow into confident communicators and leaders.",
                      image: "/testmonials/DALLI%20SHARMILA.png",
                      experience: "14 Yrs",
                    },
                    {
                      id: 8,
                      title: "Addepalli Krishna Kumari — Pre-Primary Teacher",
                      description: "Nurturing young minds at VVM is a privilege. Our thoughtful early education approach ensures children develop a strong foundation of curiosity, confidence, and lifelong love for learning.",
                      image: "/testmonials/ADDEPALLI%20%20%20%20KRISHNA%20%20%20%20KUMARI.png",
                      experience: "12 Yrs",
                    },
                    {
                      id: 9,
                      title: "Munagapati Ambica — Higher English Teacher",
                      description: "Being part of the Vagdevi family has been an enriching experience. The school's commitment to nurturing both academic brilliance and moral values makes it a truly exceptional institution to teach at.",
                      image: "/testmonials/MUNAGAPATI%20%20%20AMBICA.png",
                      experience: "11 Yrs",
                    },
                    {
                      id: 10,
                      title: "Gampala Vijayasree — Telugu Teacher",
                      description: "VVM celebrates creativity and artistic expression. Our dedicated approach to Telugu language and literature inspires students to embrace their cultural heritage while building strong communication skills.",
                      image: "/testmonials/GAMPALA%20VIJAYASREE.png",
                      experience: "10 Yrs",
                    },
                    {
                      id: 11,
                      title: "Yoga Sir — Physical Education & Yoga",
                      description: "The expansive sports facilities and strong emphasis on physical and mental fitness create an ideal environment. Yoga and sports teach discipline, mindfulness, and resilience—values that last a lifetime.",
                      image: "/testmonials/yoga.png",
                    },
                  ]}
                  width={700}
                  autoPlay={true}
                  autoPlayInterval={5000}
                />
              </Suspense>
            </div>
          </AnimatedSection>

          {/* Parent & Alumni Scrolling Testimonials */}
          <div className="mt-20 sm:mt-28">
            <Suspense fallback={null}>
              <ScrollingTestimonials
                parentTestimonials={[
                  {
                    name: "Srinivas Reddy",
                    role: "Parent — Class X",
                    message: "VVM has been instrumental in shaping my child's academic journey. The teachers go above and beyond to ensure every student reaches their potential.",
                  },
                  {
                    name: "Lakshmi Devi",
                    role: "Parent — Class VII",
                    message: "The holistic approach to education at VVM is remarkable. My daughter has grown not just academically but also in confidence and character.",
                  },
                  {
                    name: "Ramesh Kumar",
                    role: "Parent — Class V",
                    message: "What impresses me most is the individual attention each child receives. The school truly cares about nurturing every student's unique talents.",
                  },
                  {
                    name: "Padma Kumari",
                    role: "Parent — Class VIII",
                    message: "The discipline, values, and quality education at VVM have made a lasting impact on my son. We are grateful for the wonderful learning environment.",
                  },
                  {
                    name: "Venkat Rao",
                    role: "Parent — Class III",
                    message: "From day one, VVM has felt like a second home for our child. The warmth of the teachers and the structured curriculum are truly commendable.",
                  },
                  {
                    name: "Anitha Sharma",
                    role: "Parent — Class IX",
                    message: "VVM's focus on both academics and extracurriculars has helped my child become a well-rounded individual. The school events and competitions are fantastic.",
                  },
                ]}
                alumniTestimonials={[
                  {
                    name: "Priya Reddy",
                    role: "Alumni — Batch 2018",
                    message: "The foundation VVM gave me was invaluable. The discipline and values I learned here continue to guide me in my engineering career.",
                  },
                  {
                    name: "Karthik Naidu",
                    role: "Alumni — Batch 2015",
                    message: "VVM shaped who I am today. The teachers believed in us and pushed us to achieve more than we thought possible. Forever grateful.",
                  },
                  {
                    name: "Sneha Rao",
                    role: "Alumni — Batch 2020",
                    message: "The memories and friendships I made at VVM are priceless. The school prepared me exceptionally well for competitive exams and beyond.",
                  },
                  {
                    name: "Arun Kumar",
                    role: "Alumni — Batch 2016",
                    message: "VVM was more than a school—it was a family. The moral values and academic excellence instilled in us set a strong foundation for life.",
                  },
                  {
                    name: "Divya Sri",
                    role: "Alumni — Batch 2019",
                    message: "I credit my success in medicine to the rigorous preparation and loving guidance I received at VVM. The science labs were outstanding.",
                  },
                  {
                    name: "Rahul Varma",
                    role: "Alumni — Batch 2017",
                    message: "Every teacher at VVM left a lasting impression. Their dedication to our growth—both personal and academic—is something I carry with me always.",
                  },
                ]}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative w-full bg-gradient-to-br from-slate-50 via-white to-[#3e4e3b]/5 py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Green grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(to right, #3e4e3b 1px, transparent 1px), linear-gradient(to bottom, #3e4e3b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        {/* Decorative Background */}
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-[#3e4e3b]/8 to-transparent rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#3e4e3b]/6 to-transparent rounded-full blur-3xl animate-morph" style={{ animationDelay: '-5s' }} />
        
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
                      label: "Dance",
                      value: "dance",
                      images: [
                        { imageLink: "/gallery/dance/MSP02529.JPG" },
                        { imageLink: "/gallery/dance/MSP02534.JPG" },
                        { imageLink: "/gallery/dance/MSP02537.JPG" },
                        { imageLink: "/gallery/dance/MSP02542.JPG" },
                        { imageLink: "/gallery/dance/MSP02564.JPG" },
                        { imageLink: "/gallery/dance/MSP02826.JPG" },
                        { imageLink: "/gallery/dance/MSP02836.JPG" },
                        { imageLink: "/gallery/dance/MSP02842.JPG" },
                      ],
                    },
                    {
                      label: "Karate & Boxing",
                      value: "karate",
                      images: [
                        { imageLink: "/gallery/karate&Boxing/MSP02277.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02287.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02300.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02303.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02312.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02324.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02354.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02359.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02363.JPG" },
                        { imageLink: "/gallery/karate&Boxing/MSP02366.JPG" },
                      ],
                    },
                    {
                      label: "Skating",
                      value: "skating",
                      images: [
                        { imageLink: "/gallery/skating/MSP02452.JPG" },
                        { imageLink: "/gallery/skating/MSP02461.JPG" },
                        { imageLink: "/gallery/skating/MSP02479.JPG" },
                        { imageLink: "/gallery/skating/MSP02510.JPG" },
                        { imageLink: "/gallery/skating/MSP02515.JPG" },
                        { imageLink: "/gallery/skating/MSP02522.JPG" },
                        { imageLink: "/gallery/skating/MSP02796.JPG" },
                        { imageLink: "/gallery/skating/MSP02801.JPG" },
                        { imageLink: "/gallery/skating/MSP02804.JPG" },
                        { imageLink: "/gallery/skating/MSP02805.JPG" },
                        { imageLink: "/gallery/skating/MSP02823.JPG" },
                      ],
                    },
                    {
                      label: "Sports",
                      value: "sports",
                      images: [
                        { imageLink: "/gallery/sports/MSP02383.JPG" },
                        { imageLink: "/gallery/sports/MSP02384.JPG" },
                        { imageLink: "/gallery/sports/MSP02409.JPG" },
                        { imageLink: "/gallery/sports/MSP02417.JPG" },
                        { imageLink: "/gallery/sports/MSP02884.JPG" },
                        { imageLink: "/gallery/sports/MSP02906.JPG" },
                        { imageLink: "/gallery/sports/MSP02927.JPG" },
                        { imageLink: "/gallery/sports/MSP03067.JPG" },
                        { imageLink: "/gallery/sports/MSP03072.JPG" },
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
        {/* Background Image with Parallax */}
        <ParallaxBackground
          image="/aboutusbackground.JPG"
          imageAlt="About Us background"
          speed={0.15}
          className="z-0"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-[#3e4e3b]/90" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating elements */}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#e9e9e9]/10 backdrop-blur-sm rounded-full mb-6 border border-[#e9e9e9]/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9e9e9] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9e9e9]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#e9e9e9]/80">About Us</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent animate-gradient-text">A Legacy of </span>
                <span className="bg-gradient-to-r from-amber-200/90 via-[#e9e9e9] to-amber-200/70 bg-clip-text text-transparent animate-gradient-text" style={{ animationDelay: '-2s' }}>25 Years</span>
                <span className="bg-gradient-to-r from-[#e9e9e9] via-amber-100 to-[#e9e9e9] bg-clip-text text-transparent animate-gradient-text" style={{ animationDelay: '-4s' }}> in Education</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#e9e9e9]/50 leading-relaxed max-w-2xl mx-auto">
                A Place Where Knowledge Meets Excellence!
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent to-[#e9e9e9]/25" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e9e9e9]/30" />
                <div className="w-20 h-[1.5px] bg-[#e9e9e9]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e9e9e9]/30" />
                <div className="w-12 h-[1.5px] bg-gradient-to-l from-transparent to-[#e9e9e9]/25" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left - Content */}
              <motion.div variants={fadeInLeft} className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#e9e9e9]/40 via-[#e9e9e9]/20 to-transparent rounded-full hidden sm:block" />
                  <p className="text-[#e9e9e9]/80 text-sm sm:text-base lg:text-lg leading-relaxed sm:pl-6">
                    Twenty-five years ago, Vagdevi Vidya Mandir was founded with a vision to create a school that goes beyond just academics. Observing many schools with only buildings and no playgrounds, where students suffered from stress due to a lack of outdoor activities, we set out to build something different—a school that nurtures both the mind and body.
                  </p>
                </div>

                <p className="text-[#e9e9e9]/60 text-sm sm:text-base leading-relaxed">
                  At Vagdevi Vidya Mandir, we believe that education is not just about books but also about a child&apos;s mental and physical well-being. Our lush green campus and expansive playground provide the perfect environment for students to learn, grow, and play freely. We give equal importance to physical activities, ensuring that every child develops holistically with a balance of academics, sports, and extracurricular activities.
                </p>

                <p className="text-[#e9e9e9]/60 text-sm sm:text-base leading-relaxed">
                  Today, after 25 years, our school stands as a proud institution shaping young minds with knowledge, values, and discipline. We continue to uphold our mission of creating a joyful learning experience, fostering creativity, and encouraging overall development.
                </p>

                {/* Tagline */}
                <div className="relative mt-8 flex items-start gap-3">
                  <svg className="w-7 h-7 text-[#e9e9e9]/25 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base sm:text-lg lg:text-xl font-semibold italic text-[#e9e9e9]/80">
                    Vagdevi Vidya Mandir — A Place Where Knowledge Meets Excellence!
                  </p>
                </div>
              </motion.div>

              {/* Right - Stats & Highlights */}
              <motion.div variants={fadeInRight} className="space-y-6">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {[
                    { number: 25, suffix: "+", label: "Years of Excellence", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { number: 5000, suffix: "+", label: "Alumni Network", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
                    { number: 100, suffix: "%", label: "Holistic Development", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138" },
                    { number: 50, suffix: "+", label: "Qualified Faculty", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="group p-5 sm:p-6 rounded-2xl border border-[#e9e9e9]/10 hover:border-[#e9e9e9]/20 transition-all duration-300 card-lift"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ borderColor: "rgba(233,233,233,0.25)" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#e9e9e9]/10 flex items-center justify-center mb-3 group-hover:bg-[#e9e9e9]/15 transition-colors duration-300">
                        <svg className="w-5 h-5 text-[#e9e9e9]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                        </svg>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#e9e9e9] mb-1">
                        <AnimatedCounter value={stat.number} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className="text-xs sm:text-sm text-[#e9e9e9]/45 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Vision highlights */}
                <div className="space-y-3">
                  {[
                    { title: "Holistic Education", desc: "Balancing academics, sports, and extracurricular activities for complete development" },
                    { title: "Green Campus", desc: "Lush green environment with expansive playgrounds for physical well-being" },
                    { title: "Value-Based Learning", desc: "Instilling knowledge, discipline, and strong moral values in every student" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex gap-4 p-4 rounded-xl hover:bg-[#e9e9e9]/[0.04] transition-all duration-300 group"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#e9e9e9]/10 flex items-center justify-center mt-0.5 group-hover:bg-[#e9e9e9]/20 transition-colors duration-300">
                        <svg className="w-4 h-4 text-[#e9e9e9]/70 group-hover:text-[#e9e9e9] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#e9e9e9] mb-0.5">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-[#e9e9e9]/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-[#f8fafc] py-20 sm:py-24 lg:py-36 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/gallery/treecontact.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#f8fafc]/85" />
        </div>
        {/* Green grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(to right, #3e4e3b 1px, transparent 1px), linear-gradient(to bottom, #3e4e3b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#3e4e3b]/5 backdrop-blur-sm rounded-full mb-6 border border-[#3e4e3b]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e4e3b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3e4e3b]" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#3e4e3b]">Get in Touch</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3e4e3b] leading-tight tracking-tight mb-4 sm:mb-6">
                Contact Us
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#3e4e3b]/60 leading-relaxed px-2 max-w-2xl mx-auto">
                We&apos;d love to hear from you. Reach out with any questions about admissions, programs, or campus visits.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#3e4e3b]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#3e4e3b]/30" />
                <div className="w-20 h-[2px] bg-[#3e4e3b]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#3e4e3b]/30" />
                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#3e4e3b]/20" />
              </div>
            </motion.div>

            {/* Main Content: Form + Map side by side */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 max-w-6xl mx-auto">

              {/* Contact Form */}
              <div className="lg:col-span-7 relative group order-1">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3e4e3b]/25 via-[#3e4e3b]/10 to-[#3e4e3b]/25 rounded-2xl sm:rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-full bg-white rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-7 lg:p-10 border border-[#3e4e3b]/8 shadow-lg">
                  {/* Form header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#3e4e3b]/8">
                    <div className="w-11 h-11 bg-[#3e4e3b] rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-[#e9e9e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#3e4e3b]">Send a Message</h3>
                      <p className="text-xs sm:text-sm text-[#3e4e3b]/50 mt-0.5">Fill in the details and we&apos;ll get back to you</p>
                    </div>
                  </div>

                  <form className="space-y-5" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          className="peer w-full bg-[#f8fafc] border border-[#3e4e3b]/10 rounded-xl px-5 py-3.5 text-[#3e4e3b] text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/15 focus:border-[#3e4e3b]/40 transition-all"
                          placeholder="Full Name"
                          suppressHydrationWarning
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-4 -top-2.5 bg-[#f8fafc] px-1.5 text-[11px] font-semibold text-[#3e4e3b]/70 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#3e4e3b]/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-[#3e4e3b]"
                        >
                          Full Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          value={contactForm.phone}
                          onChange={handleContactChange}
                          className="peer w-full bg-[#f8fafc] border border-[#3e4e3b]/10 rounded-xl px-5 py-3.5 text-[#3e4e3b] text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/15 focus:border-[#3e4e3b]/40 transition-all"
                          placeholder="Phone Number"
                          suppressHydrationWarning
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-4 -top-2.5 bg-[#f8fafc] px-1.5 text-[11px] font-semibold text-[#3e4e3b]/70 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#3e4e3b]/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-[#3e4e3b]"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="peer w-full bg-[#f8fafc] border border-[#3e4e3b]/10 rounded-xl px-5 py-3.5 text-[#3e4e3b] text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/15 focus:border-[#3e4e3b]/40 transition-all"
                        placeholder="Email Address"
                        suppressHydrationWarning
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 -top-2.5 bg-[#f8fafc] px-1.5 text-[11px] font-semibold text-[#3e4e3b]/70 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#3e4e3b]/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-[#3e4e3b]"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        id="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        className="w-full bg-[#f8fafc] border border-[#3e4e3b]/10 rounded-xl px-5 py-3.5 text-[#3e4e3b] text-sm focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/15 focus:border-[#3e4e3b]/40 transition-all appearance-none cursor-pointer"
                        suppressHydrationWarning
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="general">General Information</option>
                        <option value="fees">Fee Structure</option>
                        <option value="visit">Campus Visit</option>
                        <option value="transport">Transport</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#3e4e3b]/40">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <label htmlFor="subject" className="absolute left-4 -top-2.5 bg-[#f8fafc] px-1.5 text-[11px] font-semibold text-[#3e4e3b]/70">
                        Subject
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={handleContactChange}
                        className="peer w-full bg-[#f8fafc] border border-[#3e4e3b]/10 rounded-xl px-5 py-3.5 text-[#3e4e3b] text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/15 focus:border-[#3e4e3b]/40 transition-all resize-none"
                        placeholder="Message"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 -top-2.5 bg-[#f8fafc] px-1.5 text-[11px] font-semibold text-[#3e4e3b]/70 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#3e4e3b]/40 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:text-[#3e4e3b]"
                      >
                        How can we help you?
                      </label>
                    </div>

                    {/* Send Method Toggle */}
                    <div className="flex items-center gap-2 p-1 bg-[#f0f2f0] rounded-xl">
                      <button
                        type="button"
                        onClick={() => setSendMethod('email')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          sendMethod === 'email'
                            ? 'bg-[#3e4e3b] text-white shadow-md shadow-[#3e4e3b]/20'
                            : 'text-[#3e4e3b]/60 hover:text-[#3e4e3b] hover:bg-white/50'
                        }`}
                        suppressHydrationWarning
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setSendMethod('whatsapp')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          sendMethod === 'whatsapp'
                            ? 'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20'
                            : 'text-[#3e4e3b]/60 hover:text-[#3e4e3b] hover:bg-white/50'
                        }`}
                        suppressHydrationWarning
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                        WhatsApp
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-xl font-bold tracking-wide active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group/btn text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                        sendMethod === 'whatsapp'
                          ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 disabled:hover:bg-[#25D366]'
                          : 'bg-[#3e4e3b] text-white hover:bg-[#4a5d47] hover:shadow-lg hover:shadow-[#3e4e3b]/20 disabled:hover:bg-[#3e4e3b]'
                      }`}
                      suppressHydrationWarning
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : sendMethod === 'whatsapp' ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          </svg>
                          <span>Send via WhatsApp</span>
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Send via Email</span>
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-[#3e4e3b]/35 text-center">
                      By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
                    </p>
                  </form>
                </div>
              </div>

              {/* Right Column: Map + CTA */}
              <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 order-2">
                {/* Map */}
                <div className="h-[250px] sm:h-[300px] lg:flex-1 lg:min-h-[300px] bg-white rounded-2xl sm:rounded-[1.75rem] overflow-hidden shadow-lg border border-[#3e4e3b]/8 relative group">
                  <div className="absolute inset-0 bg-[#3e4e3b]/5 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=V9F9%2BPPJ+Gambhiram+Andhra+Pradesh+531163&zoom=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[60%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md z-20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3e4e3b] animate-pulse" />
                    <span className="text-xs font-bold text-[#3e4e3b]">Our Location</span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <a
                      href="https://www.google.com/maps/search/V9F9%2BPPJ+Gambhiram+Andhra+Pradesh+531163"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#3e4e3b] text-[#e9e9e9] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#4a5d47] transition-all duration-300 shadow-lg"
                    >
                      Get Directions
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Action CTA */}
                <div className="bg-[#3e4e3b] rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-7 lg:p-8 text-[#e9e9e9] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                  <div className="relative z-10">
                    <h4 className="text-lg sm:text-xl font-bold mb-2">Schedule a Campus Visit</h4>
                    <p className="text-sm text-[#e9e9e9]/50 mb-5 leading-relaxed">
                      Experience our lush green campus, classrooms, and sports facilities first-hand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+917680097953"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#e9e9e9] text-[#3e4e3b] font-bold text-sm rounded-xl hover:bg-white transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/917680097953"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#e9e9e9]/20 text-[#e9e9e9] font-semibold text-sm rounded-xl hover:bg-[#e9e9e9]/10 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden">
        <ParallaxBackground
          image="/footerimage.JPG"
          imageAlt="Footer background"
          speed={0.15}
          className="z-0"
        />
        <div className="absolute inset-0 bg-[#3e4e3b]/85" />
        
        {/* Floating elements */}

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14">

          {/* Top: Brand centered */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div 
                className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-1 ring-[#e9e9e9]/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img src="/vvvm_logo.jpg" alt="Vagdevi Vidya Mandir Logo" className="w-full h-full object-cover" />
              </motion.div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e9e9e9] tracking-tight mb-1">Vagdevi Vidya Mandir</h3>
            <p className="text-xs sm:text-sm text-[#e9e9e9]/35 italic">A Place Where Knowledge Meets Excellence!</p>
          </motion.div>

          {/* Middle: 3 columns — Address | Links | Contact */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Address */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Campus</h4>
              <p className="text-sm text-[#e9e9e9]/40 leading-relaxed">
                Gambheeram village, Boyapalem post,<br />
                Anandapuram mandal, Visakhapatnam<br />
                531 163
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                {["Home", "About", "Admissions", "Gallery", "Contact"].map((link, i) => (
                  <a key={i} href={`#${link.toLowerCase()}`} className="text-sm text-[#e9e9e9]/40 hover:text-[#e9e9e9] transition-colors text-underline-animated">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Reach Us</h4>
              <div className="space-y-1 text-sm text-[#e9e9e9]/40">
                <p><a href="tel:+917680097953" className="hover:text-[#e9e9e9] transition-colors">+91 76800 97953</a></p>
                <p><a href="tel:+919490670461" className="hover:text-[#e9e9e9] transition-colors">+91 94906 70461</a></p>
                <p><a href="mailto:info@vagdevidyamandir.com" className="hover:text-[#e9e9e9] transition-colors">info@vagdevidyamandir.com</a></p>
              </div>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-2.5 mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: "Instagram", href: "https://www.instagram.com/vagdevidya_mandir", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              { label: "YouTube", href: "https://www.youtube.com/@vagdevividyamandir4209", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#e9e9e9]/[0.06] hover:bg-[#e9e9e9]/15 rounded-full flex items-center justify-center transition-all duration-300 border border-[#e9e9e9]/[0.06] hover:border-[#e9e9e9]/15 hover:scale-110" aria-label={social.label}>
                <svg className="w-3.5 h-3.5 text-[#e9e9e9]/40 hover:text-[#e9e9e9]" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
              </a>
            ))}
          </motion.div>

          {/* Bottom bar */}
          <motion.div 
            className="pt-5 border-t border-[#e9e9e9]/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs text-[#e9e9e9]/25">© {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.</p>
            <p className="text-xs text-[#e9e9e9]/15">Designed and Crafted by Nachu Gowtham</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
