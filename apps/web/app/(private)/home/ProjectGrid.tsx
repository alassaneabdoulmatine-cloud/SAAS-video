import {
    MoreHorizontal,
    Plus,
    Bell,
    Folder,
    Clock,
    SlidersHorizontal,
    Video,
    ExternalLink,
    Pencil,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const projects = [
    {
        id: 1,
        title: "Untitled Project",
        workspace: "Matinou's Workspace",
        updatedAt: "Updated 4mo ago",
    },
    {
        id: 2,
        title: "les videos",
        workspace: "Matinou's Workspace",
        updatedAt: "Updated 6mo ago",
    },
    {
        id: 3,
        title: "Matinou's First Project",
        workspace: "Matinou's Workspace",
        updatedAt: "Updated 6mo ago",
    },
    {
        id: 4,
        title: "iscom",
        workspace: "Matinou's Workspace",
        updatedAt: "Updated 2mo ago",
    },
];

export default function VideoFoldersWhite() {
    return (
        <div className="min-h-screen text-foreground">
            <div className="max-w-[1600px] mx-auto space-y-8 p-8">

                {/* ================= HEADER DE LA PAGE ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Vos projets
                            </h1>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold bg-muted border text-muted-foreground">
                                {projects.length}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Gérez et éditez vos vidéos verticales avec sous-titres IA.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="h-9 gap-2 cursor-pointer">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Filtrer
                        </Button>
                        <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:opacity-95 font-semibold gap-2 px-4 transition-all cursor-pointer">
                            <Plus className="h-4 w-4 stroke-[2.5]" />
                            Nouveau projet
                        </Button>
                    </div>
                </div>

                {/* ================= GRILLE DES PROJETS COHÉRENTE (5 COLONNES) ================= */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

                    {/* BOUCLE SUR LES PROJETS EXISTANTS */}
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative aspect-[11/12] flex flex-col rounded-md bg-card border hover:border-primary/40 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-pointer"
                        >
                            {/* Zone d'Aperçu */}
                            <div className="relative flex-1 bg-slate-950 overflow-hidden p-4 flex flex-col justify-between">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-end w-full relative z-10">
                                    <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-primary transition-colors">
                                        <Bell className="h-3.5 w-3.5" />
                                    </div>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300">
                                    <Video className="h-12 w-12 text-white stroke-[1.2]" />
                                </div>

                                <div className="relative z-10 space-y-1">
                                    <h3 className="font-medium text-[14px] leading-snug tracking-tight text-white line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-[11px] text-white/40 font-normal tracking-wide flex items-center gap-1">
                                        <Folder className="h-3 w-3 opacity-60 text-primary" />
                                        {project.workspace}
                                    </p>
                                </div>
                            </div>

                            {/* Barre du bas */}
                            <div className="h-12 border-border px-3 flex items-center justify-between bg-card relative z-30">
                                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium select-none">
                                    <Clock className="h-3 w-3 opacity-70" />
                                    {project.updatedAt}
                                </span>

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

                                        <DropdownMenuContent
                                            align="end"
                                            className="w-56 p-1.5 bg-popover rounded-md"
                                        >
                                            <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                                                <div className="flex items-center gap-2.5">
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                    <span>Ouvrir le projet</span>
                                                </div>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                                                <div className="flex items-center gap-2.5">
                                                    <Pencil className="h-4 w-4 text-muted-foreground" />
                                                    <span>Renommer</span>
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
                        </div>
                    ))}

                    {/* CARTE BOUTON "NOUVEAU PROJET" HARMONISÉE EN [11/12] */}
                    <button className="group aspect-[11/12] flex flex-col items-center justify-center rounded-md border-2 border-dashed border-border hover:border-primary/40 bg-muted/20 hover:bg-card transition-all duration-300 gap-3 cursor-pointerW w-full">
                        <div className="h-10 w-10 rounded-full bg-card border shadow-sm group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all duration-300">
                            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                            Nouveau projet
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
}