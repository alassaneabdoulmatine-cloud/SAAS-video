import { Check } from "lucide-react";
import { styleComponentType } from "../types/style-component-type";
import { useStyleVariantStore } from "../store/style-variant-store";

interface StyleCardProps {
    text: string;
    variant: styleComponentType;
}

export default function StyleCard({ text, variant: VariantComponent }: StyleCardProps) {
    const { stylevariant, setvariant } = useStyleVariantStore();
    const variantActive = stylevariant === VariantComponent;
    function handleChangeStyle() {
        setvariant(VariantComponent);
    }

    return (
        <div className="relative transition-all duration-200 flex flex-col" onClick={handleChangeStyle}>
            {/* Boîte interne simulant le rendu vidéo sombre de la capture */}
            <div className={`aspect-video rounded-md bg-[#475569] flex flex-col items-center justify-center p-1 text-center cursor-pointer ${variantActive ? ' border-2 border-primary' : ''}`}>
                <span>{text}</span>
            </div>

            {/* Petite étiquette ou icône de validation */}
            {variantActive && (
                <div className="absolute top-2 right-2 h-3.5 w-3.5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                    <Check className="h-2 w-2 text-primary-foreground stroke-4" />
                </div>
            )}
        </div>
    );
}