"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
    return (
        <main className="w-full min-h-screen bg-white pt-32 pb-24">
            <div className="container-main px-4">
                <div className="max-w-4xl mx-auto">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors font-poppins-bold text-xs uppercase tracking-widest mb-12"
                    >
                        <ArrowLeft size={16} />
                        Vissza a főoldalra
                    </Link>

                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-poppins-extrab text-black mb-4">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-black/40 font-poppins-med text-sm uppercase tracking-widest">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="prose prose-lg max-w-none 
                        prose-headings:font-poppins-bold prose-headings:text-black 
                        prose-p:font-poppins-med prose-p:text-black/70 prose-p:leading-relaxed
                        prose-li:font-poppins-med prose-li:text-black/70
                        prose-strong:text-black
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        space-y-8"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
