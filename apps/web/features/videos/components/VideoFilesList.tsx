import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Clock, Download, Eye, MoreHorizontal, Pencil, Play, Plus, Trash2 } from "lucide-react";
import { Video } from "../types/video-type";
import VideoFilesHeader from "./video-files-header";
import VideosFilesCard from "./videos-files-card";


type VideoFilesListProps = {
    videos: Video[];
    uploadProgress: number;
    setUploadProgress: (progress: number) => void;
};

export default function VideoFilesList({ videos, uploadProgress, setUploadProgress }: VideoFilesListProps) {
    return (
        <div className="flex w-full h-full flex-col gap-12">
            <div className="h-12">
                <VideoFilesHeader />
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            )}

            {/* BOUCLE SUR LES VIDÉOS EXISTANTES */}
            <div className="flex gap-5 w-full h-full">{videos.map((video) => (
                <VideosFilesCard key={video.id} video={video} />
            ))}</div>

        </div>
    );
}