export type Video = {
    id: string
    title: string
    description: string | null
    s3Key?: string
    fileName?: string
    fileSize?: number
    mimeType?: string
    status?: string
    duration?: string
    thumbnail?: string
    projectId: string
    createdAt: string
    updatedAt: string
}
