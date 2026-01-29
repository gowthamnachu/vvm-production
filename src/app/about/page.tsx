"use client";

import Header from "@/components/Header";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b] pt-20">
        {/* Hero Section */}
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            About Us
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
                Our Vision
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                To create an educational institution that nurtures holistic development, 
                combining academic excellence with cultural values and environmental consciousness.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                Since 2002, Vagdevi Vidya Mandir has been committed to shaping future leaders 
                who are not only academically proficient but also culturally rooted and socially responsible.
              </p>
            </div>
            
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
                Our Mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                To provide quality education that:
              </p>
              <ul className="text-white/80 text-lg space-y-2 list-disc list-inside">
                <li>Develops critical thinking and creativity</li>
                <li>Instills strong moral and ethical values</li>
                <li>Promotes environmental awareness</li>
                <li>Encourages community service</li>
                <li>Prepares students for global citizenship</li>
              </ul>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Excellence", desc: "Striving for the highest standards in all endeavors" },
                { title: "Integrity", desc: "Upholding honesty and strong moral principles" },
                { title: "Innovation", desc: "Encouraging creative thinking and problem-solving" },
                { title: "Compassion", desc: "Fostering empathy and respect for all" },
              ].map((value, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
