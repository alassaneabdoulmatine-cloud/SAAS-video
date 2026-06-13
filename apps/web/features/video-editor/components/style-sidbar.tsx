"use client";

import StyleCard from "./style-cart";

const styles = [
    {
        id: 1,
        text: "Hips Don't Lie",
        subtext: "was number one",
        variant: "basic-white",
        active: true,
    },
    {
        id: 2,
        text: "Hips Don't Lie",
        subtext: "was number one",
        variant: "basic-yellow",
    },
]

export default function StyleSidebar() {
    return (
        <aside className="w-[360px] h-[calc(100dvh-4.2rem)] border-r border-border flex flex-col ">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 CustomScrollbar">
                <div>
                    <div className="grid grid-cols-2 gap-3">
                        {styles.map((style) => (
                            <StyleCard
                                key={style.id}
                                text={style.text}
                                subtext={style.subtext}
                                variant={style.variant}
                                active={style.active}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )

}