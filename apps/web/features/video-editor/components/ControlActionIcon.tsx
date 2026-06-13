
type ControlActionIconProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

export default function ControlActionIcon({ icon, label, active = false }: ControlActionIconProps) {
    return (
        <div className="flex flex-col items-center gap-1 cursor-pointer w-full group select-none">
            <div className={`h-10 w-10 rounded-md border flex items-center justify-center transition-all ${active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white border-[#e4e4e7] text-[#71717a] group-hover:bg-[#f4f4f5] group-hover:text-[#18181b]'}`}>
                {icon}
            </div>
            <span className="text-[9px] text-[#71717a] font-medium text-center px-1 leading-tight max-w-[64px] group-hover:text-[#18181b]">
                {label}
            </span>
        </div>
    );
}