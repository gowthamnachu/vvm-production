"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface MotionGalleryProps {
  images?: { src: string; alt: string }[];
}

const defaultImages = [
  { src: "https://picsum.photos/seed/1/800/600", alt: "Campus View 1" },
  { src: "https://picsum.photos/seed/2/800/600", alt: "Campus View 2" },
  { src: "https://picsum.photos/seed/3/800/600", alt: "Campus View 3" },
  { src: "https://picsum.photos/seed/4/800/600", alt: "Campus View 4" },
  { src: "https://picsum.photos/seed/5/800/600", alt: "Campus View 5" },
  { src: "https://picsum.photos/seed/6/800/600", alt: "Campus View 6" },
  { src: "https://picsum.photos/seed/7/800/600", alt: "Campus View 7" },
  { src: "https://picsum.photos/seed/8/800/600", alt: "Campus View 8" },
];

export default function MotionGallery({ images = defaultImages }: MotionGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const radius = isMobile ? 350 : 550;
  const angleSpread = isMobile ? 70 : 90;
  const cardWidth = isMobile ? 200 : 280;
  const cardHeight = isMobile ? 260 : 360;
  const visibleCards = isMobile ? 5 : 7;

  const handleDrag = (e: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Get visible images centered around current index
  const getVisibleImages = () => {
    const result = [];
    const halfVisible = Math.floor(visibleCards / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const imageIndex = (currentIndex + i + images.length) % images.length;
      result.push({
        ...images[imageIndex],
        position: i,
        originalIndex: imageIndex,
      });
    }
    return result;
  };

  const visibleImages = getVisibleImages();

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDrag}
      >
        <div className="absolute bottom-6 md:bottom-10 left-1/2 flex items-end justify-center">
          {visibleImages.map((image, idx) => {
            const position = image.position;
            const angle = (position * (angleSpread / (visibleCards - 1))) * (Math.PI / 180);
            
            // Arc curves upward from the base
            const arcX = Math.sin(angle) * radius;
            const arcY = (1 - Math.cos(angle)) * radius * 0.3;
            
            // Scale: center is largest
            const scale = 1 - Math.abs(position) * 0.08;
            
            // Opacity: edges fade out
            const opacity = 1 - Math.abs(position) * 0.15;
            
            // Z-index: center on top
            const zIndex = visibleCards - Math.abs(position);
            
            return (
              <motion.div
                key={`${image.originalIndex}-${position}`}
                className="absolute rounded-lg md:rounded-xl overflow-hidden bg-white"
                initial={false}
                animate={{
                  x: arcX - cardWidth / 2,
                  y: -arcY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  bottom: 0,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={position === 0 ? { 
                  scale: 1.05, 
                  y: -arcY - 15,
                  transition: { type: "spring", stiffness: 400, damping: 18 }
                } : {}}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    draggable={false}
                    loading="lazy"
                    sizes={`${cardWidth}px`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                    <p className="text-white text-xs md:text-sm font-medium tracking-wide drop-shadow-lg">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      
      {/* Gradient Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#3e4e3b] via-[#3e4e3b]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#3e4e3b] via-[#3e4e3b]/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}
