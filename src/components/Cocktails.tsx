"use client";

import Image from "next/image";
import { cocktailLists, mockTailLists } from "@/data/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
            },
        });

        parallaxTimeline
            .from("#c-left-leaf", { x: -100, y: 100 })
            .from("#c-right-leaf", { x: 100, y: 100 });
    });

    return (
        <section id="cocktails" className="noisy">
            <Image
                id="c-left-leaf"
                src="/images/cocktail-left-leaf.png"
                alt="l-leaf"
                width={200}
                height={200}
            />
            <Image
                id="c-right-leaf"
                src="/images/cocktail-right-leaf.png"
                alt="l-right"
                width={200}
                height={200}
            />

            <div className="list">
                <div className="popular">
                    <h2>Most popular cocktails:</h2>

                    <ul>
                        {cocktailLists.map(
                            ({ name, country, detail, price }) => (
                                <li key={name}>
                                    <div className="md:me-28">
                                        <h3>{name}</h3>
                                        <p>
                                            {country} | {detail}
                                        </p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h2>Most loved cocktails:</h2>

                    <ul>
                        {mockTailLists.map(
                            ({ name, country, detail, price }) => (
                                <li key={name}>
                                    <div className="md:me-28">
                                        <h3>{name}</h3>
                                        <p>
                                            {country} | {detail}
                                        </p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Cocktails;
