"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  /** Split mode: "words" splits by word, "chars" splits by character */
  splitBy?: "words" | "chars";
  /** Animation style */
  variant?: "slide-up" | "fade-up" | "blur-up";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  splitBy = "words",
  variant = "slide-up",
  as: Component = "h2",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px", amount: 0.3 });

  const elements = splitBy === "words" ? children.split(" ") : children.split("");

  const getVariants = () => {
    switch (variant) {
      case "blur-up":
        return {
          hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        };
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 },
        };
      case "slide-up":
      default:
        return {
          hidden: { opacity: 0, y: "100%" },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <Component ref={ref} className={className}>
      {elements.map((element, i) => (
        <span key={i} className={splitBy === "words" ? "inline-block overflow-hidden mr-[0.25em]" : "inline-block overflow-hidden"}>
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
              duration: 0.5,
              delay: delay + i * (splitBy === "words" ? 0.08 : 0.03),
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {element === " " ? "\u00A0" : element}
            {splitBy === "words" ? "" : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

export default TextReveal;
