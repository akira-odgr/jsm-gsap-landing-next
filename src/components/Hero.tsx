"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

export const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });

        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(".right-leaf", { y: 200 }, 0)
            .to(".left-leaf", { y: -200 }, 0);

        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        // Video animation timeline
        // LenisやScrollTriggerが安定してから初期化するため0.5秒遅延
        setTimeout(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "video",
                    start: startValue,
                    end: endValue,
                    scrub: true,
                    pin: true,
                },
            });

            // tl.to(videoRef.current, {
            //     currentTime: videoRef.current.duration,
            //     ease: "none", // ← スクロールに合わせて滑らかに進む
            // });
            // Wait for video to load and then set up the animation
            const setupVideoAnimation = () => {
                if (videoRef.current && videoRef.current.duration) {
                    tl.to(videoRef.current, {
                        currentTime: videoRef.current.duration,
                    });
                }
            };

            if (videoRef.current) {
                if (videoRef.current.readyState >= 1) {
                    // Video is already loaded
                    setupVideoAnimation();
                } else {
                    // Wait for video to load
                    videoRef.current.onloadedmetadata = setupVideoAnimation;
                    videoRef.current.oncanplay = setupVideoAnimation;
                }
            }
        }, 500); // ← 遅延時間（500ms = 0.5秒）
    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium
                                ingredients, creative flair, and timeless
                                recipes - designed to delight your senses.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                ></video>
            </div>
        </>
    );
};

export default Hero;
