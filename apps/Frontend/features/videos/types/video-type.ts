export type Video = {
    id: string
    title: string
    description: string | null
    s3Key?: string
    fileName?: string
    fileSize?: number
    mimeType?: string
    status?: string
    subtitles?: JSON
    videoRawKey?: string
    videoRawUrl?: string
    thumbnailKey?: string
    thumbnailUrl?: string
    videoFinalKey?: string
    duration?: string
    thumbnail?: string
    projectId: string
    createdAt: string
    updatedAt: string
}



