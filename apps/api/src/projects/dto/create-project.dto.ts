import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto implements Prisma.ProjectCreateInput {

    @IsNotEmpty({ message: "Le nom est requis" })
    @IsString({ message: "Le nom doit être une chaîne de caractères" })
    @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
    @MaxLength(50, { message: "Le nom doit contenir au plus 50 caractères" })
    name: string;

    @IsOptional()
    @IsString({ message: "L'id de l'espace de travail doit être une chaîne de caractères" })
    workspace: Prisma.WorkspaceCreateNestedOneWithoutProjectsInput;

}
