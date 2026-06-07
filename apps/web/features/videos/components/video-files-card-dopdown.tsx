import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Video } from "../types/video-type";

type VideoFilesDropdownProps = {
    video: Video;
}
export default function VideoFilesDropdown({ video }: VideoFilesDropdownProps) {
    return (
        <div>
            <div className="relative z-40">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground group-hover:text-slate-900 rounded-md cursor-pointer transition-colors"
                        >
                            <MoreHorizontal className="h-4 w-4 stroke-[2]" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52 p-1.5 bg-popover rounded-md">
                        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                            <div className="flex items-center gap-2.5">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>Ouvrir dans l'éditeur</span>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                            <div className="flex items-center gap-2.5">
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                                <span>Renommer le fichier</span>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                            <div className="flex items-center gap-2.5">
                                <Download className="h-4 w-4 text-muted-foreground" />
                                <span>Télécharger la vidéo</span>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="my-1 bg-border/60" />

                        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors text-destructive focus:bg-destructive/10 focus:text-destructive">
                            <div className="flex items-center gap-2.5">
                                <Trash2 className="h-4 w-4" />
                                <span className="font-medium">Supprimer</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    );
}