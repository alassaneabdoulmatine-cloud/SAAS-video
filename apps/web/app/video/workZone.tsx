import { RotateCcw, Maximize, Volume2, Smartphone, Play } from "lucide-react";

export default function WorkZone() {
    return (
        <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 bg-[#f4f4f5] relative flex flex-col items-center justify-center p-6">

                {/* Cadre vidéo format smartphone 9:16 flottant */}
                <div className="relative h-[calc(100vh-180px)] aspect-[9/16] bg-[#e4e4e7] rounded-xl shadow-xl overflow-hidden border border-[#e4e4e7] transition-all bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800')` }}>

                    {/* Overlay assombrissant subtil pour détacher le texte */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />

                    {/* Éléments de statut en haut de l'écran */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 text-[10px] font-medium text-white backdrop-blur-md">
                            <Smartphone className="h-3 w-3" /> 9:16
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-white bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                            00:01:23
                        </span>
                    </div>

                    {/* Rendu des sous-titres stylisés réels au milieu/bas de l'écran */}
                    <div className="absolute inset-x-0 bottom-[25%] flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                        <span className="bg-black text-white text-xl font-black uppercase tracking-tighter px-3 py-1 rounded-md shadow-lg italic">
                            I remember
                        </span>
                        <span className="text-white text-sm font-semibold tracking-wide mt-1 drop-shadow-md">
                            Donnie Eisner
                        </span>
                    </div>
                </div>

                {/* Player Controller Barre Flottante Basse */}
                <div className="mt-4 flex items-center justify-between w-full max-w-lg bg-white border border-[#e4e4e7] rounded-full px-5 py-2.5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button className="p-1.5 rounded-full text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#18181b] transition-colors">
                            <RotateCcw className="h-4 w-4" />
                        </button>
                        <span className="text-xs font-mono font-medium text-[#71717a]">01:00,45 / 01:32,00</span>
                    </div>

                    <button className="h-9 w-9 rounded-full bg-[#18181b] text-white flex items-center justify-center hover:bg-black transition-transform active:scale-95 shadow-md">
                        <Play className="h-4 w-4 fill-current translate-x-0.5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <button className="p-1.5 rounded-full text-[#71717a] hover:bg-[#f4f4f5] transition-colors">
                            <Volume2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-full text-[#71717a] hover:bg-[#f4f4f5] transition-colors">
                            <Maximize className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </main>

        </div>
    )
}