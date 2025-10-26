"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <div className="h-dvh bg-black" />
            </main>
        </>
    );
};

export default Home;
