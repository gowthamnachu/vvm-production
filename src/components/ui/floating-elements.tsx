"use client";

import { motion } from "framer-motion";

interface FloatingElementsProps {
  variant?: "light" | "dark";
  count?: number;
}

export function FloatingElements({ variant = "light", count = 6 }: FloatingElementsProps) {
  const isDark = variant === "dark";
  const baseColor = isDark ? "rgba(233,233,233," : "rgba(62,78,59,";

  const elements = Array.from({ length: count }, (_, i) => {
    const size = 4 + Math.random() * 12;
    const left = 5 + Math.random() * 90;
    const top = 5 + Math.random() * 90;
    const duration = 15 + Math.random() * 25;
    const delay = Math.random() * 10;
    const opacity = 0.04 + Math.random() * 0.08;

    return { id: i, size, left, top, duration, delay, opacity };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.left}%`,
            top: `${el.top}%`,
            background: `${baseColor}${el.opacity})`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Larger decorative shapes */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: `radial-gradient(circle, ${baseColor}0.03), transparent)`,
          left: "10%",
          top: "20%",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: `radial-gradient(circle, ${baseColor}0.04), transparent)`,
          right: "15%",
          bottom: "25%",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 18, delay: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default FloatingElements;
