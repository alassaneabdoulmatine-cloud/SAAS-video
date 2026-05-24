import ControlActionIcon from "./ControlActionIcon";
import { Eye, Clock, EyeOff, Scissors, Maximize } from "lucide-react";
export default function EditVidControleSidbar() {
    return (
        <aside className="w-[76px] border-l border-[#e4e4e7] flex flex-col items-center py-6 gap-6 bg-white">
            <ControlActionIcon icon={<Eye className="h-4 w-4" />} label="Afficher overlay" />
            <ControlActionIcon icon={<Clock className="h-4 w-4" />} label="Playback speed" />
            <ControlActionIcon icon={<EyeOff className="h-4 w-4" />} label="Hide Captions" />
            <ControlActionIcon icon={<Scissors className="h-4 w-4" />} label="Cut silent parts" active />
            <ControlActionIcon icon={<Maximize className="h-4 w-4" />} label="Zoom" />
        </aside>
    )
}