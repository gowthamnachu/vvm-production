"use client";

import Header from "@/components/Header";

export default function Academics() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-[#3e4e3b] pt-20">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Academics
          </h1>

          {/* Programs Section */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Our Programs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  level: "Primary School", 
                  grades: "Grades 1-5",
                  desc: "Foundation years focusing on basic literacy, numeracy, and holistic development through play-based learning."
                },
                { 
                  level: "Middle School", 
                  grades: "Grades 6-8",
                  desc: "Building critical thinking skills with comprehensive curriculum covering sciences, mathematics, languages, and arts."
                },
                { 
                  level: "High School", 
                  grades: "Grades 9-12",
                  desc: "Advanced learning with multiple streams including Science, Commerce, and Arts preparing for higher education."
                },
              ].map((program, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                  <h3 className="text-white text-2xl font-bold mb-2">{program.level}</h3>
                  <p className="text-white/60 text-lg mb-4">{program.grades}</p>
                  <p className="text-white/80 leading-relaxed">{program.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Key Subjects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Mathematics",
                "Science (Physics, Chemistry, Biology)",
                "English Language & Literature",
                "Hindi & Regional Languages",
                "Social Studies",
                "Computer Science",
                "Physical Education",
                "Arts & Music",
                "Environmental Studies"
              ].map((subject, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <p className="text-white text-lg">{subject}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Co-curricular Activities */}
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
              Co-Curricular Activities
            </h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              We believe in overall development of students through diverse activities:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4">Sports</h3>
                <p className="text-white/70">
                  Cricket, Football, Basketball, Athletics, Yoga, and more
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4">Cultural Activities</h3>
                <p className="text-white/70">
                  Dance, Music, Drama, Art & Craft, and Annual Cultural Events
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4">Clubs & Societies</h3>
                <p className="text-white/70">
                  Science Club, Literary Club, Eco Club, Debate Society
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4">Leadership Programs</h3>
                <p className="text-white/70">
                  Student Council, Prefect System, Community Service Projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
