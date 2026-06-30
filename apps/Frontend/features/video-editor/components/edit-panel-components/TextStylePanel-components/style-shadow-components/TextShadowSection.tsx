"use client";

import React, { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import TextShadowHeader from "./text-shadow-header";
import TextShadowPresets from "./text-shadow-presets";
import TextShadowColor from "./text-shadow-color";
import TextShadowOpacity from "./text-shadow-opacity";
import TextShadowBlur from "./text-shadow-blur";
import TextShadowDistance from "./text-shadow-distance";
import TextShadowAngle from "./text-shadow-angle";

export default function TextShadowSection() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full select-none font-sans rounded-md">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <TextShadowHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                <CollapsibleContent className="flex flex-col gap-4 pt-4">
                    <TextShadowPresets />
                    <TextShadowColor />
                    <TextShadowOpacity />
                    <TextShadowBlur />
                    <TextShadowDistance />
                    <TextShadowAngle />
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}