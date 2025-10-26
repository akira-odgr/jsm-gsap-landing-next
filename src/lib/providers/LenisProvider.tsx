"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // Lenis initialization
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            lerp: 0.1,
        });

        lenisRef.current = lenis;

        // Synchronize Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Ensure ScrollTrigger refresh after Lenis is ready
        ScrollTrigger.refresh();

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Cleanup when unmounted
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return <>{children}</>;
}
