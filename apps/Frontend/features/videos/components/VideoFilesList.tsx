import { Video } from "../types/video-type";
import VideoFilesHeader from "./video-files-header";
import VideosFilesCard from "./videos-files-card";

type VideoFilesListProps = {
    videos: Video[];
    projectId: string;
};

export default function VideoFilesList({ videos, projectId }: VideoFilesListProps) {

    return (
        <div className="flex w-full h-full flex-col gap-12">
            <div className="h-12">
                <VideoFilesHeader projectId={projectId} />
            </div>

            {/* BOUCLE SUR LES VIDÉOS EXISTANTES */}
            <div className="grid grid-cols-5 gap-5 w-full">{videos.map((video) => (
                <VideosFilesCard key={video.id} video={video} />
            ))}</div>

        </div>
    );
}