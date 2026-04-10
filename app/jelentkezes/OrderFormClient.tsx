"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const OrderForm = dynamic(() => import("@/app/components/OrderForm"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[500px] flex items-center justify-center font-poppins-med">
            Jelentkezési lap betöltése...
            <Loader2 className="animate-spin" />
        </div>
    )
});

export default function OrderFormClient() {
    return <OrderForm />;
}
