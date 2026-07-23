import { Button } from "@/components/ui/button";
import { ChevronLeft, Scissors, Type, Zap } from "lucide-react";

export default function EditTopBar() {
    return (
        <header className="h-14 border-b border-[#e4e4e7] flex items-center justify-between px-6 bg-white z-50">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2 text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] rounded-md h-8 text-xs font-medium">
                    <ChevronLeft className="h-4 w-4" /> Leave
                </Button>
            </div>

            {/* Onglets de navigation centrale épurés */}
            {/* <nav className="flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-md border border-[#e4e4e7]">
                <button className="text-xs font-medium text-[#71717a] flex items-center gap-1.5 px-3 py-1.5 rounded-sm hover:text-[#18181b] transition-colors">
                    <Scissors className="h-3.5 w-3.5" /> Crop & Edit
                </button>
                <button className="text-xs font-semibold bg-white text-[#18181b] flex items-center gap-1.5 px-3 py-1.5 rounded-sm shadow-sm border border-[#e4e4e7]/60">
                    <Type className="h-3.5 w-3.5 text-primary" /> Captions
                </button>
                <button className="text-xs font-medium text-[#71717a] flex items-center gap-1.5 px-3 py-1.5 rounded-sm hover:text-[#18181b] transition-colors">
                    <Zap className="h-3.5 w-3.5" /> B-Rolls & Elements
                </button>
                <button className="text-xs font-medium text-[#71717a] flex items-center gap-1.5 px-3 py-1.5 rounded-sm hover:text-[#18181b] transition-colors relative">
                    Traduction auto
                    <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                </button>
            </nav> */}

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-[#71717a] hover:text-[#18181b] text-xs font-medium h-8">Templates</Button>
                <Button size="sm" className="bg-primary text-primary-foreground font-semibold rounded-md px-4 h-8 text-xs hover:opacity-95 shadow-sm transition-all">
                    Finish video
                </Button>
            </div>
        </header>
    )
}