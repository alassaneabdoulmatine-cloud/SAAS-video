'use client';
import { Layers, Music, Type } from "lucide-react";
import { useState } from "react";
const tabs = [
    {
        id: "models",
        label: "Modèles",
        icon: Type,
    },
    {
        id: "style",
        label: "Style",
        icon: Music,
    },
    {
        id: "subtitles",
        label: "Sous-titres",
        icon: Layers,
    },
]
export default function EditSidebar() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    return (
        <div className="h-full">
            <aside className="w-[76px] border-r border-[#e4e4e7] flex flex-col items-center py-4 gap-5 bg-white h-full">
                {tabs.map((tab) => (
                    <div className="flex flex-col items-center gap-1 cursor-pointer w-full px-1" key={tab.id} onClick={() => setActiveTab(tab.id)}>
                        <div className={`p-2 rounded-md flex items-center justify-center ${activeTab === tab.id ? 'bg-primary' : 'hover:bg-secondary'}`}>
                            <tab.icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
                    </div>
                ))}
            </aside>
        </div>
    )
}