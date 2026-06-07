"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useVideos } from "../queries/videos-queries";
import { uploadVideo } from "../services/video-upload-service";
import { useUploadStore } from "../store/upload-store";

type props = {
    projectId: string;
}

export default function VideoFilesHeader({ projectId }: props) {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const { createVideo, updateVideo } = useVideos()
    const { setUploadProgress } = useUploadStore();

    function handleFileSelect() {
        if (!inputFileRef.current) return;

        inputFileRef.current.click();
    }

    const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {

            await uploadVideo(file, {
                projectId,
                createVideo,
                updateVideo,
                onProgress: setUploadProgress,
            });
        }
    }, [createVideo, updateVideo, projectId]);

    return (
        <div>

            {/* ================= HEADER DU PROJET ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Untitled Project
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Espace de travail : <span className="text-foreground font-medium">Matinou's Workspace</span>
                    </p>
                </div>

                {/* Actions du header visibles uniquement s'il y a des vidéos */}

                <div className="flex items-center gap-3">
                    {/* <Button variant="outline" size="sm" className="h-9 gap-2 cursor-pointer">
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Filtrer
                    </Button> */}
                    <Button onClick={handleFileSelect} size="sm" className="h-9 bg-primary text-primary-foreground hover:opacity-95 font-semibold gap-2 px-4 transition-all cursor-pointer">
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                        Importer une vidéo
                    </Button>
                </div>

            </div >
            {/* input for upload file hidden*/}
            <input ref={inputFileRef} onChange={handleFileChange} type="file" accept="video/mp4" className="hidden" />
        </div>
    )
}