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
import { Spinner } from "@/components/ui/spinner";
import { useVideos } from "../../queries/videos-queries";
import { updateVideoSchema, updateVideoType } from "../../shema/update-video-shema";
import { Video } from "../../types/video-type";

interface UpdateVideoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    video: Video;

}

export default function UpdateVideoModal({ video, open, setOpen }: UpdateVideoModalProps) {

    // 1. Initialisation du formulaire avec React Hook Form & Zod
    const form = useForm<updateVideoType>({
        resolver: zodResolver(updateVideoSchema),
        defaultValues: {
            title: video.title,

        },
    });

    const { updateVideo, isPendingUpdateVideo } = useVideos(video.id);

    // 2. Gestion de la soumission
    async function onSubmit(data: updateVideoType) {
        await updateVideo({ videoId: video.id, updateVideoData: { title: data.title } });
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
                        renomer la video
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Donnez un nouveau nom à votre vidéo
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Entrer le nom du projet"
                                        autoComplete="off"
                                        disabled={isPendingUpdateVideo}
                                        className="h-10 px-4 focus-visible:ring-0 focus-visible:border-primary focus-visible:border transition-all text-base"
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
                            disabled={isPendingUpdateVideo}
                            onClick={handleCancel}
                            className="cursor-pointer"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPendingUpdateVideo}
                            className="cursor-pointer min-w-[100px]"
                        >
                            {isPendingUpdateVideo && <Spinner />}
                            Modifier
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}