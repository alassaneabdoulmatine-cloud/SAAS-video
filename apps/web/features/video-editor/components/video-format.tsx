import { Settings } from "lucide-react";

export default function VideoFormat() {
    return (
        <div className="bg-background flex items-center justify-center gap-8 w-auto h-12 p-2 border border-border rounded-md shadow">
            <div className="font-medium text-foreground text-sm">Format</div>
            <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Settings className="w-5 h-5 text-foreground" />
                <span className="font-medium text-foreground text-sm">Paramètres</span>
            </div>
        </div>
    )
}