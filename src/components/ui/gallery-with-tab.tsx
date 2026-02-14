"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryImage {
  imageLink: string;
  alt?: string;
}

interface GalleryTab {
  label: string;
  value: string;
  images: GalleryImage[];
}

interface GalleryWithTabProps {
  data: GalleryTab[];
  className?: string;
}

export function GalleryWithTab({ data, className }: GalleryWithTabProps) {
  const [activeTab, setActiveTab] = useState(data[0]?.value || "");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = data.find((d) => d.value === activeTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {data.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => setActiveTab(value)}
            className={cn(
              "relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300",
              activeTab === value
                ? "bg-[#3e4e3b] text-[#e9e9e9] shadow-lg shadow-[#3e4e3b]/25"
                : "bg-white/80 text-[#3e4e3b] border border-[#3e4e3b]/15 hover:bg-[#3e4e3b]/10 hover:border-[#3e4e3b]/30"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            suppressHydrationWarning
          >
            {label}
            {activeTab === value && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-[#3e4e3b] -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        >
          {activeData?.images.map(({ imageLink, alt }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.img
                className="w-full object-cover object-center"
                src={imageLink}
                alt={alt || `Gallery image ${index + 1}`}
                loading="lazy"
                animate={{
                  scale: hoveredIndex === index ? 1.08 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {/* Overlay with zoom icon */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#3e4e3b]/60 via-[#3e4e3b]/20 to-transparent flex items-end justify-start p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default GalleryWithTab;
