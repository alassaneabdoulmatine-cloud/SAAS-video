"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { videoKeys } from "@/features/videos/queries/videos-querykeys";
import { Video } from "../types/video-type";
import { createVideoType } from "../shema/create-video-shema";
import { updateVideoType } from "../shema/update-video-shema";

export function useVideos(videoId?: string) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const params = useParams();

    const { workspaceId, projectId } = params as { workspaceId: string; projectId: string };

    const baseUrl = `/${workspaceId}/projects/${projectId}/videos`;



    const handleError = (error: Error) => {
        toast.error(error.message);
    };

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: videoKeys.list(workspaceId, projectId),
        });

        if (videoId) {
            queryClient.invalidateQueries({
                queryKey: videoKeys.detail(workspaceId, projectId, videoId),
            });
        }
    };

    // =========================
    // LIST
    // =========================

    const { data: videos, isLoading: videosLoading } = useQuery({
        queryKey: videoKeys.list(workspaceId, projectId),

        queryFn: async () => {
            return api<Video[]>(baseUrl);
        },

        enabled: !!workspaceId,
    });

    // =========================
    // DETAIL
    // =========================

    const { data: video, isLoading: videoLoading } = useQuery({
        queryKey: videoKeys.detail(workspaceId, projectId, videoId!),

        queryFn: async () => {
            return api<Video>(`${baseUrl}/${videoId}`);
        },

        enabled: !!workspaceId && !!projectId && !!videoId,
    });

    // =========================
    // CREATE
    // =========================

    const { mutateAsync: createVideo, isPending: isPendingCreateVideo } = useMutation({
        mutationFn: async (createVideoData: createVideoType) => {
            return api<Video>(baseUrl, {
                method: "POST",
                body: JSON.stringify(createVideoData),
            });
        },

        onSuccess: () => {
            toast.success("Vidéo créé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // UPDATE
    // =========================

    const { mutateAsync: updateVideo, isPending: isPendingUpdateVideo } = useMutation({
        mutationFn: async ({ videoId, updateVideoData }: { videoId: string, updateVideoData: updateVideoType }) => {
            return api<Video>(`${baseUrl}/${videoId}`, {
                method: "PATCH",
                body: JSON.stringify(updateVideoData),
            });
        },

        onSuccess: () => {
            toast.success("Vidéo modifié avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // DELETE
    // =========================

    const { mutateAsync: deleteVideo, isPending: isPendingDeleteVideo } = useMutation({
        mutationFn: async ({ videoId }: { videoId: string }) => {
            return api<Video>(`${baseUrl}/${videoId}`, {
                method: "DELETE",
            });
        },

        onSuccess: () => {
            toast.success("Vidéo supprimé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    return {
        videos: videos || [],
        videosLoading,

        video,
        videoLoading,

        createVideo,
        isPendingCreateVideo,

        updateVideo,
        isPendingUpdateVideo,

        deleteVideo,
        isPendingDeleteVideo,
    };
}