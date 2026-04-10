import React from "react";
import LegalPageLayout from "@/app/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Adatkezelési Tájékoztató",
    description: "Az Érettségiző.hu adatkezelési és adatvédelmi tájékoztatója.",
    alternates: {
        canonical: "/adatvedelem",
    },
};

export default function AdatvedelemPage() {
    return (
        <LegalPageLayout 
            title="Adatkezelési Tájékoztató" 
            subtitle="Hatályos: 2025. december 01. napjától visszavonásig"
        >
            <section>
                <p>
                    Jelen adatkezelési tájékoztató (továbbiakban: „Tájékoztató”) az erettsegizo.hu oldalon (a továbbiakban: „Weboldal”) nyújtott szolgáltatásokra létrejött konzorcium (továbbiakban: „Adatkezelők” vagy „Közös Adatkezelők”) által szervezett érettségi felkészítő képzésekre és oktatási eseményekre (továbbiakban: „Szolgáltatás”) vonatkozik.
                </p>
            </section>

            <section>
                <h2>1. Adatkezelők és elérhetőségeik</h2>
                <p>Az adatkezelők a weboldalon elérhető szolgáltatások megvalósítására létrejött konzorcium tagjai:</p>
                <ol>
                    <li><strong>Hegedüs Tamás e.v.</strong> (9151 Abda, Bécsi utca 99.) – Konzorciumvezető</li>
                    <li><strong>Hegedüsné Réti Edit Teréz e.v.</strong> (9151 Abda, Bécsi utca 99.)</li>
                    <li><strong>Hegedüs Miklós e.v.</strong> (9021 Győr, Domb utca 8. L30.)</li>
                </ol>
                <p>
                    <strong>Közös e-mail cím:</strong> info@erettsegizo.hu<br />
                    <strong>Közös telefonszám:</strong> +3630 4059600
                </p>
            </section>

            <section>
                <h2>2. A kezelt adatok köre és célja</h2>
                <h3>Jelentkezés és vásárlás:</h3>
                <ul>
                    <li><strong>Adatok:</strong> Név, cím, e-mail cím, telefonszám.</li>
                    <li><strong>Cél:</strong> Regisztráció, kapcsolattartás, számlázás.</li>
                    <li><strong>Jogalap:</strong> Szerződés teljesítése.</li>
                </ul>

                <h3>Felnőttképzési adatszolgáltatás (FIR):</h3>
                <p>Amennyiben a képzés felnőttképzésnek minősül, a törvényi előírások alapján az alábbi adatokat is kezeljük:</p>
                <ul>
                    <li>Születési hely és idő, anyja neve, oktatási azonosító, legmagasabb iskolai végzettség.</li>
                </ul>

                <h3>Szakmai adatbekérő:</h3>
                <p>Az oktatás színvonalának biztosítása érdekében kérhetünk adatokat az életkorról, iskoláról és korábbi érdemjegyekről. Ezek megadása önkéntes.</p>
            </section>

            <section>
                <h2>3. Adatfeldolgozók</h2>
                <p>Tevékenységünk során az alábbi partnereket vesszük igénybe:</p>
                <ul>
                    <li><strong>KBOSS.hu Kft. (Számlázz.hu):</strong> Számlázás.</li>
                    <li><strong>Barion Payment Zrt.:</strong> Online fizetés.</li>
                    <li><strong>Tárhely.eu Kft.:</strong> Tárhely és levelezés.</li>
                    <li><strong>SalesAutopilot Kft.:</strong> Hírlevél és adminisztráció.</li>
                    <li><strong>Microsoft (Teams):</strong> Online oktatási felület.</li>
                </ul>
            </section>

            <section>
                <h2>4. Az Ön jogai</h2>
                <p>Önt az adatkezeléssel kapcsolatban az alábbi jogok illetik meg:</p>
                <ul>
                    <li><strong>Tájékoztatáshoz való jog:</strong> Bármikor kérhet információt adatai kezeléséről.</li>
                    <li><strong>Helyesbítéshez való jog:</strong> Kérheti adatai javítását.</li>
                    <li><strong>Törléshez való jog:</strong> Bizonyos esetekben kérheti adatai törlését.</li>
                    <li><strong>Tiltakozáshoz való jog:</strong> Tiltakozhat adatai marketing célú felhasználása ellen.</li>
                </ul>
            </section>

            <section>
                <h2>5. Jogorvoslat</h2>
                <p>Panasz esetén fordulhat az Adatkezelőkhöz az info@erettsegizo.hu címen, vagy a hatósághoz:</p>
                <p>
                    <strong>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</strong><br />
                    1055 Budapest, Falk Miksa utca 9-11.<br />
                    www.naih.hu
                </p>
            </section>
        </LegalPageLayout>
    );
}
