import { z } from "zod";

export const updateProjectSchema = z.object({
    name: z.string().min(3, "Le nom du projet doit contenir au moins 3 caractères").max(100, "Le nom du projet ne doit pas dépasser 100 caractères"),

})

export type UpdateProjectType = z.infer<typeof updateProjectSchema>;