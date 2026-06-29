import { MultipartUploader } from "@/lib/upload/upload";
import { formatVideoDuration, readVideoMetadata } from "@/lib/utils";


type UploadDeps = {
    projectId: string;
    createVideo: any;
    updateVideo: any;
    onProgress?: (p: number) => void;
};

export async function uploadVideo(file: File, deps: UploadDeps) {


    // 0- extract duration
    const duration = await readVideoMetadata(file);

    const formattedduration = formatVideoDuration(duration);

    console.log(formattedduration, "duree formatte");

    // 1 - create video
    const videocreated = await deps.createVideo({
        title: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileName: file.name,
        duration: formattedduration,
        status: "UPLOADING",
        projectId: deps.projectId,
    });

    // 2 - upload S3
    const uploader = new MultipartUploader(file, {
        chunkSize: 10 * 1024 * 1024,
        maxConcurrent: 3,
        onProgress: deps.onProgress,
    });

    const s3Key = await uploader.upload();

    // 3 - update video
    await deps.updateVideo({
        videoId: videocreated.id,
        updateVideoData: {
            status: "PROCESSING",
            s3Key,
        },
    });

    return { videocreated, s3Key };
}