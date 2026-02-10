"use client";

import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface MotionGalleryProps {
  images?: { src: string; alt: string }[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
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

export default function MotionGallery({ 
  images = defaultImages,
  bend = 3,
  scrollSpeed = 1,
  scrollEase = 0.05
}: MotionGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Current scroll position
  const scrollX = useMotionValue(0);
  const smoothScrollX = useSpring(scrollX, { 
    stiffness: 100 * (1 / scrollEase), 
    damping: 30,
    mass: 0.5
  });
  
  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartX = useRef(0);

  // Card dimensions
  const cardWidth = isMobile ? 280 : 350;
  const cardHeight = isMobile ? 350 : 450;
  const gap = isMobile ? 20 : 30;
  const totalWidth = images.length * (cardWidth + gap);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    scrollX.set(scrollX.get() + delta * scrollSpeed);
  }, [scrollX, scrollSpeed]);

  // Handle touch/mouse drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStartX.current = scrollX.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = (startX.current - e.clientX) * scrollSpeed * 1.5;
    scrollX.set(scrollStartX.current + delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Calculate position with wrapping
  const getWrappedPosition = (baseX: number, index: number) => {
    const itemOffset = index * (cardWidth + gap);
    let x = itemOffset - baseX;
    
    // Wrap around for infinite scroll
    const wrapWidth = totalWidth;
    x = ((x % wrapWidth) + wrapWidth) % wrapWidth;
    
    // Center the items
    if (x > wrapWidth / 2) {
      x -= wrapWidth;
    }
    
    return x;
  };

  // Calculate bend (curve) based on position from center
  const getBendOffset = (x: number) => {
    const centerOffset = x / (containerWidth / 2);
    const bendAmount = Math.pow(Math.abs(centerOffset), 2) * bend * 50;
    return bendAmount;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => (
          <GalleryCard
            key={index}
            image={image}
            index={index}
            scrollX={smoothScrollX}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gap={gap}
            totalWidth={totalWidth}
            containerWidth={containerWidth}
            bend={bend}
            getWrappedPosition={getWrappedPosition}
            getBendOffset={getBendOffset}
          />
        ))}
      </div>
      
      {/* Gradient Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#3e4e3b] via-[#3e4e3b]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#3e4e3b] via-[#3e4e3b]/70 to-transparent pointer-events-none z-10" />
    </div>
  );
}

interface GalleryCardProps {
  image: { src: string; alt: string };
  index: number;
  scrollX: any;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  totalWidth: number;
  containerWidth: number;
  bend: number;
  getWrappedPosition: (baseX: number, index: number) => number;
  getBendOffset: (x: number) => number;
}

function GalleryCard({
  image,
  index,
  scrollX,
  cardWidth,
  cardHeight,
  gap,
  totalWidth,
  containerWidth,
  bend,
  getWrappedPosition,
  getBendOffset,
}: GalleryCardProps) {
  // Transform scroll position to card position
  const x = useTransform(scrollX, (latest: number) => {
    return getWrappedPosition(latest, index);
  });

  // Bend offset (Y position based on distance from center)
  const y = useTransform(x, (latest: number) => {
    return getBendOffset(latest);
  });

  // Scale based on distance from center
  const scale = useTransform(x, (latest: number) => {
    if (containerWidth === 0) return 1;
    const distance = Math.abs(latest) / (containerWidth / 2);
    return Math.max(0.75, 1 - distance * 0.15);
  });

  // Opacity based on distance from center
  const opacity = useTransform(x, (latest: number) => {
    if (containerWidth === 0) return 1;
    const distance = Math.abs(latest) / (containerWidth / 2);
    return Math.max(0.4, 1 - distance * 0.4);
  });

  // Z-index based on distance from center
  const zIndex = useTransform(x, (latest: number) => {
    return Math.round(100 - Math.abs(latest) / 10);
  });

  // Slight rotation for 3D effect
  const rotateY = useTransform(x, (latest: number) => {
    if (containerWidth === 0) return 0;
    return (latest / containerWidth) * -15;
  });

  return (
    <motion.div
      className="absolute rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-2xl"
      style={{
        width: cardWidth,
        height: cardHeight,
        x,
        y,
        scale,
        opacity,
        zIndex,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ 
        scale: 1.05,
        y: -20,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <p className="text-white text-sm md:text-lg font-semibold drop-shadow-lg">
            {image.alt}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
