"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FileText, AlertCircle, Brain, ListCollapse, BookX, BookOpen } from 'lucide-react';

const CARDS = [
    {
        icon: FileText,
        text: <>Úgy érzed,<br />biztos maradt ki valami.</>,
        textColor: "text-gray-600",
    },
    {
        icon: AlertCircle,
        text: <>Túl sok az információ,<br />nincs rendszer.</>,
        textColor: "text-black",
    },
    {
        icon: Brain,
        text: <>egyre<br /><strong className="text-black">bizonytalanabb</strong><br />leszel</>,
        textColor: "text-gray-600",
    },
    {
        icon: ListCollapse,
        text: <>Jegyzetek mindenhol.</>,
        textColor: "text-gray-600",
    },
    {
        icon: BookX,
        text: <>Nem tudod, mit vegyél át még.</>,
        textColor: "text-gray-600",
    },
    {
        icon: BookOpen,
        text: <>Kezdesz pánikolni.</>,
        textColor: "text-gray-600",
    },
];

const ScatterWord = ({ text }: { text: string }) => {
    const letters = text.split("");
    const scatterVariants = [
        { y: -30, x: 0, rotate: 30 },
        { y: -10, x: 0, rotate: 30 },
        { y: 5, x: 0, rotate: 30 },
        { y: 20, x: 0, rotate: 30 },
        { y: 20, x: 5, rotate: -30 },
        { y: 5, x: 0, rotate: -30 },
        { y: -10, x: 5, rotate: -30 },
        { y: -30, x: 10, rotate: -30 },
    ];

    return (
        <span className="inline-flex font-poppins-bold whitespace-nowrap">
            {letters.map((char, index) => {
                const variant = scatterVariants[index % scatterVariants.length] || { y: 0, x: 0, rotate: 0 };
                return (
                    <motion.span
                        key={index}
                        className="inline-block origin-center"
                        initial={{ y: 0, x: 0, rotate: 0 }}
                        whileInView={variant}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{
                            type: "spring",
                            damping: 12,
                            stiffness: 200,
                            delay: index * 0.05,
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </span>
    );
};

function ScrollCards() {
    const stickyRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: stickyRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const zone = Math.floor(v * (CARDS.length + 1));
        setActiveCard(Math.min(zone, CARDS.length - 1));
    });

    return (
        <div ref={stickyRef} className="relative" style={{ height: `${(CARDS.length + 2) * 50}vh` }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
                <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-[2rem] overflow-hidden">
                    {CARDS.map((card, i) => {
                        const Icon = card.icon;
                        const isActive = i === activeCard;
                        const isPast = i < activeCard;

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: isActive ? 1.04 : 1,
                                    y: isActive ? -6 : 0,
                                    backgroundColor: isActive
                                        ? "rgba(170, 255, 169, 0.35)"
                                        : isPast
                                            ? "rgba(170, 255, 169, 0.08)"
                                            : "rgba(255, 255, 255, 0)",
                                }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className={`p-5 sm:p-8 md:p-10 flex flex-col items-center text-center relative
                                    ${i < 4 ? "border-b" : ""} 
                                    ${i < 3 ? "lg:border-b-0" : ""}
                                    ${i >= 3 ? "lg:border-t" : ""}
                                    ${i % 2 === 0 ? "border-r" : ""}
                                    ${i % 2 !== 0 ? "lg:border-r-0" : ""}
                                    ${i % 3 !== 2 ? "lg:border-r" : ""}
                                    border-gray-200
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ boxShadow: "inset 0 0 30px rgba(17, 255, 189, 0.15)" }}
                                    />
                                )}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.2 : 1,
                                        rotate: isActive ? [0, -8, 8, 0] : 0,
                                    }}
                                    transition={{
                                        scale: { type: "spring", damping: 15, stiffness: 300 },
                                        rotate: { duration: 0.5, ease: "easeInOut" },
                                    }}
                                >
                                    <Icon
                                        className={`w-7 h-7 sm:w-8 sm:h-8 mb-2 sm:mb-3 transition-colors duration-300 ${isActive ? "text-green-600" : "text-black"}`}
                                        strokeWidth={2}
                                    />
                                </motion.div>
                                <motion.p
                                    animate={{ opacity: isActive ? 1 : isPast ? 0.5 : 0.35 }}
                                    transition={{ duration: 0.3 }}
                                    className={`${card.textColor} text-[13px] sm:text-[15px] md:text-base font-poppins-med leading-relaxed`}
                                >
                                    {card.text}
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function ProblemSection() {
    return (
        <section className="w-full bg-[#f8f9fa]">
            <div className="container-main flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] font-poppins-bold text-black text-center mb-4 sm:mb-8 md:mb-20 w-full flex flex-col xl:flex-row justify-center items-center gap-y-12 xl:gap-y-0 gap-x-3 md:gap-x-5 px-4">
                    <span>Az utolsó este könnyen</span>
                    <ScatterWord text="szétesik" />
                </h2>
            </div>

            {/* Scroll-driven card highlights — 2 col mobile, 3 col desktop */}
            <ScrollCards />

            {/* Bottom CTA blocks */}
            <div className="container-main flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 pt-16">
                <div className="w-full max-w-4xl relative flex flex-col items-center px-2">
                    <div className="w-full bg-[#fde5e5] rounded-[2rem] p-6 sm:p-8 md:p-12 pb-24 md:pb-28 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-center md:text-left z-0">
                        <div className="text-red-500 font-bold mb-2 md:mb-0 shrink-0">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff3b30]">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-black font-poppins-med text-lg md:text-2xl leading-relaxed max-w-2xl">
                            A probléma nem az, hogy nem tanultál <span className="font-poppins-bold">(jobb esetben)</span>.<br />
                            Hanem az, hogy nincs lezárva a fejedben az egész.
                        </p>
                    </div>

                    <div className="w-full bg-black rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-16 flex items-center justify-center text-center shadow-2xl z-10 -mt-16 md:-mt-20">
                        <h3 className="text-white font-poppins-bold text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] leading-tight max-w-[100%] sm:max-w-[90%]">
                            Az utolsó este nem új tanulásról kellene szóljon – <br className="hidden md:block" />
                            <span className="relative inline-block mt-3 lg:mt-4">
                                hanem rendszerezésről.
                                <span className="absolute -bottom-[0.1em] left-1 w-[calc(100%-0.7rem)] h-[0.3em] bg-green opacity-90 -z-10 rounded-sm"></span>
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}