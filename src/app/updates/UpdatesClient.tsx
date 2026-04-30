"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Image from "next/image";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { ParallaxBackground } from "@/components/ui/parallax-background";

export default function UpdatesClient() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
            <ScrollToTop />
            <Header activeSection="updates" />

            {/* Main Content Area */}
            <main className="w-full bg-white pt-24 sm:pt-32 pb-0 relative overflow-hidden flex flex-col">
                <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[70vh] xl:min-h-[80vh]">
                    
                    {/* Left Text Content */}
                    <div className="w-full lg:w-[45%] xl:w-1/2 px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-16 py-16 lg:py-24 flex flex-col justify-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold text-[#3e4e3b] leading-[1.15] mb-6 tracking-tight"
                        >
                            Celebrating Academic Excellence. <br /> Achieving 100% Results.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[#3e4e3b]/70 text-lg leading-relaxed mb-8 max-w-xl font-light"
                        >
                            Vagdevi Vidya Mandir is proud to announce an unprecedented achievement in the AP 10th class results 2026. Our commitment to holistic education has culminated in record-breaking scores, numerous state toppers, and exceptional academic standards.
                        </motion.p>


                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <a 
                                href="/vvm-results-compressed.jpg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 bg-[#3e4e3b] text-white text-sm font-semibold rounded-sm hover:bg-[#4a5d47] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200 inline-block"
                            >
                                View Poster
                            </a>
                            <a 
                                href="/contact"
                                className="px-8 py-3.5 bg-transparent border border-[#3e4e3b]/20 text-[#3e4e3b] text-sm font-semibold rounded-sm hover:bg-[#3e4e3b]/5 hover:border-[#3e4e3b]/40 transition-colors duration-200 inline-block"
                            >
                                Contact Us
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Image Content - Premium School Poster Style */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:pr-16 xl:pr-24 py-8 lg:py-24"
                    >
                        <div className="w-full relative aspect-[4/5] rounded-sm overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(62,78,59,0.15)] border border-slate-100 group">
                            <Image 
                                src="/vvm-results-compressed.jpg" 
                                alt="Vagdevi Vidya Mandir 10th Class Results 2026 Poster" 
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3e4e3b]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </motion.div>

                </div>
            </main>

            {/* Footer Section from main page */}
            <footer className="w-full relative overflow-hidden" role="contentinfo" aria-label="Vagdevi Vidya Mandir — Campus Address, Quick Links & Contact Information">
                <ParallaxBackground
                    image="/footerimage.JPG"
                    imageAlt="Footer background"
                    speed={0.15}
                    className="z-0"
                />
                <div className="absolute inset-0 bg-[#3e4e3b]/85" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14">

                    {/* Top: Brand centered */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <motion.div
                                className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-1 ring-[#e9e9e9]/10"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <img src="/vvvm_logo.jpg" alt="Vagdevi Vidya Mandir Logo" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#e9e9e9] tracking-tight mb-1">Vagdevi Vidya Mandir</h3>
                        <p className="text-xs sm:text-sm text-[#e9e9e9]/35 italic">A Place Where Knowledge Meets Excellence!</p>
                    </motion.div>

                    {/* Middle: 3 columns — Address | Links | Contact */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Address */}
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Campus</h4>
                            <p className="text-sm text-[#e9e9e9]/40 leading-relaxed">
                                Gambheeram village, Boyapalem post,<br />
                                Anandapuram mandal, Visakhapatnam<br />
                                531 163
                            </p>
                        </div>
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Quick Links</h4>
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                                {["Home", "About", "Admissions", "Gallery", "Contact"].map((link, i) => (
                                    <a key={i} href={`/${link.toLowerCase()}`} className="text-sm text-[#e9e9e9]/40 hover:text-[#e9e9e9] transition-colors text-underline-animated">
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Contact */}
                        <div>
                            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#e9e9e9]/50 mb-2">Reach Us</h4>
                            <div className="space-y-1 text-sm text-[#e9e9e9]/40">
                                <p><a href="tel:+917680097953" className="hover:text-[#e9e9e9] transition-colors">+91 76800 97953</a></p>
                                <p><a href="tel:+919490670461" className="hover:text-[#e9e9e9] transition-colors">+91 94906 70461</a></p>
                                <p><a href="mailto:info@vagdevidyamandir.com" className="hover:text-[#e9e9e9] transition-colors">info@vagdevidyamandir.com</a></p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        className="flex justify-center gap-2.5 mb-8"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {[
                            { label: "Instagram", href: "https://www.instagram.com/vagdevidya_mandir", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                            { label: "YouTube", href: "https://www.youtube.com/@vagdevividyamandir4209", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#e9e9e9]/[0.06] hover:bg-[#e9e9e9]/15 rounded-full flex items-center justify-center transition-all duration-300 border border-[#e9e9e9]/[0.06] hover:border-[#e9e9e9]/15 hover:scale-110" aria-label={social.label}>
                                <svg className="w-3.5 h-3.5 text-[#e9e9e9]/40 hover:text-[#e9e9e9]" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                            </a>
                        ))}
                    </motion.div>

                    {/* Bottom bar */}
                    <motion.div
                        className="pt-5 border-t border-[#e9e9e9]/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="text-xs text-[#e9e9e9]/25">© {new Date().getFullYear()} Vagdevi Vidya Mandir. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-[#e9e9e9]/25">
                            <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.1em]">DESIGNED & CRAFTED BY ORVYN TECHNOLOGIES</p>
                            <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
                                <Image
                                    src="/orvyniconlogo.svg"
                                    alt="Orvyn Technologies Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
