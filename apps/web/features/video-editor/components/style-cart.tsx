import { Check } from "lucide-react";

interface StyleCardProps {
    text: string;
    subtext?: string;
    variant: string
    active?: boolean;
}

export default function StyleCard({ text, subtext, variant, active = false }: StyleCardProps) {
    // Gestionnaire de styles dynamiques basés sur la capture d'écran d'origine
    const getVariantStyles = () => {
        switch (variant) {
            case "basic-white":
                return { cardBg: "bg-[#1e293b]", font: "font-sans text-white text-[10px]" };
            case "basic-yellow":
                return { cardBg: "bg-[#1e293b]", font: "font-sans text-[#facc15] text-[10px]" };
            case "normal-bold":
                return { cardBg: "bg-[#0f172a]", font: "font-black uppercase tracking-tight text-white text-[10px]" };
            case "send-short":
                return { cardBg: "bg-[#1e293b]", font: "font-black uppercase tracking-widest text-[#facc15] bg-black/40 px-1 py-0.5 rounded text-[8px]" };
            case "hormozi":
                return { cardBg: "bg-[#020617]", font: "font-black italic uppercase text-[#ef4444] text-[11px] tracking-tighter" };
            case "word-bg":
                return { cardBg: "bg-[#1e293b]", font: "font-bold uppercase text-white bg-[#ef4444] px-1 rounded text-[9px]" };
            case "iman-v1":
                return { cardBg: "bg-[#475569]", font: "font-serif text-white italic text-[11px]" };
            case "mirage":
                return { cardBg: "bg-slate-900", font: "font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-[10px]" };
            default:
                return { cardBg: "bg-slate-800", font: "text-white text-[10px]" };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className="relative transition-all duration-200 flex flex-col">
            {/* Boîte interne simulant le rendu vidéo sombre de la capture */}
            <div className={`aspect-video rounded-md bg-[#475569] flex flex-col items-center justify-center p-1 text-center cursor-pointer ${active ? ' border-2 border-primary' : ''}`}>
                <span className={`${styles.font}`}>{text}</span>
                {subtext && <span className={`${styles.font}`}>{subtext}</span>}
            </div>

            {/* Petite étiquette ou icône de validation */}
            {active && (
                <div className="absolute top-2 right-2 h-3.5 w-3.5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                    <Check className="h-2 w-2 text-primary-foreground stroke-[4]" />
                </div>
            )}
        </div>
    );
}