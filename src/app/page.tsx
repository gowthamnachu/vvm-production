"use client";

import { useState, useEffect } from "react";
import RevealLoader from "@/components/ui/reveal-loader";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "academics", "admissions", "gallery", "contact"];
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
          backgroundImage: "url('/hello%20(5).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Transparent green overlay ("transparenvy") */}
        <div className="absolute inset-0 bg-[#3e4e3b]/40 pointer-events-none z-10" />

        <div className="flex flex-col md:flex-row min-h-screen z-30">
          
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-8 md:px-16 lg:px-20 py-24 md:py-0">
            {/* Tagline */}
            <span className="text-white/60 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium">
              Since 2002
            </span>
            
            <p className="text-white/75 text-base md:text-lg lg:text-xl max-w-lg text-center md:text-left mb-10 leading-relaxed font-light">
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
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">25+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Years Legacy</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">5000+</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Alumni</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-white text-3xl md:text-4xl font-bold">98%</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side - Saraswati Image (top layer) */}
          <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-screen flex items-end justify-center overflow-visible">
            <div className="relative w-full h-full flex items-end justify-center p-8 pb-0 z-30 pointer-events-none">
              <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[580px] lg:w-[520px] lg:h-[680px] z-30">
                <Image
                  src="/god_image.png"
                  alt="Goddess Saraswati - Divine Symbol of Knowledge"
                  fill
                  className="object-contain object-bottom z-30"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full bg-[#e9e9e9] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-[#3e4e3b] text-4xl md:text-5xl font-bold mb-12 text-center">About Us</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-[#3e4e3b] text-2xl md:text-3xl font-semibold mb-4">Our Vision</h3>
              <p className="text-[#3e4e3b]/80 text-lg leading-relaxed mb-4">
                To create an educational institution that nurtures holistic development, combining academic excellence with cultural values and environmental consciousness.
              </p>
              <p className="text-[#3e4e3b]/80 text-lg leading-relaxed">
                Since 2002, we have been committed to shaping future leaders who are academically proficient, culturally rooted, and socially responsible.
              </p>
            </div>
            
            <div className="bg-[#3e4e3b]/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-[#3e4e3b] text-2xl md:text-3xl font-semibold mb-4">Our Mission</h3>
              <ul className="text-[#3e4e3b]/80 text-lg space-y-2">
                <li>• Develop critical thinking and creativity</li>
                <li>• Instill strong moral and ethical values</li>
                <li>• Promote environmental awareness</li>
                <li>• Encourage community service</li>
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

      {/* Academics Section */}
      <section id="academics" className="min-h-screen w-full bg-[#3e4e3b] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-12 text-center">Academics</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { level: "Primary School", grades: "Grades 1-5", desc: "Foundation years focusing on basic literacy and holistic development" },
              { level: "Middle School", grades: "Grades 6-8", desc: "Building critical thinking with comprehensive curriculum" },
              { level: "High School", grades: "Grades 9-12", desc: "Advanced learning preparing for higher education" },
            ].map((program, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-white text-2xl font-bold mb-2">{program.level}</h3>
                <p className="text-white/60 text-lg mb-4">{program.grades}</p>
                <p className="text-white/80">{program.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-white text-xl font-semibold mb-4">Sports & Activities</h3>
              <p className="text-white/70">Cricket, Football, Basketball, Athletics, Yoga</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-white text-xl font-semibold mb-4">Cultural Programs</h3>
              <p className="text-white/70">Dance, Music, Drama, Art & Craft</p>
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
      <section id="gallery" className="min-h-screen w-full bg-[#3e4e3b] py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-12 text-center">Gallery</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-white text-2xl font-semibold mb-6">Campus Life</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg aspect-square flex items-center justify-center">
                    <p className="text-white/50 text-sm">Image {item}</p>
                  </div>
                ))}
              </div>
            </div>
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
