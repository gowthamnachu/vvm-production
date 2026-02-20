import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vagdevi Vidya Mandir — Best School in Visakhapatnam",
    short_name: "VVM School",
    description:
      "AP Govt recognized school in Visakhapatnam with skating, karate, boxing, dance, sports & green campus. 25+ years of excellence. Admissions open!",
    start_url: "/",
    display: "standalone",
    background_color: "#e9e9e9",
    theme_color: "#3e4e3b",
    orientation: "portrait-primary",
    categories: ["education"],
    lang: "en-IN",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/vvvm_logo.jpg",
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
