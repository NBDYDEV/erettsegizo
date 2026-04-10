import React from "react";
import LegalPageLayout from "@/app/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Általános Szerződési Feltételek",
    description: "Az Érettségiző.hu Konzorcium Általános Szerződési Feltételei.",
    alternates: {
        canonical: "/aszf",
    },
};

export default function AszfPage() {
    return (
        <LegalPageLayout 
            title="Általános Szerződési Feltételek" 
            subtitle="Utoljára frissítve: 2025. december 01."
        >
            <section>
                <h2>1. A Szolgáltatók adatai (A Konzorcium tagjai)</h2>
                <p>
                    A szolgáltatást az Érettségiző.hu Konzorcium tagjai nyújtják funkcionális munkamegosztásban, a jelen ÁSZF-ben meghatározott keretek között.
                </p>
                
                <h3>Konzorciumvezető:</h3>
                <ul>
                    <li><strong>Név:</strong> Hegedüs Tamás e.v.</li>
                    <li><strong>Székhely:</strong> 9151 Abda, Bécsi utca 99.</li>
                    <li><strong>Nyilvántartási szám:</strong> 33590281</li>
                    <li><strong>Felnőttképzési nyilvántartási szám:</strong> B/2020/008357</li>
                    <li><strong>Adószám:</strong> 66299503-1-28</li>
                    <li><strong>Telefonszám:</strong> +3630 4059600</li>
                    <li><strong>E-mail cím:</strong> info@erettsegizo.hu</li>
                </ul>

                <h3>Konzorciumi tagok (további Szolgáltatók):</h3>
                <ul>
                    <li><strong>Hegedüsné Réti Edit Teréz e.v.</strong> (Székhely: 9151 Abda, Bécsi utca 99., Nyilvántartási szám: 55911584, Felnőttképzési nyilvántartási szám: B/2023/000008, Adószám: 57296856-1-28)</li>
                    <li><strong>Hegedüs Miklós e.v.</strong> (Székhely: 9021 Győr, Domb utca 8. L30., Nyilvántartási szám: 57416724, Adószám: 79781659-1-28)</li>
                </ul>
            </section>

            <section>
                <h2>2. Az ÁSZF hatálya és tárgya</h2>
                <p>
                    Jelen Általános Szerződési Feltételek (a továbbiakban: „ÁSZF”) célja, hogy meghatározzák a Hegedüs Tamás e.v. által üzemeltetett, az erettsegizo.hu linken elérhető oktatásszervezési felület használatának feltételeit.
                </p>
                <p>
                    A Résztvevő tudomásul veszi, hogy a Felületen keresztül leadott jelentkezéssel azzal a Szolgáltatóval kerül szerződéses jogviszonyba, aki az adott Értékesítési ciklusban a Felületen eladóként és számlakibocsátóként rögzítésre került.
                </p>
            </section>

            <section>
                <h2>3. A szerződés létrejötte</h2>
                <p>
                    A szerződés elektronikus úton jön létre azzal, hogy a Résztvevő a képzésre jelentkezik, a jelentkezést elküldi, és azt az aktuális Szolgáltató visszaigazolja a Résztvevő által megadott elektronikus levelezési címére.
                </p>
            </section>

            <section>
                <h2>4. Részvételi díj és fizetési feltételek</h2>
                <p>
                    A szolgáltatás igénybevételéért a Résztvevő díj fizetésére köteles. A részvételi díj az erettsegizo.hu oldalon kerül feltüntetésre. A díjak ÁFA-mentesek (alanyi adómentes tevékenység).
                </p>
                <p>Fizetési módok:</p>
                <ul>
                    <li>Banki átutalás</li>
                    <li>Online bankkártyás fizetés (Barion)</li>
                    <li>Készpénzes fizetés (helyszíni adminisztrációs költséggel)</li>
                </ul>
            </section>

            <section>
                <h2>5. Lemondási feltételek</h2>
                <ul>
                    <li>30 nappal a képzés előtt: 100% visszatérítés.</li>
                    <li>15-30 nap között: 50% visszatérítés.</li>
                    <li>15 napon belül: nincs visszatérítés.</li>
                </ul>
            </section>

            <section>
                <h2>6. Garanciák</h2>
                <p>
                    <strong>100% elégedettségi garancia:</strong> Ha a képzés első napjának végéig jelzed elégedetlenségedet, visszakérheted a részvételi díjat (adminisztrációs költséggel csökkentve).
                </p>
                <p>
                    <strong>200% vizsgagarancia:</strong> Ha a felkészítő ellenére sikertelen (elégtelen) érettségi vizsgát teszel, a befizetett összeg kétszeresét fizetjük vissza (meghatározott feltételek mellett).
                </p>
            </section>
        </LegalPageLayout>
    );
}
