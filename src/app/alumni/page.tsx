"use client";

import Header from "@/components/Header";
import dynamic from "next/dynamic";

const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white">Loading gallery...</p>
    </div>
  ),
});

export default function Alumni() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b]">
        <div className="container mx-auto px-8 py-24 md:py-32">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our Alumni
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Celebrating 25 years of excellence and the remarkable journey of over 5000+ alumni who have made us proud
            </p>
          </div>

          {/* Dome Gallery */}
          <div className="w-full" style={{ height: '80vh', minHeight: '500px' }}>
            <DomeGallery
              fit={0.8}
              minRadius={600}
              maxVerticalRotationDeg={0}
              segments={34}
              dragDampening={2}
              grayscale
            />
          </div>

          {/* Alumni Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <p className="text-white text-4xl font-bold mb-2">5000+</p>
              <p className="text-white/70 text-sm uppercase tracking-wider">Alumni</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <p className="text-white text-4xl font-bold mb-2">98%</p>
              <p className="text-white/70 text-sm uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <p className="text-white text-4xl font-bold mb-2">25+</p>
              <p className="text-white/70 text-sm uppercase tracking-wider">Years Legacy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <p className="text-white text-4xl font-bold mb-2">50+</p>
              <p className="text-white/70 text-sm uppercase tracking-wider">Countries</p>
            </div>
          </div>

          {/* Alumni Message */}
          <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-lg mt-12">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 text-center">
              Alumni Success Stories
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Our alumni have gone on to achieve remarkable success in various fields including medicine, engineering, business, arts, and public service. They carry forward the values and education imparted at Vagdevi Vidya Mandir, making a positive impact in their communities and beyond.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-white/70 text-sm mb-4">Drag to explore our alumni gallery</p>
            <button className="bg-white text-[#3e4e3b] px-8 py-3.5 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Join Alumni Network
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
