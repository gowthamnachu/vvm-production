import type { Metadata } from "next";
import UpdatesClient from "./UpdatesClient";

export const metadata: Metadata = {
    title: "School Updates",
    description: "Stay informed about the latest events, announcements, and activities at Vagdevi Vidya Mandir.",
    alternates: {
        canonical: "/updates",
    },
};

export default function UpdatesPage() {
    return <UpdatesClient />;
}
