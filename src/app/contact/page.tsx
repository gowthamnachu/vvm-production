"use client";

import Header from "@/components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b] pt-20">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-white text-3xl font-semibold mb-6">
                Get in Touch
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="text-white/80 block mb-2">Name</label>
                  <input 
                    type="text"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-white/80 block mb-2">Email</label>
                  <input 
                    type="email"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="text-white/80 block mb-2">Phone</label>
                  <input 
                    type="tel"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="text-white/80 block mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-white text-[#3e4e3b] px-8 py-3.5 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-white text-3xl font-semibold mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-3">Address</h3>
                  <p className="text-white/80 leading-relaxed">
                    Vagdevi Vidya Mandir<br />
                    [School Address Line 1]<br />
                    [City, State - PIN Code]
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-3">Phone</h3>
                  <p className="text-white/80">
                    +91 XXXXX XXXXX<br />
                    +91 XXXXX XXXXX
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-3">Email</h3>
                  <p className="text-white/80">
                    info@vagdevividyamandir.edu<br />
                    admissions@vagdevividyamandir.edu
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-3">Working Hours</h3>
                  <p className="text-white/80">
                    Monday - Friday: 8:00 AM - 4:00 PM<br />
                    Saturday: 8:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-white text-3xl font-semibold mb-6">
              Location
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg h-96 flex items-center justify-center">
              <p className="text-white/50 text-lg">Map will be embedded here</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
