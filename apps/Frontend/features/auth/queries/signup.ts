"use client"

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignupType } from "../schema zod/signupShema";

export function useSignup() {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: SignupType) => {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("L'inscription a échoué. Cet email est peut-être déjà utilisé.");
            }
            return response.json();
        },
        onSuccess: () => {
            router.push("/home");
            router.refresh();
        },
    });
}
