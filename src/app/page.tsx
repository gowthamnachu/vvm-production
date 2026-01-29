"use client";

import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
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
      <Header />
      
      {/* Hero Section - Half Layout */}
      <main className="min-h-screen w-full bg-[#3e4e3b]">
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-8 md:px-16 lg:px-20 py-24 md:py-0">
            {/* Tagline */}
            <span className="text-white/60 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium">
              Since 2002
            </span>
            
            <p className="text-white/75 text-base md:text-lg lg:text-xl max-w-lg text-center md:text-left mb-10 leading-relaxed font-light">
              Enroll your child in a school that blends quality education, cultural values, and a green learning environment.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#3e4e3b] px-8 py-3.5 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Apply for Admission
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12 mt-12 pt-8 border-t border-white/20">
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">25+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Years Legacy</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">5000+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Alumni</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">98%</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side - Saraswati Image with Shade */}
          <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-screen flex items-end justify-center overflow-hidden">
            {/* Gradient Shade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3e4e3b] via-[#3e4e3b]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3e4e3b]/70 via-transparent to-[#3e4e3b]/20 z-10" />
            
            {/* Saraswati Image Container */}
            <div className="relative w-full h-full flex items-end justify-center p-8 pb-0">
              <div className="relative w-[400px] h-[520px] md:w-[520px] md:h-[680px] lg:w-[600px] lg:h-[800px]">
                <Image
                  src="/god-sketch2.png"
                  alt="Goddess Saraswati - Divine Symbol of Knowledge"
                  fill
                  className="object-contain object-bottom z-20 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Decorative glow behind image */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-20">
              <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-radial from-white/15 via-white/5 to-transparent blur-3xl" />
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
