import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "A jelentkezés lezárult",
    description: "A jelentkezési időszak lezárult. Köszönjük az érdeklődést!",
    alternates: {
        canonical: "/jelentkezes",
    },
};

export default function JelentkezesPage() {
    return (
        <main className="w-full bg-white pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="max-w-xl text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="font-poppins-extrab text-3xl md:text-5xl text-black leading-tight">
                    A jelentkezés <span className="bg-[#CEFF06] px-3 py-1 rounded-xl">lezárult</span>
                </h1>
                <p className="font-poppins-med text-gray-600 text-base md:text-lg leading-relaxed">
                    Köszönjük az érdeklődést! A jelentkezési időszak véget ért. Kövess minket a közösségi médiában, hogy értesülj a következő lehetőségekről!
                </p>
                <a
                    href="/"
                    className="mt-4 bg-black text-white font-poppins-bold text-sm md:text-base px-8 py-4 rounded-full hover:scale-105 transition-transform"
                >
                    Vissza a főoldalra
                </a>
            </div>
        </main>
    );
}