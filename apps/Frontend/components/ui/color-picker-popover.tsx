// "use client";

// import * as React from "react";
// import { RgbaColorPicker } from "react-colorful";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

// // Palette de presets (Ronds)
// const PRESET_COLORS = [
//     "#FFC0CB", "#FFD700", "#FFFF00", "#ADFF2F", "#00FFFF", "#E6E6FA", "#FFB6C1",
//     "#FFA07A", "#F4A460", "#F0E68C", "#90EE90", "#20B2AA", "#87CEFA", "#DA70D6",
//     "#F08080", "#FF8C00", "#FFD700", "#7FFF00", "#00FA9A", "#00BFFF", "#BA55D3",
//     "#FF4500", "#FF7F50", "#FF8C00", "#32CD32", "#3CB371", "#1E90FF", "#9370DB",
//     "#FF0000", "#FF4500", "#FFA500", "#00FF00", "#00CECB", "#0000FF", "#FF00FF"
// ];

// // Utilitaires de conversion Hex <-> RGBA
// const hexToRgba = (hex: string) => {
//     let c = hex.replace("#", "");
//     if (c.length === 3) c = c.split("").map(x => x + x).join("");
//     const num = parseInt(c, 16) || 0;
//     return {
//         r: (num >> 16) & 255,
//         g: (num >> 8) & 255,
//         b: num & 255,
//         a: 1
//     };
// };

// const rgbaToHex = (r: number, g: number, b: number) => {
//     return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
// };

// type ColorPickerPopoverProps = {
//     color: string;
//     onChange: (color: string) => void;
//     className?: string;
// };

// export function ColorPickerPopover({ color, onChange, className }: ColorPickerPopoverProps) {
//     const rgbaValue = React.useMemo(() => hexToRgba(color), [color]);

//     const handleRgbaChange = (newRgba: { r: number; g: number; b: number; a: number }) => {
//         const hex = rgbaToHex(newRgba.r, newRgba.g, newRgba.b);
//         onChange(hex);
//     };

//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <div
//                     className={cn(
//                         "w-5 h-5 rounded-sm cursor-pointer border border-border transition-transform hover:scale-110",
//                         className
//                     )}
//                     style={{ backgroundColor: color }}
//                     title={color}
//                 />
//             </PopoverTrigger>

//             {/* Popover adaptatif basé sur tes variables de thème */}
//             <PopoverContent className="w-[280px] bg-popover border-border p-3.5 text-popover-foreground select-none shadow-xl rounded-md">
//                 <div className="space-y-4">

//                     {/* 1. Grille des Presets */}
//                     <div className="grid grid-cols-7 gap-1.5 justify-items-center">
//                         {PRESET_COLORS.map((preset) => (
//                             <button
//                                 key={preset}
//                                 type="button"
//                                 className={cn(
//                                     "w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none border border-border/20",
//                                     color.toLowerCase() === preset.toLowerCase() && "ring-2 ring-ring scale-105"
//                                 )}
//                                 style={{ backgroundColor: preset }}
//                                 onClick={() => onChange(preset)}
//                             />
//                         ))}
//                     </div>

//                     <div className="h-px bg-border" />

//                     {/* 2. Zone Canvas et Sliders tactiles */}
//                     <div className="custom-color-picker">
//                         <RgbaColorPicker color={rgbaValue} onChange={handleRgbaChange} className="w-full! h-28!" />
//                     </div>

//                     {/* 3. Inputs RGB / Hex (Utilise ton style d'input global) */}
//                     <div className="grid grid-cols-5 gap-1 text-center">
//                         {/* Hex */}
//                         <div>
//                             <Input
//                                 type="text"
//                                 value={color.replace("#", "")}
//                                 onChange={(e) => onChange(`#${e.target.value}`)}
//                                 className="h-7 px-1 bg-muted border-none text-foreground text-center font-mono text-[11px] focus-visible:ring-1 focus-visible:ring-ring"
//                             />
//                             <span className="text-[9px] text-muted-foreground font-medium block mt-1">Hex</span>
//                         </div>

//                         {/* R */}
//                         <div>
//                             <Input
//                                 type="text"
//                                 value={rgbaValue.r}
//                                 disabled
//                                 className="h-7 px-1 bg-muted/60 border-none text-muted-foreground text-center font-mono text-[11px]"
//                             />
//                             <span className="text-[9px] text-muted-foreground font-medium block mt-1">R</span>
//                         </div>

//                         {/* G */}
//                         <div>
//                             <Input
//                                 type="text"
//                                 value={rgbaValue.g}
//                                 disabled
//                                 className="h-7 px-1 bg-muted/60 border-none text-muted-foreground text-center font-mono text-[11px]"
//                             />
//                             <span className="text-[9px] text-muted-foreground font-medium block mt-1">G</span>
//                         </div>

//                         {/* B */}
//                         <div>
//                             <Input
//                                 type="text"
//                                 value={rgbaValue.b}
//                                 disabled
//                                 className="h-7 px-1 bg-muted/60 border-none text-muted-foreground text-center font-mono text-[11px]"
//                             />
//                             <span className="text-[9px] text-muted-foreground font-medium block mt-1">B</span>
//                         </div>

//                         {/* A */}
//                         <div>
//                             <Input
//                                 type="text"
//                                 value={Math.round(rgbaValue.a * 100)}
//                                 disabled
//                                 className="h-7 px-1 bg-muted/60 border-none text-muted-foreground text-center font-mono text-[11px]"
//                             />
//                             <span className="text-[9px] text-muted-foreground font-medium block mt-1">A</span>
//                         </div>
//                     </div>

//                 </div>
//             </PopoverContent>
//         </Popover>
//     );
// }


"use client";

import * as React from "react";
import { RgbaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
    "#FFC0CB", "#FFD700", "#FFFF00", "#ADFF2F", "#00FFFF", "#E6E6FA", "#FFB6C1",
    "#FFA07A", "#F4A460", "#F0E68C", "#90EE90", "#20B2AA", "#87CEFA", "#DA70D6",
    "#F08080", "#FF8C00", "#FFD700", "#7FFF00", "#00FA9A", "#00BFFF", "#BA55D3",
    "#FF4500", "#FF7F50", "#FF8C00", "#32CD32", "#3CB371", "#1E90FF", "#9370DB",
    "#FF0000", "#FF4500", "#FFA500", "#00FF00", "#00CECB", "#0000FF", "#FF00FF"
];

const hexToRgba = (hex: string) => {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16) || 0;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1 };
};

const rgbaToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

type ColorPickerPopoverProps = {
    color: string;
    onChange: (color: string) => void;
    variant?: "default" | "wide"; // 'default' = pastille, 'wide' = ton rectangle large
    className?: string;
};

export function ColorPickerPopover({ color, onChange, variant = "default", className }: ColorPickerPopoverProps) {
    const rgbaValue = React.useMemo(() => hexToRgba(color), [color]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                {variant === "wide" ? (
                    /* Ton design de rectangle original avec la flèche */
                    <div className={cn("relative flex items-center bg-muted rounded-sm p-1 h-8 w-28 justify-between cursor-pointer border border-border select-none", className)}>
                        <div className="w-full h-full rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-[10px] text-neutral-400 ml-2">▼</span>
                    </div>
                ) : (
                    /* La petite pastille standard pour les grilles ou listes */
                    <div
                        className={cn("w-5 h-5 rounded-sm cursor-pointer border border-border transition-transform hover:scale-110", className)}
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                )}
            </PopoverTrigger>

            <PopoverContent className="w-[280px] bg-popover border-border p-3.5 text-popover-foreground select-none shadow-xl rounded-md">
                <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                        {PRESET_COLORS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                className={cn(
                                    "w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none border border-border/20",
                                    color.toLowerCase() === preset.toLowerCase() && "ring-2 ring-ring scale-105"
                                )}
                                style={{ backgroundColor: preset }}
                                onClick={() => onChange(preset)}
                            />
                        ))}
                    </div>

                    <div className="h-px bg-border" />

                    <div className="custom-color-picker">
                        <RgbaColorPicker color={rgbaValue} onChange={(rgba) => onChange(rgbaToHex(rgba.r, rgba.g, rgba.b))} className="w-full! h-28!" />
                    </div>

                    <div className="grid grid-cols-5 gap-1 text-center">
                        <div>
                            <Input
                                type="text"
                                value={color.replace("#", "")}
                                onChange={(e) => onChange(`#${e.target.value}`)}
                                className="h-7 px-1 bg-muted border-none text-foreground text-center font-mono text-[11px] focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <span className="text-[9px] text-muted-foreground font-medium block mt-1">Hex</span>
                        </div>
                        {["R", "G", "B", "A"].map((label, i) => (
                            <div key={label}>
                                <Input
                                    type="text"
                                    value={i === 0 ? rgbaValue.r : i === 1 ? rgbaValue.g : i === 2 ? rgbaValue.b : Math.round(rgbaValue.a * 100)}
                                    disabled
                                    className="h-7 px-1 bg-muted/60 border-none text-muted-foreground text-center font-mono text-[11px]"
                                />
                                <span className="text-[9px] text-muted-foreground font-medium block mt-1">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}