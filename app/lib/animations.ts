"use client";

import { useEffect, useState } from "react";

// Reduced motion hook
export function useReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => {
            setReducedMotion(event.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return reducedMotion;
}

// Framer Motion variants - egységes animációk
export const fadeInUp = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeInUpMobile = {
    hidden: { 
        opacity: 0, 
        y: 12 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const fadeIn = {
    hidden: { 
        opacity: 0 
    },
    visible: { 
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

export const scaleIn = {
    hidden: { 
        opacity: 0, 
        scale: 0.95 
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const slideInLeft = {
    hidden: { 
        opacity: 0, 
        x: -30 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const slideInRight = {
    hidden: { 
        opacity: 0, 
        x: 30 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Viewport settings for framer-motion
export const viewportOnce = {
    once: true,
    amount: 0.2
};

export const viewportAlways = {
    once: false,
    amount: 0.2
};

export const viewportOnceSmall = {
    once: true,
    amount: 0.1
};

// Reduced motion aware variants
export function getAnimationVariants(reducedMotion: boolean) {
    if (reducedMotion) {
        return {
            fadeInUp: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.01 } }
            },
            staggerContainer: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.01 } }
            },
            scaleIn: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.01 } }
            }
        };
    }
    
    return {
        fadeInUp,
        staggerContainer,
        scaleIn
    };
}