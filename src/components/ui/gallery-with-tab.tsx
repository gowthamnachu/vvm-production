"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const activeData = data.find((d) => d.value === activeTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {data.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={cn(
              "relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300",
              activeTab === value
                ? "bg-[#3e4e3b] text-[#e9e9e9] shadow-lg shadow-[#3e4e3b]/25"
                : "bg-white/80 text-[#3e4e3b] border border-[#3e4e3b]/15 hover:bg-[#3e4e3b]/10 hover:border-[#3e4e3b]/30"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        >
          {activeData?.images.map(({ imageLink, alt }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 break-inside-avoid"
            >
              <img
                className="w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                src={imageLink}
                alt={alt || `Gallery image ${index + 1}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default GalleryWithTab;
