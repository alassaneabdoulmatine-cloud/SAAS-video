"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const fontFamilies = [
    "Montserrat",
    "Anton",
    "Bebas Neue",
    "Oswald",
    "Lilita One",
    "Inter",
    "Outfit",
    "Poppins",
    "Impact",
    "Arial",
    "Open Sans",
    "Lato",
    "Roboto",
    "Raleway",
    "Source Code Pro",
    "Times New Roman",
    "Playfair Display",
    "Pacifico",
    "Lobster",
    "Kanit"
];

export default function FontFamilySection() {
    const { fontFamily, setFontFamily } = useTextStylePropertiesStore();

    // Formate le nom de la police pour l'URL de Google Fonts (ex: "Bebas Neue" -> "Bebas+Neue")
    const formattedFont = fontFamily.replace(/\s+/g, "+");
    const googleFontsLink = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

    return (
        <div className="flex items-center gap-4">
            {/* Lien dynamique pour charger la police Google Fonts sélectionnée */}
            <link rel="stylesheet" href={googleFontsLink} />
            
            <label className="w-32 shrink-0 text-sm font-medium">
                Police
            </label>

            <div className="flex-1">
                <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-full h-9 rounded-sm">
                        <SelectValue placeholder="Choisir une police" />
                    </SelectTrigger>

                    <SelectContent className="shadow-md border" position="popper">
                        <div className="p-2">
                            {fontFamilies.map((font) => {
                                const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, "+")}&display=swap`;
                                return (
                                    <SelectItem key={font} value={font} className="p-2">
                                        {/* Charge un aperçu léger pour chaque option de police */}
                                        <link rel="stylesheet" href={fontUrl} />
                                        <span style={{ fontFamily: font }}>
                                            {font}
                                        </span>
                                    </SelectItem>
                                );
                            })}
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}