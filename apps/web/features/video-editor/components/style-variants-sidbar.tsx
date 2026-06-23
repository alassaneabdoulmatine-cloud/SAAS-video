"use client";

import animation1 from "../styles-sub-animation/style-animation-1";
import animation2 from "../styles-sub-animation/style-animation-2";
import animation3 from "../styles-sub-animation/style-animation-3";
import animation4 from "../styles-sub-animation/style-animation-4";
import animation5 from "../styles-sub-animation/style-animation-5";
import animation6 from "../styles-sub-animation/style-animation-6";
import animation7 from "../styles-sub-animation/style-animation-7";
import animation8 from "../styles-sub-animation/style-animation-8";
import animation9 from "../styles-sub-animation/style-animation-9";
import animation10 from "../styles-sub-animation/style-animation-10";
import animation11 from "../styles-sub-animation/style-animation-11";
import animation12 from "../styles-sub-animation/style-animation-12";
import animation13 from "../styles-sub-animation/style-animation-13";
import animation14 from "../styles-sub-animation/style-animation-14";
import animation15 from "../styles-sub-animation/style-animation-15";
import animation16 from "../styles-sub-animation/style-animation-16";
import animation17 from "../styles-sub-animation/style-animation-17";
import animation18 from "../styles-sub-animation/style-animation-18";
import StyleVariantCard from "./style-variant-card";

const styles = [
    {
        id: 1,
        text: "animation1",
        variant: animation1,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 2,
        text: "animation2",
        variant: animation2,
        combineTokensWithinMilliseconds: 600,
    },
    {
        id: 3,
        text: "animation3",
        variant: animation3,
        combineTokensWithinMilliseconds: 800,
    },
    {
        id: 4,
        text: "animation4",
        variant: animation4,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 5,
        text: "animation5",
        variant: animation5,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 6,
        text: "animation6",
        variant: animation6,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 7,
        text: "Pill Pop",
        variant: animation7,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 8,
        text: "Blur Focus",
        variant: animation8,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 9,
        text: "Slide Up",
        variant: animation9,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 10,
        text: "Neon Cyan",
        variant: animation10,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 11,
        text: "Elastic Bounce",
        variant: animation11,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 12,
        text: "Yellow Line",
        variant: animation12,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 13,
        text: "Wobble Tilt",
        variant: animation13,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 14,
        text: "Cinematic",
        variant: animation14,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 15,
        text: "Dark Box",
        variant: animation15,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 16,
        text: "Green Skew",
        variant: animation16,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 17,
        text: "Red Outline",
        variant: animation17,
        combineTokensWithinMilliseconds: 400,
    },
    {
        id: 18,
        text: "Warm Glow",
        variant: animation18,
        combineTokensWithinMilliseconds: 400,
    }
]

export default function StyleVariantsSidebar() {
    return (
        <aside className="w-[360px] h-[calc(100dvh-4.2rem)] border-r border-border flex flex-col ">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 CustomScrollbar">
                <div>
                    <div className="grid grid-cols-2 gap-3">
                        {styles.map((style) => (
                            <StyleVariantCard
                                key={style.id}
                                text={style.text}
                                variant={style.variant}
                                combineTokensWithinMilliseconds={style.combineTokensWithinMilliseconds}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )

}