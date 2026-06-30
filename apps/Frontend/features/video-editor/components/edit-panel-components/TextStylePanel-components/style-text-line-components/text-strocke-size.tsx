import { Slider } from "@/components/ui/slider";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";



export default function TextStrokeSize() {
    const { strokeEnabled, strokeThickness, setStrokeThickness } = useTextStylePropertiesStore();

    function handleThicknessIncrease() {
        if (!strokeEnabled) return
        setStrokeThickness(Math.min(100, strokeThickness + 1));
    }
    function handleThicknessDecrease() {
        if (!strokeEnabled) return
        setStrokeThickness(Math.max(0, strokeThickness - 1));
    }
    return (
        <div className={`flex items-center justify-between gap-4 ${!strokeEnabled ? "opacity-50" : ""}`}>
            <label className="text-sm w-24">Épaisseur</label>
            <div className="flex-1 flex items-center gap-4">
                <Slider
                    value={[strokeThickness]}
                    onValueChange={(value) => setStrokeThickness(value[0])}
                    disabled={!strokeEnabled}
                    max={100} min={0} step={1}
                    className="flex-1 cursor-pointer"
                />
                <div className="flex items-center bg-muted rounded-sm px-2 h-8 w-16 justify-between border border-border">
                    <span className="text-sm font-mono">{strokeThickness}</span>
                    <div className="flex flex-col text-[8px] text-neutral-400 select-none">
                        <span className="cursor-pointer hover:text-primary" onClick={handleThicknessIncrease}>▲</span>
                        <span className="cursor-pointer hover:text-primary" onClick={handleThicknessDecrease}>▼</span>
                    </div>
                </div>
            </div>
        </div>
    );
}