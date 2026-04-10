import React from "react";
import LegalPageLayout from "@/app/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impresszum",
    description: "Az Érettségiző.hu szolgáltatójának és üzemeltetőjének impresszum adatai.",
    alternates: {
        canonical: "/impresszum",
    },
};

export default function ImpresszumPage() {
    return (
        <LegalPageLayout 
            title="Impresszum" 
        >
            <section>
                <h2>Szolgáltató adatai</h2>
                <ul>
                    <li><strong>Név:</strong> Hegedüs Tamás e.v.</li>
                    <li><strong>Székhely:</strong> 9151 Abda, Bécsi út 99.</li>
                    <li><strong>Nyilvántartási szám:</strong> 33590281</li>
                    <li><strong>Adószám:</strong> 66299503-1-28</li>
                    <li><strong>Illetékes kamara:</strong> Győr-Moson-Sopron megyei Kereskedelmi és Iparkamara</li>
                </ul>
            </section>

            <section>
                <h2>Kapcsolattartási adatok</h2>
                <ul>
                    <li><strong>E-mail:</strong> info@erettsegizo.hu</li>
                    <li><strong>Telefon:</strong> +36 30 / 405-9600</li>
                    <li><strong>Weboldal:</strong> https://erettsegizo.hu</li>
                </ul>
            </section>

            <section>
                <h2>Tárhelyszolgáltató</h2>
                <ul>
                    <li><strong>Név:</strong> Tárhely.eu Kft.</li>
                    <li><strong>Székhely:</strong> 1144 Budapest, Ormánság u. 4.</li>
                    <li><strong>E-mail:</strong> support@tarhely.eu</li>
                </ul>
            </section>

            <section>
                <p className="text-sm text-black/40 mt-12">
                    Copyright © 2019 – Erettsegizo.hu. Minden jog fenntartva.
                </p>
            </section>
        </LegalPageLayout>
    );
}
