import FontFamilySection from "./font-family-section";
import FontSizeSection from "./font-size-section";
import FontCasseSection from "./font-casse-section";
import FontColorSection from "./font-color-section";
import CharacterLineSection from "./caracter-line-section";
import AlignementSection from "./font-alignement-section";
import FontMotifSection from "./font-motif-section";

export default function TextStylePanel() {

    return (
        <div className="w-full  space-y-6 select-none font-sans rounded-lg">
            <FontFamilySection />
            <FontSizeSection />
            <FontMotifSection />
            <FontCasseSection />
            <FontColorSection />
            <CharacterLineSection />
            <AlignementSection />
        </div>
    );
}