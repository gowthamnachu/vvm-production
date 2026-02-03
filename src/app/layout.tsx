import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Vagdevi Vidya Mandir | Excellence in Education Since 2002",
  description: "Vagdevi Vidya Mandir - A premier CBSE school nurturing holistic development through quality education, cultural values, and a green campus environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${epilogue.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
