"use client";

import React, { useEffect, useRef } from "react";
import { Check, ArrowRight, ShieldCheck, Mail, AlertCircle, MousePointerClick, Forward } from "lucide-react";
import Link from "next/link";
import { useTracking } from "@/hooks/useTracking";
import { getStoredLeadData } from "@/lib/tracking";
import { motion } from "framer-motion";

export default function SikeresJelentkezesPage() {
    const { trackPurchase } = useTracking();
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;
        hasTracked.current = true;

        const leadData = getStoredLeadData();
        if (leadData) {
            trackPurchase(
                {
                    email: leadData.email,
                    firstName: leadData.firstName,
                    lastName: leadData.lastName,
                    phone: leadData.phone,
                },
                leadData.product,
                leadData.value,
                leadData.currency
            );
        } else {
            console.warn("[Tracking] Nem található lead adat a Purchase rögzítéséhez (üres session).");
        }
    }, [trackPurchase]);

    return (
        <section className="w-full min-h-screen bg-[#fafaf9] pt-36 md:pt-48 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-green/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[0%] -left-[10%] w-[40%] h-[40%] bg-black/5 blur-[100px] rounded-full" />
            </div>

            <div className="container-main px-4 relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-green rounded-[2rem] flex items-center justify-center shadow-xl shadow-green/20 mb-8"
                >
                    <Check size={48} className="text-black" strokeWidth={3.5} />
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-poppins-extrab text-3xl sm:text-5xl md:text-6xl text-black mb-4 leading-tight text-center"
                >
                    Sikeresen <span className="bg-green px-3 py-1 ml-1 rounded-xl whitespace-nowrap">jelentkeztél!</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-poppins-med text-base md:text-lg text-black/60 text-center max-w-2xl mb-12"
                >
                    A megadott e-mail címedre elküldtünk minden további információt! Ha nem találod, kérjük ellenőrizd a <span className="font-poppins-bold underline decoration-green decoration-2 underline-offset-4">promóciók</span> fülnél, illetve a spam mappában is.
                </motion.p>

                {/* GMAIL TUTORIAL SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-black/[0.03] flex flex-col items-center"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-black/60">
                            <AlertCircle size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="font-poppins-bold text-xl md:text-2xl text-black">Fontos teendőd Gmail esetén</h2>
                    </div>
                    
                    <p className="font-poppins-med text-sm md:text-base text-black/70 text-center max-w-3xl mb-10 leading-relaxed">
                        Hogy a továbbiakban biztosan megérkezzenek a levelek, és azonnal megkaphass minden linket és információt az ismétlésről, a következő három gyors lépésre van szükséged:
                    </p>

                    <div className="w-full flex flex-col gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-green/20 text-black font-poppins-extrab text-xl md:text-2xl rounded-xl md:rounded-2xl flex items-center justify-center">1</div>
                                <h3 className="font-poppins-bold text-base md:text-lg text-black leading-snug">
                                    Lépj be a Gmail fiókodba, és kattints a Promóciók fülre!
                                </h3>
                            </div>
                            <div className="w-full pl-0 md:pl-[72px] mt-2">
                                <div className="border-4 border-black/5 rounded-2xl overflow-hidden shadow-inner w-full bg-white">
                                    <img src="https://erettsegizo.hu/wp-content/uploads/2019/12/email1.jpg" alt="Gmail Promóciók Fül" className="w-full h-auto object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-green/20 text-black font-poppins-extrab text-xl md:text-2xl rounded-xl md:rounded-2xl flex items-center justify-center">2</div>
                                <h3 className="font-poppins-bold text-base md:text-lg text-black leading-snug">
                                    Az erettsegizo.hu levelét <span className="bg-black text-white px-2 py-0.5 rounded-lg text-sm mx-1">húzd át</span> az Elsődleges mappába!
                                </h3>
                            </div>
                            <div className="w-full pl-0 md:pl-[72px] mt-2">
                                <div className="border-4 border-black/5 rounded-2xl overflow-hidden shadow-inner w-full flex items-center justify-center bg-gray-50 p-2 md:p-4">
                                    <img src="https://erettsegizo.hu/wp-content/uploads/2019/12/promociok.gif" alt="Húzd az Elsődlegesbe" className="max-w-full h-auto object-contain rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-green/20 text-black font-poppins-extrab text-xl md:text-2xl rounded-xl md:rounded-2xl flex items-center justify-center">3</div>
                                <h3 className="font-poppins-bold text-base md:text-lg text-black leading-snug flex-1">
                                    A lenn felugró ablakban erősítsd meg a műveletet: kattints az <span className="text-green uppercase tracking-widest bg-black px-2 py-1 rounded-md text-sm mx-1">Igen</span>-re!
                                </h3>
                            </div>
                            <div className="w-full pl-0 md:pl-[72px] mt-2">
                                <div className="border-4 border-black/5 rounded-2xl overflow-hidden shadow-inner w-full md:w-3/4 bg-[#323232] p-4 flex justify-center">
                                    <img src="https://erettsegizo.hu/wp-content/uploads/2019/12/gmail3.jpg" alt="Kattints az Igenre" className="max-w-full h-auto object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-black/40 font-poppins-bold uppercase tracking-widest text-sm hover:text-black transition-colors"
                    >
                        <ArrowRight size={16} strokeWidth={3} className="rotate-180" />
                        Vissza a főoldalra
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
