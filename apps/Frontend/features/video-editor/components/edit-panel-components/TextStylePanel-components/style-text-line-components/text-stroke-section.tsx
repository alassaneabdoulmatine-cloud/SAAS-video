"use client";

import React, { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import TextStrokeHeader from "./text-strocke-header";
import TextStrokePresets from "./text-strocke-presets";
import TextStrokeColor from "./text-strocke-color";
import TextStrokeSize from "./text-strocke-size";


export default function TextStrokeSection() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full select-none font-sans rounded-md">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">

                <TextStrokeHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                <CollapsibleContent className="flex flex-col gap-4 pt-4">

                    <TextStrokePresets />

                    <TextStrokeColor />

                    <TextStrokeSize />

                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}