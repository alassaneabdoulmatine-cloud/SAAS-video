import { MultipartUploader } from "@/lib/upload/upload";


type UploadDeps = {
    projectId: string;
    createVideo: any;
    updateVideo: any;
    onProgress?: (p: number) => void;
};

export async function uploadVideo(file: File, deps: UploadDeps) {

    // 1 - create video
    const video = await deps.createVideo({
        title: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileName: file.name,
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
        videoId: video.id,
        updateVideoData: {
            status: "UPLOADING",
            s3Key,
        },
    });

    return { video, s3Key };
}