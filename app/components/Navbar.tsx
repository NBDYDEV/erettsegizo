"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Counts down to the next Sunday midnight (00:00:00)
function useNextSundayCountdown() {
    const getTimeLeft = () => {
        const now = new Date();
        const next = new Date(now);
        const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
        next.setDate(now.getDate() + daysUntilSunday);
        next.setHours(0, 0, 0, 0);
        const diff = Math.max(0, next.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setTimeLeft(getTimeLeft());
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return timeLeft;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-[14px] md:text-[18px] lg:text-[20px] font-poppins-extrab leading-none tabular-nums">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[7px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.15em] font-poppins opacity-70 mt-0.5">
                {label}
            </span>
        </div>
    );
}

function NavCountdown({ dark }: { dark?: boolean }) {
    const { days, hours, minutes, seconds } = useNextSundayCountdown();

    const wrapperClasses = dark
        ? "border-amber-500/30 bg-amber-500/10 text-amber-600"
        : "border-amber-400/40 bg-white/10 text-white";

    return (
        <div className={`relative group cursor-default`}>
            {/* Subtle animated glow behind */}
            <div className={`absolute -inset-[1px] rounded-2xl opacity-60 blur-sm transition-opacity group-hover:opacity-100 ${dark ? "bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-amber-400/30" : "bg-gradient-to-r from-amber-300/20 via-orange-300/20 to-amber-300/20"} animate-pulse`} />

            <div className={`relative flex items-center gap-2 md:gap-3 lg:gap-4 px-3 md:px-5 py-1.5 md:py-2 rounded-2xl border backdrop-blur-sm ${wrapperClasses}`}>
                {/* Label — hidden on mobile */}
                <div className="hidden md:flex flex-col items-start mr-1">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-poppins-extrab leading-tight whitespace-nowrap">
                        Jelentkezési
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.15em] font-poppins-extrab leading-tight whitespace-nowrap">
                        határidő
                    </span>
                </div>

                {/* Thin separator — hidden on mobile */}
                <div className={`hidden md:block w-px h-8 ${dark ? "bg-amber-500/30" : "bg-white/30"}`} />

                {/* Countdown digits */}
                <div className="flex items-center gap-1.5 md:gap-2.5 lg:gap-3">
                    <CountdownBlock value={days} label="nap" />
                    <span className="text-[12px] md:text-[16px] font-light opacity-40 -mt-2">:</span>
                    <CountdownBlock value={hours} label="óra" />
                    <span className="text-[12px] md:text-[16px] font-light opacity-40 -mt-2">:</span>
                    <CountdownBlock value={minutes} label="perc" />
                    <span className="text-[12px] md:text-[16px] font-light opacity-40 -mt-2">:</span>
                    <CountdownBlock value={seconds} label="mp" />
                </div>
            </div>
        </div>
    );
}

export { NavCountdown };

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [navVisible, setNavVisible] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const isMobile = window.innerWidth < 768;

            setScrolled(currentY > 850);

            if (!isMobile) {
                setNavVisible(true);
                lastY = currentY;
                return;
            }

            const isScrolledPastHero = currentY > 60;
            const isScrollingUp = currentY < lastY;

            if (!isScrolledPastHero) {
                setNavVisible(false);
            } else if (isScrollingUp) {
                setNavVisible(true);
            } else {
                setNavVisible(false);
            }

            lastY = currentY;
        };

        setNavVisible(window.innerWidth >= 768);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    // --- FIX: Dynamic colors for scrolled vs. non-scrolled state ---
    // When scrolled (glass bg over content), use dark text/icons.
    // When not scrolled (over hero), use light text/icons.
    const logoSrc = scrolled ? "/svg/erettsegizo-b.svg" : "/svg/erettsegizo-w.svg";
    const linkColor = scrolled
        ? "text-gray-700 hover:text-black"
        : "text-nav-button-text hover:text-white";
    const hamburgerColor = scrolled
        ? "text-gray-800 hover:text-black"
        : "text-nav-button-text hover:text-white";

    // --- FIX: Custom smooth scroll for anchor links ---
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace("#", ""));
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "instant"
            });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 lg:px-24 font-poppins z-50 transition-all duration-300
                ${isMenuOpen ? "bg-primary py-5 shadow-none" : scrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}
                ${navVisible || isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
            `}>
                {/* Logo */}
                <div className="flex-shrink-0 z-50">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Image
                            src={isMenuOpen ? "/svg/erettsegizo-w.svg" : logoSrc}
                            alt="Érettségiző.hu logo"
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* CENTER: Countdown — all screens */}
                <div className="flex flex-1 justify-center z-50">
                    <NavCountdown dark={scrolled && !isMenuOpen} />
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8 lg:gap-14 flex-shrink-0">
                    <a
                        href="#tortenelem"
                        onClick={(e) => scrollToSection(e, "tortenelem")}
                        className={`${linkColor} transition-colors duration-200 cursor-pointer`}
                    >
                        Történelem
                    </a>
                    <a
                        href="#gyik"
                        onClick={(e) => scrollToSection(e, "gyik")}
                        className={`${linkColor} transition-colors duration-200 cursor-pointer`}
                    >
                        GYIK
                    </a>
                </div>
                <div className="hidden md:block flex-shrink-0 z-50 ml-8">
                    <Link
                        href="/jelentkezes"
                        className="bg-nav-button text-white font-poppins-bold hover:brightness-110 px-6 py-3 rounded-full transition-all duration-200"
                    >
                        Jelentkezem
                    </Link>
                </div>

                {/* Mobile hamburger — color changes with scroll state */}
                <div className="block md:hidden z-50 flex-shrink-0">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`${isMenuOpen ? "text-white" : hamburgerColor} focus:outline-none transition-colors`}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile fullscreen menu */}
            <div className={`fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center pb-20 gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
                <a
                    href="#tortenelem"
                    onClick={(e) => scrollToSection(e, "tortenelem")}
                    className="text-2xl text-nav-button-text hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    Történelem
                </a>
                <a
                    href="#gyik"
                    onClick={(e) => scrollToSection(e, "gyik")}
                    className="text-2xl text-nav-button-text hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    GYIK
                </a>
                <Link
                    href="/jelentkezes"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-green text-black font-poppins-extrab text-xl px-10 py-4 rounded-full transition-all duration-200 hover:brightness-110 mt-4"
                >
                    Jelentkezem
                </Link>
            </div>
        </>
    );
}