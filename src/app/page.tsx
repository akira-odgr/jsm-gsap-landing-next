"use client";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Home = () => {
    return (
        <div className="flex-center h-screen">
            <h1 className="text-3xl text-indigo-300">Hello, GSAP</h1>
        </div>
    );
};

export default Home;
