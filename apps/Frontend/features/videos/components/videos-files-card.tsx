
import { Video } from "../types/video-type";
import VideoFilesDropdown from "./video-files-card-dopdown";
import { Spinner } from "@/components/ui/spinner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useUploadStore } from "../store/upload-store";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type VideoFilesCardProps = {
    video: Video;
}

export default function VideosFilesCard({ video }: VideoFilesCardProps) {

    const router = useRouter();
    const params = useParams();
    const projectId = params.projectId as string;
    const workspaceId = params.workspaceId as string;

    function handleVideoClick() {
        router.push(`/${workspaceId}/project/${projectId}/videos/${video.id}`);
    }

    const { uploadProgress } = useUploadStore()

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    return (
        <>
            <div className="flex flex-col w-[272px] h-[211px]" >
                <div
                    className="w-[272px] h-[153px] border rounded-md cursor-pointer relative bg-slate-950"
                    onClick={handleVideoClick}
                >
                    <Image className="w-full h-full object-contain" src={video.thumbnail || "/image1.jpeg"} alt="" width={100} height={100} />
                    {video.status === "UPLOADING" && <div className="absolute top-2 left-2 px-1 py-0 bg-secondary rounded-sm">
                        <div className="flex w-[full] max-w-xs flex-col gap-4">
                            <Item variant="default" className="px-1 ">
                                <ItemMedia>
                                    <Spinner className="text-green-600" />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="line-clamp-1 text-green-600">televersement...</ItemTitle>
                                </ItemContent>
                                <ItemContent className="flex-none justify-end">
                                    <span className="text-sm tabular-nums text-green-600">{uploadProgress}%</span>
                                </ItemContent>
                            </Item>
                        </div>
                    </div>}
                    <div className="flex items-center justify-center absolute bottom-2 right-2 px-1 py-0 bg-secondary rounded-xs">
                        <span className="text-xs font-semibold ">{video.duration}</span>
                    </div>
                </div>
                <div className="h-[58px] py-2">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="font-medium text-[14px]">{video.title}</h3>
                        <VideoFilesDropdown video={video} />
                    </div>
                    <div>
                        <span className="text-xs text-muted-foreground">{formatDate(video.createdAt)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}