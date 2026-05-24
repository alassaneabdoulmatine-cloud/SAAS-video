"use client";

import { useState } from "react";
import ModelCard from "./modelCart";

export default function ModelSubSidbar() {
    const [activeTab, setActiveTab] = useState("base");
    return (
        <aside className="w-[360px] border-r border-[#e4e4e7] flex flex-col bg-white">
            {/* Switcher d'onglets ultra clean */}
            <div className="p-4 border-b border-[#e4e4e7]">
                <div className="grid grid-cols-2 bg-[#f4f4f5] p-0.5 rounded-md border border-[#e4e4e7]/40">
                    <button
                        onClick={() => setActiveTab("base")}
                        className={`text-xs py-1.5 font-medium rounded-sm transition-all ${activeTab === "base" ? "bg-white text-[#18181b] shadow-sm font-semibold" : "text-[#71717a] hover:text-[#18181b]"}`}
                    >
                        Modèles de base
                    </button>
                    <button
                        onClick={() => setActiveTab("mes-modeles")}
                        className={`text-xs py-1.5 font-medium rounded-sm transition-all ${activeTab === "mes-modeles" ? "bg-white text-[#18181b] shadow-sm font-semibold" : "text-[#71717a] hover:text-[#18181b]"}`}
                    >
                        Mes modèles
                    </button>
                </div>
            </div>

            {/* Grille des cartes de styles de sous-titres */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 CustomScrollbar">
                <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase block mb-3">Basic & Clean</span>
                    <div className="grid grid-cols-2 gap-3">
                        <ModelCard text="Hips Don't Lie" subtext="was number one" variant="basic-white" active />
                        <ModelCard text="Hips Don't Lie" subtext="was number one" variant="basic-yellow" />
                        <ModelCard text="HIPS DON'T LIE" subtext="WAS NUMBER ONE" variant="normal-bold" />
                        <ModelCard text="HIPS DON'T LIE" subtext="WAS NUMBER ONE" variant="send-short" />
                    </div>
                </div>

                <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#a1a1aa] uppercase block mb-3">Creative Backgrounds</span>
                    <div className="grid grid-cols-2 gap-3">
                        <ModelCard text="HIPS DON'T LIE" subtext="WAS NUMBER ONE" variant="hormozi" />
                        <ModelCard text="HIPS DON'T LIE" subtext="WAS NUMBER ONE" variant="word-bg" />
                        <ModelCard text="Hips Don't Lie" subtext="was number one" variant="iman-v1" />
                        <ModelCard text="BROKE ALL" subtext="PARADIGMS" variant="mirage" />
                    </div>
                </div>
            </div>
        </aside>
    )

}