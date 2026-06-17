"use client";

import { KaraokeGreenToken, MinimalFadeToken, PopZoomToken } from "./style-animation";
import StyleVariantCard from "./style-variant-card";

const styles = [
    {
        id: 1,
        text: "karaoke-green",
        variant: KaraokeGreenToken,
    },
    {
        id: 2,
        text: "pop-zoom",
        variant: PopZoomToken,
    },
    {
        id: 3,
        text: "minimal-fade",
        variant: MinimalFadeToken,
    },
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )

}