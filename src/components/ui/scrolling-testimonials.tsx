"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface ScrollingTestimonial {
  name: string;
  role: string;
  message: string;
  image?: string;
}

interface ScrollingTestimonialsProps {
  parentTestimonials: ScrollingTestimonial[];
  alumniTestimonials: ScrollingTestimonial[];
  className?: string;
}

function TestimonialCard({ item, index }: { item: ScrollingTestimonial; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[340px] group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-[#e9e9e9]/[0.06] backdrop-blur-sm border border-[#e9e9e9]/10 rounded-2xl p-5 sm:p-6 h-full transition-all duration-300 hover:bg-[#e9e9e9]/[0.1] hover:border-[#e9e9e9]/20 hover:shadow-lg hover:shadow-black/10">
        {/* Hover circle image */}
        <div
          className={cn(
            "absolute top-3 right-3 w-12 h-12 rounded-full border-2 border-[#c9a96e]/60 overflow-hidden shadow-lg transition-all duration-400 z-10",
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3e4e3b] to-[#5a6d57] flex items-center justify-center">
              <span className="text-[#e9e9e9] text-lg font-bold">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Message icon */}
        <MessageCircle className="w-4 h-4 text-[#c9a96e]/50 mb-3" strokeWidth={1.5} />

        {/* Message */}
        <p className="text-[13px] sm:text-sm text-[#e9e9e9]/70 leading-relaxed italic font-light mb-4 line-clamp-4">
          &ldquo;{item.message}&rdquo;
        </p>

        {/* Divider */}
        <div className="w-8 h-[1px] bg-[#c9a96e]/30 mb-3" />

        {/* Author */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-[#e9e9e9]/90 tracking-wide">
            {item.name}
          </p>
          <p className="text-[10px] sm:text-xs text-[#c9a96e]/60 tracking-[0.15em] uppercase mt-1">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function ScrollingRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: ScrollingTestimonial[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];
  const duration = items.length * speed;

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#3e4e3b]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#3e4e3b]/90 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-5 sm:gap-6 py-2"
        animate={{
          x: direction === "left"
            ? ["0%", `-${100 / 2}%`]
            : [`-${100 / 2}%`, "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
      >
        {duplicated.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollingTestimonials({
  parentTestimonials,
  alumniTestimonials,
  className,
}: ScrollingTestimonialsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  return (
    <div ref={ref} className={cn("w-full space-y-12 sm:space-y-16", className)}>
      {/* Parents Section */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/30" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a96e]/60">
            Parent Voices
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/30" />
        </div>
        <ScrollingRow items={parentTestimonials} direction="left" speed={28} />
      </div>

      {/* Alumni Section */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/30" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a96e]/60">
            Alumni Stories
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/30" />
        </div>
        <ScrollingRow items={alumniTestimonials} direction="right" speed={32} />
      </div>
    </div>
  );
}

export default ScrollingTestimonials;
