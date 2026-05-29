import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProjects } from "../../queries/projects-queries";
import { Spinner } from "@/components/ui/spinner";
import { Project } from "../../types/project-type";

type deleteProjectModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: Project;
}

export function DeleteProjectModal({ open, setOpen, project }: deleteProjectModalProps) {

    const { deleteProject, isPendingDeleteProject } = useProjects(project.id);

    function handldeDeleteProject() {
        deleteProject();
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent >

                {/* HEADER : Icône et Titre sur la même ligne, alignés à gauche */}
                <AlertDialogHeader className="flex flex-row items-center justify-start gap-3 space-y-0 text-left">
                    <AlertDialogTitle className="text-lg font-semibold">
                        Supprimer projet
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {/* BODY : La phrase descriptive */}
                <div className="text-sm text-muted-foreground text-left">
                    Etes vous sure de vouloir supprimer <span className="font-bold text-foreground">{project.name}</span> ? <span className="text-destructive">cette action est irreversible</span>
                </div>

                {/* FOOTER : Les boutons aux deux extrémités */}
                <AlertDialogFooter className="flex sm:flex-row items-center justify-between gap-2  sm:space-x-0">
                    <AlertDialogCancel variant="outline" className="cursor-pointer m-0 sm:m-0">
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handldeDeleteProject} variant="destructive" disabled={isPendingDeleteProject} className="cursor-pointer m-0 sm:m-0">
                        {isPendingDeleteProject && <Spinner />}
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}