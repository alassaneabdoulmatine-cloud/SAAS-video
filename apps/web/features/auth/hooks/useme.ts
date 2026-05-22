"use client";

import { useQuery } from "@tanstack/react-query";

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3001/auth/profile", {
                credentials: "include",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Not authenticated");
            }

            const data = await res.json();
            return data;
        },
        retry: false,
    });
}