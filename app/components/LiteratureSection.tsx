"use client";

import React, { useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";

const STEPS = [
    {
        number: "01",
        title: "Korszakról korszakra haladunk.",
        desc: "A kronologikus felépítés segít, hogy a fejed képes legyen összefüggő képet alkotni – ne csak szigetelten emlékezz nevekre és dátumokra.",
        image: "/images/Literature-1.png",
        label: "Korszakok",
    },
    {
        number: "02",
        title: "Megmutatjuk az ok–okozati láncokat.",
        desc: 'Nem csak "mi van", hanem "miért és hogyan". Az összekapcsolt tudás messze felülmúlja az elszigetelt tények memorizálását.',
        image: "/images/Literature-2.png",
        label: "ok–okozat",
    },
    {
        number: "03",
        title: "Rögzítjük a lényeget minden témánál.",
        desc: "Egy este nem elég az egész tananyagra – de elég arra, hogy a fontos dolgok biztonságosan a helyükre kerüljenek.",
        image: "/images/Literature-3.png",
        label: "Lényegek",
    },
    {
        number: "04",
        title: "Kimondjuk a kulcsfogalmakat és összefüggéseket.",
        desc: "Ars poetica, motívum, korszakjegy – ha hallod a szót az érettségin, tudod pontosan, mit jelent és hova kapcsolódik.",
        image: "/images/Literature-4.png",
        label: "Összefüggések",
    },
];

function ScrollProgressSection() {
    const stickyRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: stickyRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const step = Math.min(3, Math.floor(v * 4));
        setActiveStep(step);
    });

    const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={stickyRef} className="relative" style={{ height: "400vh" }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="flex gap-6 items-start">
                        {/* Vertical progress bar — desktop only */}
                        <div className="hidden sm:flex flex-col items-center shrink-0 pt-1">
                            <div className="relative w-[3px] rounded-full bg-black/10" style={{ height: `${STEPS.length * 80}px` }}>
                                <motion.div
                                    className="absolute top-0 left-0 w-full bg-lime-800 rounded-full"
                                    style={{ height: progressHeight }}
                                />
                                {STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute left-1/2 rounded-full border-2 transition-all duration-500"
                                        style={{
                                            top: `${(i / (STEPS.length - 1)) * 100}%`,
                                            transform: "translate(-50%, -50%)",
                                            width: i <= activeStep ? 14 : 10,
                                            height: i <= activeStep ? 14 : 10,
                                            backgroundColor: i <= activeStep ? "#3f6212" : "#d1d5db",
                                            borderColor: i <= activeStep ? "#3f6212" : "#d1d5db",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step text content */}
                        <div className="flex flex-col gap-2 flex-1">
                            {/* Mobile mini progress pills */}
                            <div className="flex sm:hidden gap-2 mb-4">
                                {STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-1 flex-1 rounded-full transition-all duration-500"
                                        style={{ backgroundColor: i <= activeStep ? "#3FCF8E" : "#e5e7eb" }}
                                    />
                                ))}
                            </div>

                            {STEPS.map((step, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: i === activeStep ? 1 : i < activeStep ? 0.3 : 0.2,
                                        y: i === activeStep ? 0 : i < activeStep ? -4 : 8,
                                        scale: i === activeStep ? 1 : 0.97,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className={`flex flex-col gap-1 py-3 border-l-2 pl-5 transition-all duration-300 ${i === activeStep ? "border-lime-800" : "border-transparent"
                                        }`}
                                >
                                    <span className="text-xs font-poppins-bold uppercase tracking-[0.2em] text-black">{step.label}</span>
                                    <h3 className="text-[1.25rem] sm:text-[1.4rem] md:text-[1.6rem] font-poppins-bold text-black leading-snug">
                                        {step.title}
                                    </h3>
                                    <motion.p
                                        animate={{ opacity: i === activeStep ? 1 : 0, height: i === activeStep ? "auto" : 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="text-[15px] md:text-base font-poppins-med text-black/60 leading-relaxed overflow-hidden"
                                    >
                                        {step.desc}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Animated image */}
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-black/5">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0"
                                animate={{
                                    opacity: i === activeStep ? 1 : 0,
                                    scale: i === activeStep ? 1 : 1.04,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="font-poppins-bold text-black text-sm">{step.number} / {STEPS.length}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function LiteratureSection() {
    return (
        <section id="magyar" className="w-full bg-[#f8f9fa] scroll-mt-20">
            {/* Heading */}
            <div className="pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 container-main px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                <div className="w-full text-center">
                    <h2 className="text-4xl sm:text-[2.5rem] md:text-6xl lg:text-[4.75rem] text-black leading-[1.1] tracking-tight">
                        <span className="font-poppins-extrab">Magyar nyelv és irodalom</span>
                        <br />
                        <span className="font-poppins-med text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] text-black/70 tracking-normal">
                            korszakok és{" "}
                            <span className="italic font-light text-black/50">művek rendszerben</span>
                        </span>
                    </h2>
                </div>
            </div>

            {/* Scroll-driven progress section */}
            <ScrollProgressSection />

            {/* Bottom closing section */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 container-main px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-16 md:pb-24 lg:pb-32 pt-16">
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start pr-0 md:pr-12">
                    <div
                        className="inline-block bg-green py-2 md:py-4 px-4 md:px-8 pr-8 md:pr-16 relative mb-6 md:mb-8 shadow-sm text-center lg:text-left"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}
                    >
                        <h3 className="text-black font-poppins-bold text-xl md:text-3xl tracking-tight">Miért segít ez másnap?</h3>
                    </div>

                    <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left w-full">
                        <p className="text-[1.15rem] md:text-xl text-black/80 font-light italic">
                            Az utolsó este nem tanulásról szól – hanem aktiválásról.
                        </p>
                        <p className="text-[1.15rem] md:text-xl text-black/80 font-light italic">
                            Amit az érettségi előtti órákban strukturáltan átnézel, az nagyobb eséllyel lesz elérhető másnap.
                        </p>
                        <p className="text-[1.15rem] md:text-xl text-black font-poppins-bold italic mt-3">
                            Ez nem plusz terhelés.
                        </p>
                        <p className="text-[1.15rem] md:text-xl text-black font-poppins-bold italic">
                            Ez mentális elrendezés.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:pr-[10%] mt-8 lg:mt-0 text-center lg:text-right">
                    <h2 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-poppins-bold leading-none tracking-tighter text-black">
                        21:00
                    </h2>
                    <div className="flex flex-col items-center lg:items-start mt-2 sm:mt-4 sm:pl-0 lg:pl-2 text-center lg:text-left">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-poppins-bold tracking-tight text-black mb-1">
                            -kor lezárjuk
                        </p>
                        <div className="relative inline-block mt-1 sm:mt-2">
                            <span className="relative z-10 text-2xl sm:text-3xl md:text-[2.75rem] font-poppins-bold tracking-tight text-black">
                                És készen vagy.
                            </span>
                            <div className="absolute bottom-1 sm:bottom-0 left-0 w-full h-[10px] sm:h-[16px] bg-green z-0 opacity-80 rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
