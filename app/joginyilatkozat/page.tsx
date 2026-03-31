import React from "react";
import LegalPageLayout from "@/app/components/LegalPageLayout";

export default function JoginyilatkozatPage() {
    return (
        <LegalPageLayout 
            title="Jogi Nyilatkozat" 
        >
            <section>
                <p>
                    A weboldal használata előtt kérem, olvassa el figyelmesen ezt a jogi nyilatkozatot. Ez a nyilatkozat szabályozza a weboldal és a rajta szereplő valamennyi dokumentum, szöveg, felvétel és egyéb anyag használatát.
                </p>
            </section>

            <section>
                <h2>1. Szellemi tulajdonjogok</h2>
                <p>
                    Valamennyi szellemi tulajdonjog – beleértve a weboldalon szereplő szövegeket, tananyagokat, illusztrációkat, képeket és módszereket – a weboldal tulajdonosának tulajdonát képezi.
                </p>
                <p>
                    A weboldalon szereplő információk kizárólag a weboldal tulajdonosának előzetes írásbeli hozzájárulásával terjeszthetők.
                </p>
            </section>

            <section>
                <h2>2. Tartalom</h2>
                <p>
                    A weboldal tartalma tájékoztató jellegű. A tulajdonos nem garantálja a tartalom teljeskörű helyességét vagy naprakészségét. A tulajdonos nem vállal felelősséget a weboldal esetleges elérhetetlenségéből adódó károkért.
                </p>
            </section>

            <section>
                <h2>3. Felelősség korlátozása</h2>
                <p>
                    A weboldal használata a Felhasználó saját felelősségére történik. A weboldal tulajdonosa kizár minden felelősséget a weboldal használatából eredő közvetlen vagy közvetett károkért.
                </p>
            </section>

            <section>
                <h2>4. Jogkövetkezmények</h2>
                <p>
                    A jelen Jogi Nyilatkozatban foglaltak megsértése esetén a weboldal tulajdonosa megteszi a szükséges jogi lépéseket. A jogosulatlan felhasználás kötbérfizetési kötelezettséget vonhat maga után.
                </p>
            </section>
        </LegalPageLayout>
    );
}
