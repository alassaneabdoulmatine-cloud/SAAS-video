"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RotateCcw } from "lucide-react";

const PRESETS = {
    legere: { color: "#000000", opacity: 40, blur: 10, distance: 3, angle: -45 },
    moyenne: { color: "#000000", opacity: 70, blur: 15, distance: 5, angle: -45 },
    prononcee: { color: "#000000", opacity: 95, blur: 25, distance: 10, angle: -45 },
};

export default function TextShadowSection() {
    const [isOpen, setIsOpen] = useState(true);
    const [activePreset, setActivePreset] = useState<string | null>("moyenne");
    const [color, setColor] = useState("#000000");
    const [opacity, setOpacity] = useState([90]);
    const [blur, setBlur] = useState([15]);
    const [distance, setDistance] = useState([5]);
    const [angle, setAngle] = useState([-45]);

    const handleCheckboxChange = (checked: boolean) => {
        setIsOpen(checked);
    };

    const handlePresetChange = (presetName: string) => {
        if (!presetName) return;
        setActivePreset(presetName);
        const preset = PRESETS[presetName as keyof typeof PRESETS];
        setColor(preset.color);
        setOpacity([preset.opacity]);
        setBlur([preset.blur]);
        setDistance([preset.distance]);
        setAngle([preset.angle]);
    };

    const handleManualAdjust = (type: string, value: number[]) => {
        setActivePreset("custom");
        if (type === "opacity") setOpacity(value);
        if (type === "blur") setBlur(value);
        if (type === "distance") setDistance(value);
        if (type === "angle") setAngle(value);
    };

    const handleReset = () => {
        handlePresetChange("moyenne");
    };

    return (
        <div className="w-full max-w-xl bg-[#1e1e1e] text-[#d4d4d4] p-4 select-none font-sans rounded-md border border-neutral-800">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">

                {/* EN-TÊTE DU COLLAPSIBLE */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="shadow-toggle"
                            checked={isOpen}
                            onCheckedChange={handleCheckboxChange}
                            className="border-neutral-500 data-[state=checked]:bg-[#00b4d8] data-[state=checked]:border-[#00b4d8]"
                        />
                        <CollapsibleTrigger asChild>
                            <label
                                htmlFor="shadow-toggle"
                                className="text-sm font-semibold text-white cursor-pointer flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
                            >
                                Ombre
                                <span className={`text-[10px] text-neutral-500 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}>
                                    ▲
                                </span>
                            </label>
                        </CollapsibleTrigger>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-500">
                        <RotateCcw className="h-4 w-4 cursor-pointer hover:text-white transition-colors" onClick={handleReset} />
                        <span className="text-xs font-mono">⟨ ⟩</span>
                    </div>
                </div>

                {/* CONTENU DU COLLAPSIBLE */}
                <CollapsibleContent className="space-y-4 pt-2 transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">

                    {/* Styles Rapides */}
                    <div className="flex items-center justify-between gap-4 pb-2 border-b border-neutral-800/60">
                        <label className="text-xs font-medium text-neutral-400 w-24">Styles Rapides</label>
                        <div className="flex-1">
                            <ToggleGroup
                                type="single"
                                value={activePreset || ""}
                                onValueChange={handlePresetChange}
                                className="justify-start bg-[#151515] p-0.5 rounded border border-neutral-800 gap-1 w-fit"
                            >
                                <ToggleGroupItem value="legere" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Légère
                                </ToggleGroupItem>
                                <ToggleGroupItem value="moyenne" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Moyenne
                                </ToggleGroupItem>
                                <ToggleGroupItem value="prononcee" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Prononcée
                                </ToggleGroupItem>
                                {activePreset === "custom" && (
                                    <span className="text-[10px] text-[#00b4d8] px-2 italic font-medium">Réglage personnalisé</span>
                                )}
                            </ToggleGroup>
                        </div>
                    </div>

                    {/* Couleur */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Couleur</label>
                        <div className="flex-1 flex items-center justify-between">
                            <div className="relative flex items-center bg-[#2d2d2d] rounded p-1 h-8 w-28 justify-between cursor-pointer border border-neutral-700">
                                <div className="w-full h-full rounded-sm" style={{ backgroundColor: color }} />
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => { setColor(e.target.value); setActivePreset("custom"); }}
                                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                />
                                <span className="text-[10px] text-neutral-400 ml-2">▼</span>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                    {/* Opacité */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Opacité</label>
                        <div className="flex-1 flex items-center gap-4">
                            <Slider
                                value={opacity}
                                onValueChange={(v) => handleManualAdjust("opacity", v)}
                                max={100} min={0} step={1}
                                className="flex-1 cursor-pointer"
                            />
                            <div className="flex items-center bg-[#2d2d2d] rounded px-2 h-8 w-20 justify-between border border-neutral-700">
                                <span className="text-white text-sm font-mono">{opacity[0]}%</span>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                    {/* Flou */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Flou</label>
                        <div className="flex-1 flex items-center gap-4">
                            <Slider
                                value={blur}
                                onValueChange={(v) => handleManualAdjust("blur", v)}
                                max={100} min={0} step={1}
                                className="flex-1 cursor-pointer"
                            />
                            <div className="flex items-center bg-[#2d2d2d] rounded px-2 h-8 w-20 justify-between border border-neutral-700">
                                <span className="text-white text-sm font-mono">{blur[0]}%</span>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Distance</label>
                        <div className="flex-1 flex items-center gap-4">
                            <Slider
                                value={distance}
                                onValueChange={(v) => handleManualAdjust("distance", v)}
                                max={50} min={0} step={1}
                                className="flex-1 cursor-pointer"
                            />
                            <div className="flex items-center bg-[#2d2d2d] rounded px-2 h-8 w-16 justify-between border border-neutral-700">
                                <span className="text-white text-sm font-mono">{distance[0]}</span>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                    {/* Angle */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Angle</label>
                        <div className="flex-1 flex items-center gap-4">
                            <Slider
                                value={angle}
                                onValueChange={(v) => handleManualAdjust("angle", v)}
                                max={180} min={-180} step={1}
                                className="flex-1 cursor-pointer"
                            />
                            <div className="flex items-center bg-[#2d2d2d] rounded px-2 h-8 w-20 justify-between border border-neutral-700">
                                <span className="text-white text-sm font-mono">{angle[0]}°</span>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}