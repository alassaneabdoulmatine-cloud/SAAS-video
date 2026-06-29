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
    "Impact",
    "Arial",
    "Open Sans",
    "Lato",
    "Roboto",
    "Poppins",
    "Raleway",
    "Source Code Pro",
    "Times New Roman",
];

export default function FontFamilySection() {
    const { fontFamily, setFontFamily } = useTextStylePropertiesStore()

    return (
        <div className="flex items-center gap-4">
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
                            {fontFamilies.map((font) => (
                                <SelectItem key={font} value={font} className=" p-2">
                                    <span style={{ fontFamily: font }}>
                                        {font}
                                    </span>
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}