"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

const LenisProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ReactLenis root options={{ anchors: true }}>
            {children}
        </ReactLenis>
    );
};

export default LenisProvider;
