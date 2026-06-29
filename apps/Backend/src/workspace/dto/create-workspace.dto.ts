import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateWorkspaceDto implements Prisma.WorkspaceCreateInput {
    @IsString({ message: "nom doit etre une chaine de caractere" })
    @MinLength(3, { message: "nom doit contenir au moins 3 caracteres" })
    @IsNotEmpty({ message: "nom est requis" })
    name: string;
}
