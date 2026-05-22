"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function uselogout() {
    const router = useRouter();
    return useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:3001/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Le logout a échoué.");
            }
            return response.json();
        },
        onSuccess: () => {
            router.push("/login");
            router.refresh();
        },
    });
}