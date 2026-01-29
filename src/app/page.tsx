"use client";

import RevealLoader from "@/components/ui/reveal-loader";

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
      <main className="min-h-screen w-full flex items-center justify-center bg-[#3e4e3b]">
        {/* Your main content goes here */}
      </main>
    </>
  );
}
