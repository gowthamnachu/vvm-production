import type { Metadata } from "next";
import UpdatesClient from "./UpdatesClient";

export const metadata: Metadata = {
    title: "Vagdevi Vidya Mandir 10th Class Results 2026 | AP 10th Class Result",
    description: "Check the outstanding Vagdevi Vidya Mandir 10th class results 2026. Celebrating our AP 10th class result 2026 with a 100% pass rate, 4 students scoring 570+ out of 600, and top marks of 100 in multiple subjects.",
    keywords: [
        "ap 10th class result 2026", 
        "vvm 10th class results", 
        "vagdevi vidya mandir 10th class results 2026", 
        "vagdevi vidya mandir results", 
        "ap board 10th results 2026", 
        "10th class results Visakhapatnam", 
        "top school in Visakhapatnam 10th results", 
        "100% pass rate ap 10th class",
        "vvm school updates"
    ],
    alternates: {
        canonical: "https://www.vagdevividyamandir.com/updates",
    },
    openGraph: {
        title: "Vagdevi Vidya Mandir 10th Class Results 2026",
        description: "Explore the historic AP 10th class result 2026 for Vagdevi Vidya Mandir. 4 students scored 570+ (out of 600) and multiple subjects reached perfect 100s. View our proud achievers!",
        url: "https://www.vagdevividyamandir.com/updates",
        siteName: "Vagdevi Vidya Mandir",
        images: [
            {
                url: "/vvm-results-compressed.jpg",
                width: 1080,
                height: 1350,
                alt: "Vagdevi Vidya Mandir 10th Class Results 2026 Poster",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vagdevi Vidya Mandir 10th Class Results 2026",
        description: "Check our AP 10th class result 2026: 4 students with 570+ (out of 600) and perfect 100s in 1st Lang, Maths & Social!",
        images: ["/vvm-results-compressed.jpg"],
    },
};

export default function UpdatesPage() {
    return <UpdatesClient />;
}
