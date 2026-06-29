"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { LoginType } from "../schema zod/loginShema"
import { toast } from "sonner"

export function useLogin() {
    const router = useRouter()

    return useMutation({
        mutationFn: async (data: LoginType) => {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                // on récupère message backend si possible
                throw new Error(result.message || "Identifiants incorrects")
            }

            return result
        },

        onSuccess: () => {
            toast.success("Connexion réussie 🎉")
            router.push("/home")
            router.refresh()
        },

        onError: (error: Error) => {
            toast.error(error.message, {
                position: "top-center",
                className: "bg-red-500 text-red",

            })
        },
    })
}