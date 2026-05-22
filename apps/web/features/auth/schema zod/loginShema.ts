import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("L'email est invalide").nonempty("L'email est requis").transform((e) => e.toLowerCase().trim()),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").nonempty("Le mot de passe est requis"),
});

export type LoginType = z.infer<typeof loginSchema>;

// import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

// export class LoginDto {
//     @IsNotEmpty({ message: "L'email est requis" })
//     @IsString({ message: "L'email doit être une chaîne de caractères" })
//     @IsEmail({}, { message: "Veuillez entrer un email valide" })
//     email: string;

//     @IsNotEmpty({ message: "Le mot de passe est requis" })
//     @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
//     @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
//     password: string;
// }
