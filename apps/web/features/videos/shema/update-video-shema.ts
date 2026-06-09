import { z } from "zod";

export const updateVideoSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    s3Key: z.string().optional(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
    mimeType: z.string().optional(),
    status: z.string().optional(),
    duration: z.string().optional(),
    thumbnail: z.string().optional(),
})

export type updateVideoType = z.infer<typeof updateVideoSchema>