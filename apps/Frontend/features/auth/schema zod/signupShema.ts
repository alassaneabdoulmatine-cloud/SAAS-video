import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "Le nom doit contenir au moins 3 caractères").max(50, "Le nom doit contenir au plus 50 caractères").optional(),
    email: z.email("L'email est invalide").nonempty("L'email est requis").transform((e) => e.toLowerCase().trim()),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").nonempty("Le mot de passe est requis"),
    confirmPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").nonempty("Le mot de passe est requis"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type SignupType = z.infer<typeof signupSchema>;

// import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, MaxLength } from "class-validator";

// export class RegisterDto {

//     @IsOptional()
//     @IsString({ message: "Le nom doit être une chaîne de caractères" })
//     @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
//     @MaxLength(50, { message: "Le nom doit contenir au plus 50 caractères" })
//     name?: string;

//     @IsNotEmpty({ message: "L'email est requis" })
//     @IsEmail({}, { message: "Veuillez entrer un email valide" })
//     email: string;

//     @IsNotEmpty({ message: "Le mot de passe est requis" })
//     @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
//     @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
//     password: string;

// }
