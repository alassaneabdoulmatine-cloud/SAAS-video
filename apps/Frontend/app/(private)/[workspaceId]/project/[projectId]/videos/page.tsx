"use client"

import { useState } from "react";
import {
    Plus,
    ArrowLeft,
    SlidersHorizontal,

} from "lucide-react";
import { Button } from "@/components/ui/button";

import VideoFilesList from "../../../../../../features/videos/components/VideoFilesList";
import EmptyProjectState from "../../../../../../features/videos/components/EmptyProjectState";
import { useParams, usePathname } from "next/navigation";
import { useVideos } from "@/features/videos/queries/videos-queries";

export default function ProjectDetailsPage() {
    // Bascule cet état à "false" pour tester l'état Empty (sans vidéo)
    const { videos, videosLoading } = useVideos()
    const params = useParams()
    const { projectId } = params as { workspaceId: string; projectId: string };

    if (videosLoading) return <div>Loading...</div>
    return (
        <div className="min-h-screen text-foreground bg-background">


            {videos.length > 0 ? (
                <VideoFilesList videos={videos} projectId={projectId} />
            ) : (
                <EmptyProjectState projectId={projectId} />
            )}

        </div>
    );
}

