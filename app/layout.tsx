import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
	title: {
		default: "Debhair - Professzionális Hajbeültetés Debrecenben | FUE Módszer",
		template: "%s | Debhair"
	},
	description: "Prémium hajbeültetés Debrecenben. Több mint 5000 elégedett ügyfél, természetes eredmények FUE módszerrel. Ingyenes konzultáció, örök-élet garancia.",
	keywords: ["hajbeültetés", "hajbeültetés debrecen", "FUE módszer", "hajátültetés", "kopaszodás kezelése", "hajhullás", "debhair"],
	authors: [{ name: "Debhair" }],
	creator: "Debhair",
	publisher: "Debhair",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "hu_HU",
		url: "https://debhair.hu",
		siteName: "Debhair",
		title: "Debhair - Professzionális Hajbeültetés Debrecenben",
		description: "Prémium hajbeültetés Debrecenben. Több mint 5000 elégedett ügyfél, természetes eredmények FUE módszerrel.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Debhair - Professzionális Hajbeültetés Debrecenben",
		description: "Prémium hajbeültetés Debrecenben. Több mint 5000 elégedett ügyfél, természetes eredmények FUE módszerrel.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="hu" className={cn("bg-background text-black", "font-sans", geist.variable)}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#0B937C" />
			</head>
			<body className="font-rem antialiased">
				<Toaster position="top-center" richColors />
				<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-[100]">
					Ugrás a tartalomhoz
				</a>
				<Navbar />
				<main id="main-content" role="main">
					{children}
				</main>
				<SpeedInsights />
			</body>
		</html>
	);
}