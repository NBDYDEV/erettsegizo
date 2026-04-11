"use client";

import Image from "next/image";
import Link from "next/link";
import { getActiveSubjects } from "@/app/lib/pricing";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const [subjects, setSubjects] = useState<string[]>([]);

    const pathname = usePathname();
    const isJelentkezes = pathname === "/jelentkezes";

    useEffect(() => {
        setSubjects(getActiveSubjects());
    }, []);

    return (
        <footer className="w-full bg-[#050505] text-white py-12 sm:py-16 md:py-20 px-4 md:px-8 relative overflow-hidden snap-start">

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 border-b border-white/10 pb-10 md:pb-14 mb-10 md:mb-14">
                    <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Link href="/">
                            <Image
                                src="/svg/erettsegizo-w.svg"
                                alt="Érettségiző.hu"
                                width={200}
                                height={64}
                                className="h-12 md:h-16 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {!isJelentkezes && (
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[15px] font-poppins-med text-white/50">
                            <Link href="https://erettsegizo.hu" className="hover:text-white transition-colors duration-300">Kezdőlap</Link>
                            {subjects.includes("magyar") && (
                                <Link href="#magyar" className="hover:text-white transition-colors duration-300">Magyar</Link>
                            )}
                            <Link href="#tortenelem" className="hover:text-white transition-colors duration-300">Történelem</Link>
                            <Link href="#gyik" className="hover:text-white transition-colors duration-300">GYIK</Link>
                            <Link href="/jelentkezes" className="hover:text-white transition-colors duration-300 text-green font-poppins-bold">Jelentkezés</Link>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-poppins text-white/50 mt-4 md:mt-0">
                        <Link href="/aszf" className="hover:text-white transition-colors underline decoration-white/20">ÁSZF</Link>
                        <Link href="/adatvedelem" className="hover:text-white transition-colors underline decoration-white/20">Adatvédelem</Link>
                        <Link href="/impresszum" className="hover:text-white transition-colors underline decoration-white/20">Impresszum</Link>
                        <Link href="/joginyilatkozat" className="hover:text-white transition-colors underline decoration-white/20">Jognyilatkozat</Link>
                    </div>
                </div>

                <div className="flex items-center justify-center text-center">
                    <p className="text-white/60 font-poppins-med tracking-wide text-[15px] uppercase">
                        Az oldalt készítette: {" "}
                        <Link
                            href="https://netbazis.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-poppins-bold text-white hover:text-green transition-colors duration-300 relative inline-block group"
                        >
                            Netbázis
                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    </p>
                </div>

                <div className="mt-12 text-center text-[13px] text-white/50 font-poppins tracking-wider uppercase">
                    &copy; {new Date().getFullYear()} Érettségiző. Minden jog fenntartva.
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(150%) skewX(-15deg); }
                }
            `}</style>
        </footer>
    );
}
