"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
  distance = 40,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px", amount: 0.15 });

  const getOffset = () => {
    switch (direction) {
      case "up": return { x: 0, y: distance };
      case "down": return { x: 0, y: -distance };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: offset.x, y: offset.y }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

export default StaggerReveal;
