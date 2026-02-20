import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SchoolStructuredData } from "@/components/StructuredData";
import "./globals.css";

const BASE_URL = "https://vagdevividyamandir.com";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const epilogue = localFont({
  src: [
    {
      path: "../fonts/Epilogue-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Epilogue-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-epilogue",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3e4e3b",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Vagdevi Vidya Mandir | Best School in Visakhapatnam with Skating, Karate, Dance & Sports | Since 2002",
    template: "%s | Vagdevi Vidya Mandir — Visakhapatnam",
  },

  description:
    "Vagdevi Vidya Mandir (VVM) — AP Govt recognized school in Anandapuram, Visakhapatnam offering holistic education with skating, karate, boxing, dance, sports, yoga, smart classrooms & green campus. 25+ years of excellence, 5000+ alumni. Admissions open for Pre-Primary to Class 10.",

  keywords: [
    // Brand
    "Vagdevi Vidya Mandir",
    "VVM",
    "VVM School",
    "Vagdevi School",
    // Location
    "school in Visakhapatnam",
    "school in Vizag",
    "school in Anandapuram",
    "school in Gambheeram",
    "school near Boyapalem",
    "best school Visakhapatnam",
    "top school Vizag",
    "schools near Anandapuram Vizag",
    "Visakhapatnam schools",
    // Facilities (what users search for)
    "school with skating",
    "school with skating in Visakhapatnam",
    "skating school Vizag",
    "school with karate",
    "school with karate training Visakhapatnam",
    "school with boxing training",
    "school with dance classes",
    "school with sports ground Vizag",
    "school with yoga",
    "school with green campus",
    "school with playground Visakhapatnam",
    "school with smart classrooms",
    "school with science lab Vizag",
    // Education
    "SSC school Visakhapatnam",
    "AP government recognized school",
    "CBSE alternative Vizag",
    "English medium school Visakhapatnam",
    "pre-primary school Vizag",
    "primary school Anandapuram",
    "high school Visakhapatnam",
    "best education Vizag",
    "holistic education school",
    // Admissions
    "school admissions Visakhapatnam 2026",
    "school admissions open Vizag",
    "admission in school near me",
    // Activities
    "extracurricular activities school Vizag",
    "sports school Visakhapatnam",
    "martial arts school Vizag",
    "dance school for kids Visakhapatnam",
  ],

  authors: [{ name: "Vagdevi Vidya Mandir" }],
  creator: "Vagdevi Vidya Mandir",
  publisher: "Vagdevi Vidya Mandir",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Vagdevi Vidya Mandir",
    title: "Vagdevi Vidya Mandir | Best School in Visakhapatnam — Skating, Karate, Dance & Sports",
    description:
      "AP Govt recognized school in Visakhapatnam with 25+ years of excellence. World-class facilities: skating, karate, boxing, dance, sports, yoga, smart classrooms. Admissions open for Pre-Primary to Class 10.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vagdevi Vidya Mandir — A Place Where Knowledge Meets Excellence",
        type: "image/jpeg",
      },
      {
        url: "/vvvm_logo.jpg",
        width: 500,
        height: 500,
        alt: "Vagdevi Vidya Mandir Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vagdevi Vidya Mandir | Best School in Visakhapatnam",
    description:
      "AP Govt recognized school with skating, karate, boxing, dance, sports & green campus. 25+ years of excellence. Admissions open!",
    images: ["/og-image.jpg"],
    creator: "@vagdevividya",
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
      "te-IN": BASE_URL,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },

  category: "Education",

  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Visakhapatnam",
    "geo.position": "17.8167;83.2833",
    ICBM: "17.8167, 83.2833",
    "revisit-after": "7 days",
    "classification": "Education",
    "rating": "General",
    "distribution": "Global",
    "language": "English, Telugu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" dir="ltr">
      <head>
        <SchoolStructuredData />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} ${epilogue.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
