import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Visit Vagdevi Vidya Mandir's website for admissions, facilities, gallery, and more.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#e9e9e9] text-[#2d3a2e] px-6">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <img
          src="/vvvm_logo.jpg"
          alt="Vagdevi Vidya Mandir Logo"
          className="w-24 h-24 mx-auto mb-8 rounded-full shadow-lg"
        />

        {/* 404 */}
        <h1 className="text-7xl sm:text-8xl font-bold text-[#3e4e3b] mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Page Not Found
        </h2>
        <p className="text-[#3e4e3b]/60 mb-8 text-sm sm:text-base leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Explore our school website to learn about admissions, facilities, and
          more.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#3e4e3b] text-[#e9e9e9] rounded-full text-sm font-medium hover:bg-[#2d3a2e] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/admissions"
            className="px-5 py-2.5 border border-[#3e4e3b]/20 rounded-full text-sm font-medium hover:bg-[#3e4e3b]/5 transition-colors"
          >
            Admissions
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 border border-[#3e4e3b]/20 rounded-full text-sm font-medium hover:bg-[#3e4e3b]/5 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Contact Info */}
        <p className="text-xs text-[#3e4e3b]/40">
          Need help? Call{" "}
          <a
            href="tel:+917680097953"
            className="underline hover:text-[#3e4e3b]/70"
          >
            +91-7680097953
          </a>
        </p>
      </div>
    </main>
  );
}
