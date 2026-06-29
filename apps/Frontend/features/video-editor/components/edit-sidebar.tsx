'use client';
import { Captions, Home, Palette, Settings, Type } from "lucide-react";
import { useState } from "react";
const tabs = [

    {
        id: "home",
        label: "Accueil",
        icon: Home,
    },
    {
        id: "style",
        label: "Style",
        icon: Palette,
    },
    {
        id: "subtitles",
        label: "Sous-titres",
        icon: Captions,
    },
    // {
    //     id: "text",
    //     label: "Texte",
    //     icon: Type,
    // },
    {
        id: "parametre",
        label: "Parametre",
        icon: Settings,
    }
]
export default function EditSidebar() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    return (
        <div className="h-full bg-muted/40">
            <aside className="w-[76px] border-r border-border flex flex-col items-center py-4 gap-4 h-full">
                {tabs.map((tab) => (
                    <div className="flex flex-col items-center gap-1 cursor-pointer w-full px-1" key={tab.id} onClick={() => setActiveTab(tab.id)}>
                        <div className={`p-2 rounded-md flex items-center justify-center ${activeTab === tab.id ? 'bg-primary' : 'hover:bg-[#e8e9eb]'}`}>
                            <tab.icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
                    </div>
                ))}
            </aside>
        </div>
    )
}