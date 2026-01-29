"use client";

import Header from "@/components/Header";

export default function Admissions() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b] pt-20">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Admissions
          </h1>

          {/* Admission Process */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Admission Process
            </h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "Inquiry", desc: "Contact our admission office or fill the online inquiry form" },
                { step: "2", title: "Application", desc: "Submit completed application form with required documents" },
                { step: "3", title: "Interaction", desc: "Student and parent interaction with the admission team" },
                { step: "4", title: "Assessment", desc: "Age-appropriate assessment for the child" },
                { step: "5", title: "Admission", desc: "Admission confirmation and fee payment" },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Required Documents
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <ul className="text-white/80 text-lg space-y-3">
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Birth Certificate (Original & Photocopy)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Transfer Certificate (for students joining after Grade 1)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Previous Academic Records
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Aadhar Card (Student & Parents)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Passport Size Photographs (4 copies)
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  Address Proof
                </li>
              </ul>
            </div>
          </div>

          {/* Important Dates */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Important Dates
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-3">Admission Open</h3>
                <p className="text-white/70 text-lg">November - January</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-3">Academic Session Begins</h3>
                <p className="text-white/70 text-lg">April</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Ready to Join Our Family?
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Contact our admission office for more information
            </p>
            <button className="bg-white text-[#3e4e3b] px-8 py-3.5 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
