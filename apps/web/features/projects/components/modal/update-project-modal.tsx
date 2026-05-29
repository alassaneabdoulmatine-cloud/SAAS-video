"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Field, FieldError } from "@/components/ui/field";
import { useProjects } from "../../queries/projects-queries";
import { Spinner } from "@/components/ui/spinner";
import { updateProjectSchema, UpdateProjectType } from "../../shema/update-project-schema";
import { Project } from "../../types/project-type";

interface CreateProjectModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: Project;

}

export default function UpdateProjectModal({ project, open, setOpen }: CreateProjectModalProps) {

    // 1. Initialisation du formulaire avec React Hook Form & Zod
    const form = useForm<UpdateProjectType>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            name: project.name, // Nettoyé pour démarrer à vide

        },
    });

    const { updateProject, isPendingUpdateProject } = useProjects(project.id);

    // 2. Gestion de la soumission
    async function onSubmit(data: UpdateProjectType) {
        await updateProject(data.name);
        form.reset();
        setOpen(false);
    }

    function handleCancel() {
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] px-6 py-6 ">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">
                        Créer un nouveau projet
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Donnez un nom à votre projet pour commencer à organiser vos vidéos
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Entrer le nom du projet"
                                        autoComplete="off"
                                        disabled={isPendingUpdateProject}
                                        className="h-10 px-4 focus-visible:ring-0 focus-visible:border-primary focus-visible:border-1 transition-all text-base"
                                    />
                                    {fieldState.invalid && fieldState.error?.message && (
                                        <FieldError className="text-sm font-medium text-red-500 mt-2">
                                            {fieldState.error.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="flex  sm:flex-row sm:justify-between  pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPendingUpdateProject}
                            onClick={handleCancel}
                            className="cursor-pointer"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPendingUpdateProject}
                            className="cursor-pointer min-w-[100px]"
                        >
                            {isPendingUpdateProject && <Spinner />}
                            Modifier
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}