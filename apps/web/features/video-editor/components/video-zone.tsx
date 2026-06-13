"use client";

import { useState } from "react";

export default function VideoPlayerPanel() {
    // Optionnel : Tu peux basculer entre "9/16" (Short) ou "16/9" (Classique) via un état
    const [isShort, setIsShort] = useState(true);

    return (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4 min-h-0 min-w-0">
            {/* 📦 Le conteneur de la vidéo qui impose le ratio */}
            <div className={`
          max-w-full max-h-full bg-foreground
          ${isShort ? "aspect-9/16" : "aspect-video"}
        `}>
                <video
                    src="/Top 5 languages (1).mp4"
                    controls
                    className="w-full h-full "
                />
            </div>
        </div>
    );
}