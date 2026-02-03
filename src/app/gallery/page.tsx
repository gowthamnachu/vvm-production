"use client";

import Header from "@/components/Header";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <p className="text-white">Loading gallery...</p>
    </div>
  ),
});

export default function Gallery() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b] pt-20">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Gallery
          </h1>

          {/* Circular Gallery */}
          <div className="w-full mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8 text-center">
              Featured Gallery
            </h2>
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery
                bend={6}
                borderRadius={0.03}
                scrollSpeed={2}
                scrollEase={0.05}
                textColor="#ffffff"
              />
            </div>
          </div>

          {/* Gallery Categories */}
          <div className="space-y-16">
            {/* Campus Life */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
                Campus Life
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-white/50 text-sm">Image {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
                Events & Celebrations
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-white/50 text-sm">Event {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sports */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
                Sports & Activities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-white/50 text-sm">Sport {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-white/50 text-sm">Achievement {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
            <p className="text-white/70 text-lg">
              Gallery images can be added here. This is a placeholder layout.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
