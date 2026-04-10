"use client";

import Image from "next/image";
import React from "react";

const CARDS = [
    {
        title: "Nincs utazás",
        desc: "Nem kell utazni. Az már nem férne bele.",
        img: "/images/photo-1645225400050-541fa1bf3131.webp",
        gridClass: "md:col-span-2 flex flex-col md:flex-row items-center",
        textClass: "md:w-1/2 p-6 sm:p-8 md:p-14 text-center md:text-left",
        imgContainerClass: "md:w-1/2 h-64 md:h-full w-full p-4 md:p-6",
        imgClass: "w-full h-full object-cover rounded-3xl md:rounded-[2.5rem]",
    },
    {
        title: "21:00-kor vége",
        desc: "21:00-kor vége. Az esti kakaó után már aludhatsz is!",
        img: "/images/photo-1663416827757-c98066d93625.webp",
        gridClass: "flex flex-col items-center",
        textClass: "p-6 sm:p-8 md:p-10 text-center flex-grow",
        imgContainerClass: "w-full h-64 md:h-72 p-4 md:p-6 pt-0",
        imgClass: "w-full h-full object-cover rounded-3xl",
    },
    {
        title: "Pihenés",
        desc: "Azonnal tudsz pihenni a saját ágyadban.",
        img: "/images/photo-1540555700478-4be289fbecef.webp",
        gridClass: "flex flex-col items-center",
        textClass: "p-6 sm:p-8 md:p-10 text-center flex-grow",
        imgContainerClass: "w-full h-64 md:h-72 p-4 md:p-6 pt-0",
        imgClass: "w-full h-full object-cover rounded-3xl",
    },
];

export default function WhyOnlineSection() {
    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="font-poppins-extrab text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-8">
                            Miért online az utolsó este?
                        </h2>
                        <p className="font-poppins-med text-lg md:text-xl text-black/70 leading-relaxed italic">
                            "Az utolsót azért tartjuk csak online formában, mert így az utazásra nem kell időt szánnod, és amikor vége, feküdhetsz is le aludni a saját ágyadba."
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070"
                                alt="Pihenés"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
