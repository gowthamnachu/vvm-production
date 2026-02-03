"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

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

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "alumni", "admissions", "gallery", "contact"];
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
          <div className="w-full max-w-2xl py-20 md:py-24 text-center md:text-left">
            
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
      <section id="about" className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-16 lg:mb-24">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#3e4e3b]/60 mb-3 sm:mb-4">About Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
              25 Years of Nurturing Excellence
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              A legacy built on quality education, strong values, and holistic development.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20">
            
            {/* Story */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">Our Journey</h3>
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
                    <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#3e4e3b]/5 text-[#3e4e3b] text-xs sm:text-sm font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Vision */}
              <div className="bg-[#3e4e3b] rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  To create an institution that nurtures holistic development, combining academic excellence with cultural values and physical well-being.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Our Mission</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600">
                  {[
                    "Foster critical thinking and creativity",
                    "Balance academic and physical development",
                    "Instill strong moral values",
                    "Promote environmental awareness"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#3e4e3b] rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-5 sm:p-8">
                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-white italic">
                  &ldquo;Where Learning Meets Growth&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-white/50 mt-2 sm:mt-3">— Our Philosophy</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-10 sm:mt-16 lg:mt-24">
            {[
              { title: "Excellence", desc: "Striving for the highest standards in everything we do" },
              { title: "Integrity", desc: "Upholding honesty and strong moral principles" },
              { title: "Innovation", desc: "Encouraging creative thinking and new ideas" },
              { title: "Compassion", desc: "Fostering empathy, kindness, and respect" },
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#3e4e3b]/20 transition-all"
              >
                <h4 className="text-sm sm:text-lg lg:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">{value.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section id="alumni" className="w-full bg-[#3e4e3b] py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/50 mb-3 sm:mb-4">Our Community</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4 sm:mb-6">Our Alumni</h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed px-2">
              Celebrating 25 years of excellence and the remarkable journey of our 5000+ alumni making an impact worldwide.
            </p>
          </div>
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-12">
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {[
              { value: "5000+", label: "Alumni" },
              { value: "98%", label: "Success Rate" },
              { value: "25+", label: "Years Legacy" },
              { value: "50+", label: "Countries" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl text-center"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</p>
                <p className="text-[8px] sm:text-[10px] lg:text-xs font-medium tracking-wider uppercase text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-5 sm:p-8 lg:p-12 mt-4 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our alumni have achieved remarkable success in medicine, engineering, business, arts, and public service. They carry forward the values and education imparted at Vagdevi Vidya Mandir, making a positive impact worldwide.
            </p>
          </div>

          <p className="text-center text-xs sm:text-sm text-white/40 mt-6 sm:mt-8">
            Drag or swipe to explore our alumni gallery
          </p>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#3e4e3b]/60 mb-3 sm:mb-4">Join Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">Admissions</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed px-2">
              Begin your journey with us. Our streamlined admission process makes it easy to join the Vagdevi family.
            </p>
          </div>

          {/* Process Steps */}
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            {[
              { step: "01", title: "Inquiry", desc: "Contact our admission office or submit an online inquiry form" },
              { step: "02", title: "Application", desc: "Complete the application with all required documents" },
              { step: "03", title: "Interaction", desc: "Meet with our admission team for a brief interaction" },
              { step: "04", title: "Assessment", desc: "Age-appropriate assessment to understand student needs" },
              { step: "05", title: "Confirmation", desc: "Receive admission confirmation and complete enrollment" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 sm:gap-6 bg-white p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-[#3e4e3b]/20 transition-all active:scale-[0.98]"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#3e4e3b]/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-[#3e4e3b] text-sm sm:text-base font-semibold">{item.step}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-0.5 sm:mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#3e4e3b] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">Ready to Join?</h3>
            <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8">
              Contact our admission office for more information about enrollment.
            </p>
            <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#3e4e3b] font-semibold rounded-full hover:bg-white/90 active:scale-95 transition-all text-sm sm:text-base">
              Start Application
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full bg-[#3e4e3b] py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8 lg:mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/50 mb-3 sm:mb-4">Campus Life</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">Gallery</h2>
            <p className="text-sm sm:text-base text-white/70">
              Explore moments from our vibrant campus life
            </p>
          </div>
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

      {/* Contact Section */}
      <section id="contact" className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#3e4e3b]/60 mb-3 sm:mb-4">Get in Touch</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">Contact Us</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed px-2">
              We&apos;d love to hear from you. Reach out with any questions about admissions or our programs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 max-w-5xl mx-auto">
            
            {/* Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Send a Message</h3>
              <form className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-slate-700 font-medium mb-1.5 sm:mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you?" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3e4e3b]/20 focus:border-[#3e4e3b] transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#3e4e3b] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-[#3e4e3b]/90 active:scale-[0.98] transition-all text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:space-y-6 lg:gap-0">
              <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-100 col-span-2 lg:col-span-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Address</h4>
                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                  Vagdevi Vidya Mandir<br />
                  School Address<br />
                  City, State - PIN
                </p>
              </div>
              
              <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-100">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Phone</h4>
                <p className="text-xs sm:text-sm lg:text-base text-slate-600">+91 XXXXX XXXXX</p>
              </div>
              
              <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-100">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Email</h4>
                <p className="text-xs sm:text-sm lg:text-base text-slate-600 break-all">info@vagdevividyamandir.edu</p>
              </div>

              <div className="bg-[#3e4e3b] rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 col-span-2 lg:col-span-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 sm:mb-3">Office Hours</h4>
                <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  Monday - Saturday<br />
                  9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
            <div>
              <p className="text-base sm:text-lg font-semibold text-white">Vagdevi Vidya Mandir</p>
              <p className="text-xs sm:text-sm text-white/50">Excellence in Education Since 2002</p>
            </div>
            <p className="text-xs sm:text-sm text-white/40">
              © {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
