"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Image from "next/image";
import RevealLoader from "@/components/ui/reveal-loader";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { memo } from "react";

const updates = [
    {
        title: "Parent–Teacher Meeting (PTM)",
        description: "All parents are invited to attend the upcoming PTM to discuss their child’s academic progress and overall development.",
        image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2000&auto=format&fit=crop",
        date: "Upcoming Event",
        category: "Academic",
    },
    {
        title: "Student Project Presentations (Grades 6–9)",
        description: "Students of Grades 6 to 9 are actively engaged in innovative and practical project presentations showcasing their creativity and learning outcomes.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
        date: "Current Activity",
        category: "Innovation",
    },
    {
        title: "Graduation Day Celebration (UKG & Grade 5)",
        description: "We are delighted to celebrate the Graduation Day of our UKG and Grade 5 students, marking an important milestone in their academic journey.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop",
        date: "Celebration",
        category: "Milestone",
    },
];

const AnimatedSection = memo(function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
});

export default function UpdatesClient() {
    return (
        <>
            <RevealLoader
                text="SCHOOL UPDATES"
                bgColors={["#4a5d47", "#3e4e3b", "#5a6d57"]}
                textSize="clamp(32px, 8vw, 120px)"
                textColor="#e9e9e9"
            />
            <ScrollToTop />
            <Header activeSection="updates" />

            <main className="min-h-screen bg-[#f8fafc] overflow-hidden">
                {/* Hero Section */}
                <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
                    <ParallaxBackground speed={0.2} className="z-0">
                        <div className="absolute inset-0 bg-[#3e4e3b]" />
                        <div className="absolute inset-0 noise-overlay opacity-20" />
                    </ParallaxBackground>

                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.span
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 text-[10px] uppercase tracking-[0.3em] text-[#e9e9e9]/80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Stay Informed
                        </motion.span>
                        <motion.h1
                            className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#e9e9e9] mb-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            School Updates
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-amber-300/40 mx-auto rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        />
                    </div>
                </section>

                {/* Updates Grid */}
                <section className="py-20 lg:py-32 container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {updates.map((update, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 card-lift gradient-border-animated"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={update.image}
                                        alt={update.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3e4e3b] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                                            {update.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3e4e3b]" />
                                        <span className="text-[10px] font-semibold text-[#3e4e3b]/40 uppercase tracking-widest">
                                            {update.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#3e4e3b] mb-4 leading-tight group-hover:text-[#4a5d47] transition-colors">
                                        {update.title}
                                    </h3>

                                    <p className="text-sm text-[#3e4e3b]/60 leading-relaxed mb-6 flex-1">
                                        {update.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                        <span className="text-[11px] font-bold text-[#3e4e3b] uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <AnimatedSection className="pb-32 container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-[#3e4e3b] rounded-[2.5rem] p-12 sm:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-5xl font-bold text-[#e9e9e9] mb-6">
                                Have questions about these updates?
                            </h2>
                            <p className="text-lg text-[#e9e9e9]/60 mb-10 max-w-2xl mx-auto">
                                Reach out to us directly for more details about upcoming events, project presentations, or the graduation ceremony.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/contact"
                                    className="px-8 py-4 bg-[#e9e9e9] text-[#3e4e3b] font-bold rounded-full hover:shadow-[0_0_30px_rgba(233,233,233,0.3)] transition-all active:scale-95"
                                >
                                    Contact Office
                                </a>
                                <a
                                    href="tel:+917680097953"
                                    className="px-8 py-4 border border-[#e9e9e9]/20 text-[#e9e9e9] font-bold rounded-full hover:bg-white/5 transition-all active:scale-95"
                                >
                                    Call Support
                                </a>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </main>

            {/* Footer Section */}
            <footer className="w-full relative overflow-hidden bg-[#3e4e3b] text-[#e9e9e9] py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
                    <h3 className="text-xl font-bold mb-2">Vagdevi Vidya Mandir</h3>
                    <p className="text-sm text-[#e9e9e9]/40 mb-8 italic">A Place Where Knowledge Meets Excellence!</p>
                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[#e9e9e9]/25">© {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.</p>
                        <div className="flex gap-4">
                            {["Home", "About", "Admissions", "Contact"].map((link) => (
                                <a key={link} href={`/${link.toLowerCase()}`} className="text-xs text-[#e9e9e9]/40 hover:text-[#e9e9e9] transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
