"use client";

import animation1 from "../styles-sub-animation/style-animation-1";
import animation2 from "../styles-sub-animation/style-animation-2";
import StyleVariantCard from "./style-variant-card";

const styles = [
    {
        id: 1,
        text: "animation1",
        variant: animation1,
    },
    {
        id: 2,
        text: "animation2",
        variant: animation2,
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )

}