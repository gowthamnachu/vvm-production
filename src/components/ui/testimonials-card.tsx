"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Quote, Award } from "lucide-react";

interface TestimonialItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  experience?: string;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  className?: string;
  width?: number;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TestimonialsCard({
  items,
  className,
  width = 400,
  showNavigation = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}: TestimonialsCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeItem = items[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  React.useEffect(() => {
    if (!autoPlay || items.length <= 1 || !isInView) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, isInView]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const rotations = useMemo(() => [4, -2, -9, 7], []);

  if (!items || items.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("flex items-center justify-center p-4 sm:p-8", className)}>
      <div
        className="relative grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] grid-rows-[auto] sm:grid-rows-[auto_auto_auto] gap-x-10 gap-y-6 sm:gap-y-2 w-full"
        style={{ perspective: "1400px", maxWidth: `${width}px` }}
      >
        {/* Counter */}
        {showCounter && (
          <div className="hidden sm:block col-start-2 row-start-1 text-right font-[family-name:var(--font-epilogue)] text-sm text-[#e9e9e9]/40 tracking-[0.2em]">
            <span className="text-[#e9e9e9] font-semibold text-base tabular-nums">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1.5 text-[#e9e9e9]/25">/</span>
            <span className="tabular-nums">{String(items.length).padStart(2, '0')}</span>
          </div>
        )}

        {/* Image Stack */}
        <div className="col-start-1 row-start-1 sm:row-span-3 relative w-full aspect-[1080/1350] max-w-[280px] sm:max-w-none mx-auto">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 w-full h-full overflow-hidden border-4 bg-[#e9e9e9]/10 border-[#e9e9e9]/30 shadow-2xl rounded-2xl"
                  initial={{
                    x: offset * 15,
                    y: Math.abs(offset) * 6,
                    z: -150 * Math.abs(offset),
                    scale: 0.85 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 15, direction === 1 ? -200 : 200, 0],
                          y: [Math.abs(offset) * 6, 0, 0],
                          z: [-200, 150, 250],
                          scale: [0.85, 1.05, 1],
                          rotateZ: [rotations[index % 4], -5, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 15,
                          y: Math.abs(offset) * 6,
                          z: -150 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.85 - Math.abs(offset) * 0.04,
                          opacity: 0.55,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Experience Ribbon Badge */}
                  {item.experience && (
                    <div className="absolute top-0 left-0 z-10 overflow-hidden w-28 h-28 pointer-events-none">
                      <div
                        className="absolute -left-8 top-5 w-40 text-center py-1.5 shadow-lg"
                        style={{
                          transform: "rotate(-45deg)",
                          background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
                          boxShadow: "0 2px 8px rgba(185, 28, 28, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Award className="w-3 h-3 text-white/90 shrink-0" />
                          <span className="text-white text-[10px] font-bold tracking-wide uppercase leading-none">
                            {item.experience}
                          </span>
                        </div>
                      </div>
                      {/* Ribbon fold shadows */}
                      <div
                        className="absolute top-[4.25rem] left-0 w-0 h-0"
                        style={{
                          borderTop: "4px solid #7f1d1d",
                          borderLeft: "4px solid transparent",
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text Content */}
        <div className="sm:col-start-2 sm:row-start-2 flex flex-col justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <Quote className="w-7 h-7 text-[#e9e9e9]/20 mb-3" strokeWidth={1.5} />
              <p className="text-base sm:text-lg leading-[1.8] text-[#e9e9e9]/80 font-light italic font-[family-name:var(--font-epilogue)]">
                &ldquo;{activeItem.description}&rdquo;
              </p>
              <div className="pt-5 border-t border-[#e9e9e9]/10 mt-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#e9e9e9] tracking-[0.25em] font-[family-name:var(--font-epilogue)] leading-tight" style={{ wordSpacing: "0.15em" }}>
                  {activeItem.title.split("—")[0]?.trim()}
                </h3>
                {activeItem.title.includes("—") && (
                  <p className="text-xs text-[#e9e9e9]/50 font-semibold tracking-[0.25em] uppercase mt-3 font-[family-name:var(--font-epilogue)]">
                    {activeItem.title.split("—")[1]?.trim()}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {showNavigation && items.length > 1 && (
          <div className="sm:col-start-2 sm:row-start-3 flex items-center gap-3 mt-2 sm:mt-4">
            <button
              disabled={activeIndex === 0}
              onClick={handlePrev}
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-full border border-[#e9e9e9]/20 bg-[#e9e9e9]/10 backdrop-blur-sm transition-all duration-300",
                activeIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#e9e9e9]/20 hover:border-[#e9e9e9]/40 hover:scale-110 active:scale-95"
              )}
              suppressHydrationWarning
            >
              <ArrowLeft className="w-4 h-4 text-[#e9e9e9]" />
            </button>
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-6 h-2 bg-[#e9e9e9]"
                      : "w-2 h-2 bg-[#e9e9e9]/30 hover:bg-[#e9e9e9]/50"
                  )}
                  suppressHydrationWarning
                />
              ))}
            </div>
            <button
              disabled={activeIndex === items.length - 1}
              onClick={handleNext}
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-full border border-[#e9e9e9]/20 bg-[#e9e9e9]/10 backdrop-blur-sm transition-all duration-300",
                activeIndex === items.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-[#e9e9e9]/20 hover:border-[#e9e9e9]/40 hover:scale-110 active:scale-95"
              )}
              suppressHydrationWarning
            >
              <ArrowRight className="w-4 h-4 text-[#e9e9e9]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestimonialsCard;
