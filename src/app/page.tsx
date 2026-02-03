"use client";

import { useState, useEffect } from "react";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import Image from "next/image";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white">Loading gallery...</p>
    </div>
  ),
});

const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white">Loading gallery...</p>
    </div>
  ),
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "alumni", "admissions", "gallery", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <Header activeSection={activeSection} />
      
      {/* Hero Section - Half Layout */}
      <section
        id="home"
        className="relative min-h-screen w-full bg-[#3e4e3b]"
        style={{
          backgroundImage: "url('/ChatGPT%20Image%20Feb%203%2C%202026%2C%2008_01_55%20PM.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Transparent green overlay ("transparenvy") */}
        <div className="absolute inset-0 bg-[#3e4e3b]/40 pointer-events-none z-10" />

        <div className="flex flex-col md:flex-row min-h-screen z-30">
          
          {/* Left Side - Text Content */}
          <div className="w-full flex flex-col justify-center items-center px-8 md:px-16 lg:px-20 py-24 md:py-0">
            {/* Tagline */}
            <span className="text-white/60 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium">
              Since 2002
            </span>
            
            <p className="text-white/75 text-base md:text-lg lg:text-xl max-w-lg text-center mb-10 leading-relaxed font-light">
              Enroll your child in a school that blends quality education, cultural values, and a green learning environment.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#3e4e3b] px-8 py-3.5 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Apply for Admission
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <p className="text-white text-3xl md:text-4xl font-bold">25+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Years Legacy</p>
              </div>
              <div className="text-center">
                <p className="text-white text-3xl md:text-4xl font-bold">5000+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Alumni</p>
              </div>
              <div className="text-center">
                <p className="text-white text-3xl md:text-4xl font-bold">98%</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full bg-[#e9e9e9] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-[#3e4e3b] text-4xl md:text-5xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-[#3e4e3b] text-xl md:text-2xl font-semibold text-center mb-12">
            A Legacy of 25 Years in Education
          </p>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 md:p-12 rounded-lg">
              <p className="text-[#3e4e3b]/90 text-base md:text-lg leading-relaxed mb-6">
                Twenty-Five years ago, Vagdevi Vidya Mandir was founded with a vision to create a school that goes beyond just academics. Observing many schools with only buildings and no playgrounds, where students suffered from stress due to a lack of outdoor activities, we set out to build something different—a school that nurtures both the mind and body.
              </p>
              <p className="text-[#3e4e3b]/90 text-base md:text-lg leading-relaxed mb-6">
                At Vagdevi Vidya Mandir, we believe that education is not just about books but also about a child's mental and physical well-being. Our lush green campus and expansive playground provide the perfect environment for students to learn, grow, and play freely. We give equal importance to physical activities, ensuring that every child develops holistically with a balance of academics, sports, and extracurricular activities.
              </p>
              <p className="text-[#3e4e3b]/90 text-base md:text-lg leading-relaxed mb-6">
                Today, after 25 years, our school stands as a proud institution shaping young minds with knowledge, values, and discipline. We continue to uphold our mission of creating a joyful learning experience, fostering creativity, and encouraging overall development.
              </p>
              <p className="text-[#3e4e3b] text-lg md:text-xl font-semibold text-center mt-8">
                Vagdevi Vidya Mandir – Where Learning Meets Growth!
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-[#3e4e3b] text-2xl md:text-3xl font-semibold mb-4">Our Vision</h3>
              <p className="text-[#3e4e3b]/80 text-base md:text-lg leading-relaxed">
                To create an educational institution that nurtures holistic development, combining academic excellence with cultural values, environmental consciousness, and physical well-being. We envision a school where every child thrives in a joyful, balanced learning environment.
              </p>
            </div>
            
            <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-[#3e4e3b] text-2xl md:text-3xl font-semibold mb-4">Our Mission</h3>
              <ul className="text-[#3e4e3b]/80 text-base md:text-lg space-y-2">
                <li>• Develop critical thinking and creativity</li>
                <li>• Balance academics with physical activities</li>
                <li>• Instill strong moral and ethical values</li>
                <li>• Promote environmental awareness</li>
                <li>• Foster mental and physical well-being</li>
                <li>• Prepare students for global citizenship</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Excellence", desc: "Striving for the highest standards" },
              { title: "Integrity", desc: "Upholding honesty and moral principles" },
              { title: "Innovation", desc: "Encouraging creative thinking" },
              { title: "Compassion", desc: "Fostering empathy and respect" },
            ].map((value, index) => (
              <div key={index} className="bg-[#3e4e3b]/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-[#3e4e3b] text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-[#3e4e3b]/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section id="alumni" className="min-h-screen w-full bg-[#3e4e3b] py-20 flex items-center">
        <div className="w-full">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Alumni
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                Celebrating 25 years of excellence and the remarkable journey of over 5000+ alumni
              </p>
            </div>
          </div>

          {/* Dome Gallery */}
          <div className="w-full px-4 md:px-8" style={{ height: '85vh', minHeight: '600px', maxHeight: '900px' }}>
            <DomeGallery
              fit={1.0}
              minRadius={700}
              maxVerticalRotationDeg={20}
              segments={34}
              dragDampening={0}
              grayscale
            />
          </div>

          <div className="container mx-auto px-8">
            {/* Alumni Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <p className="text-white text-3xl md:text-4xl font-bold mb-2">5000+</p>
                <p className="text-white/70 text-xs md:text-sm uppercase tracking-wider">Alumni</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <p className="text-white text-3xl md:text-4xl font-bold mb-2">98%</p>
                <p className="text-white/70 text-xs md:text-sm uppercase tracking-wider">Success Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <p className="text-white text-3xl md:text-4xl font-bold mb-2">25+</p>
                <p className="text-white/70 text-xs md:text-sm uppercase tracking-wider">Years Legacy</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <p className="text-white text-3xl md:text-4xl font-bold mb-2">50+</p>
                <p className="text-white/70 text-xs md:text-sm uppercase tracking-wider">Countries</p>
              </div>
            </div>

            {/* Alumni Message */}
            <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-lg mt-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto">
                Our alumni have achieved remarkable success in medicine, engineering, business, arts, and public service. They carry forward the values and education imparted at Vagdevi Vidya Mandir, making a positive impact in their communities worldwide.
              </p>
            </div>

            <div className="text-center mt-8">
              <p className="text-white/60 text-sm mb-4">Drag or swipe to explore our alumni gallery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="min-h-screen w-full bg-[#e9e9e9] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-[#3e4e3b] text-4xl md:text-5xl font-bold mb-12 text-center">Admissions</h2>

          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {[
              { step: "1", title: "Inquiry", desc: "Contact our admission office or fill the online form" },
              { step: "2", title: "Application", desc: "Submit completed application with required documents" },
              { step: "3", title: "Interaction", desc: "Student and parent interaction with admission team" },
              { step: "4", title: "Assessment", desc: "Age-appropriate assessment for the child" },
              { step: "5", title: "Admission", desc: "Admission confirmation and fee payment" },
            ].map((item, index) => (
              <div key={index} className="bg-[#3e4e3b]/10 backdrop-blur-sm p-6 rounded-lg flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#3e4e3b]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#3e4e3b] text-xl font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-[#3e4e3b] text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#3e4e3b]/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 rounded-lg text-center max-w-2xl mx-auto">
            <h3 className="text-[#3e4e3b] text-2xl md:text-3xl font-semibold mb-4">Ready to Join?</h3>
            <p className="text-[#3e4e3b]/80 text-lg mb-6">Contact our admission office for more information</p>
            <button className="bg-[#3e4e3b] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#3e4e3b]/90 transition-all duration-300 shadow-lg">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full bg-[#3e4e3b] py-16 md:py-20 flex items-center">
        <div className="w-full">
          <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-center px-4">Gallery</h2>
          <p className="text-white/70 text-center text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto px-6">
            Explore moments from our vibrant campus life
          </p>

          {/* Circular Gallery */}
          <div className="w-full overflow-hidden -mb-4 md:mb-0">
            <div className="hidden lg:block" style={{ height: '600px', position: 'relative' }}>
              <CircularGallery
                bend={6}
                borderRadius={0.03}
                scrollSpeed={2}
                scrollEase={0.05}
                textColor="#ffffff"
              />
            </div>
            <div className="hidden md:block lg:hidden" style={{ height: '500px', position: 'relative' }}>
              <CircularGallery
                bend={4}
                borderRadius={0.04}
                scrollSpeed={1.5}
                scrollEase={0.08}
                textColor="#ffffff"
              />
            </div>
            <div className="block md:hidden" style={{ height: '380px', position: 'relative' }}>
              <CircularGallery
                bend={2}
                borderRadius={0.06}
                scrollSpeed={0.8}
                scrollEase={0.12}
                textColor="#ffffff"
              />
            </div>
          </div>

          <div className="text-center mt-0 lg:mt-6 px-4">
            <p className="text-white/50 text-xs md:text-sm tracking-wide">
              <span className="inline md:hidden">← Swipe to explore →</span>
              <span className="hidden md:inline">Drag or scroll to explore more</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full bg-[#e9e9e9] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-[#3e4e3b] text-4xl md:text-5xl font-bold mb-12 text-center">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-[#3e4e3b] text-2xl font-semibold mb-6">Get in Touch</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-[#3e4e3b]/10 backdrop-blur-sm border border-[#3e4e3b]/20 rounded-lg px-4 py-3 text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:border-[#3e4e3b]/50" />
                <input type="email" placeholder="Email" className="w-full bg-[#3e4e3b]/10 backdrop-blur-sm border border-[#3e4e3b]/20 rounded-lg px-4 py-3 text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:border-[#3e4e3b]/50" />
                <input type="tel" placeholder="Phone" className="w-full bg-[#3e4e3b]/10 backdrop-blur-sm border border-[#3e4e3b]/20 rounded-lg px-4 py-3 text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:border-[#3e4e3b]/50" />
                <textarea rows={4} placeholder="Message" className="w-full bg-[#3e4e3b]/10 backdrop-blur-sm border border-[#3e4e3b]/20 rounded-lg px-4 py-3 text-[#3e4e3b] placeholder-[#3e4e3b]/40 focus:outline-none focus:border-[#3e4e3b]/50 resize-none" />
                <button type="submit" className="bg-[#3e4e3b] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3e4e3b]/90 transition-all duration-300 shadow-lg">
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-[#3e4e3b] text-xl font-semibold mb-3">Address</h4>
                <p className="text-[#3e4e3b]/80">Vagdevi Vidya Mandir<br />School Address<br />City, State - PIN</p>
              </div>
              <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-[#3e4e3b] text-xl font-semibold mb-3">Phone</h4>
                <p className="text-[#3e4e3b]/80">+91 XXXXX XXXXX</p>
              </div>
              <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-[#3e4e3b] text-xl font-semibold mb-3">Email</h4>
                <p className="text-[#3e4e3b]/80">info@vagdevividyamandir.edu</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
