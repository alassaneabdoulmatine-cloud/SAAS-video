"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RotateCcw } from "lucide-react";

const STROKE_PRESETS = {
    discret: { color: "#000000", thickness: 20 },
    moyen: { color: "#000000", thickness: 45 },
    epais: { color: "#000000", thickness: 80 },
};

export default function TextStrokeSection() {
    const [isOpen, setIsOpen] = useState(true);
    const [activePreset, setActivePreset] = useState<string | null>("moyen");
    const [color, setColor] = useState("#000000");
    const [thickness, setThickness] = useState([45]);

    const handleCheckboxChange = (checked: boolean) => {
        setIsOpen(checked);
    };

    const handlePresetChange = (presetName: string) => {
        if (!presetName) return;
        setActivePreset(presetName);
        const preset = STROKE_PRESETS[presetName as keyof typeof STROKE_PRESETS];
        setColor(preset.color);
        setThickness([preset.thickness]);
    };

    const handleManualAdjust = (value: number[]) => {
        setActivePreset("custom");
        setThickness(value);
    };

    const handleReset = () => {
        handlePresetChange("moyen");
    };

    return (
        <div className="w-full max-w-xl bg-[#1e1e1e] text-[#d4d4d4] p-4 select-none font-sans rounded-md border border-neutral-800">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">

                {/* EN-TÊTE DU COLLAPSIBLE */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="stroke-toggle"
                            onCheckedChange={handleCheckboxChange}
                            className="border-neutral-500 data-[state=checked]:bg-[#00b4d8] data-[state=checked]:border-[#00b4d8]"
                        />
                        {/* Le trigger ouvre/ferme aussi en cliquant sur le titre */}
                        <CollapsibleTrigger asChild>
                            <label
                                htmlFor="stroke-toggle"
                                className="text-sm font-semibold text-white cursor-pointer flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
                            >
                                Trait
                                <span className={`text-[10px] text-neutral-500 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}>
                                    ▲
                                </span>
                            </label>
                        </CollapsibleTrigger>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-500">
                        <RotateCcw
                            className="h-4 w-4 cursor-pointer hover:text-white transition-colors"
                            onClick={handleReset}
                        />
                        <span className="text-xs font-mono">⟨ ⟩</span>
                    </div>
                </div>

                {/* CONTENU DU COLLAPSIBLE (S'OUVRE ET SE FERME EN GLISSANT) */}
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
                                <ToggleGroupItem value="discret" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Discret
                                </ToggleGroupItem>
                                <ToggleGroupItem value="moyen" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Moyen
                                </ToggleGroupItem>
                                <ToggleGroupItem value="epais" className="text-xs h-7 px-3 data-[state=on]:bg-[#2d2d2d] data-[state=on]:text-white">
                                    Épais
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

                    {/* Épaisseur */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-sm text-neutral-400 w-24">Épaisseur</label>
                        <div className="flex-1 flex items-center gap-4">
                            <Slider
                                value={thickness}
                                onValueChange={handleManualAdjust}
                                max={100} min={0} step={1}
                                className="flex-1 cursor-pointer"
                            />
                            <div className="flex items-center bg-[#2d2d2d] rounded px-2 h-8 w-16 justify-between border border-neutral-700">
                                <span className="text-white text-sm font-mono">{thickness[0]}</span>
                                <div className="flex flex-col text-[8px] text-neutral-400 select-none">
                                    <span className="cursor-pointer hover:text-white" onClick={() => handleManualAdjust([Math.min(100, thickness[0] + 1)])}>▲</span>
                                    <span className="cursor-pointer hover:text-white" onClick={() => handleManualAdjust([Math.max(0, thickness[0] - 1)])}>▼</span>
                                </div>
                            </div>
                            <span className="text-xs text-neutral-600 font-mono">⟨ ⟩</span>
                        </div>
                    </div>

                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}