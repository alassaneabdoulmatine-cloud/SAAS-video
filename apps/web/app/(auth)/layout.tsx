"use client";

import { useMe } from "@/features/auth/hooks/useme";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data, isLoading, error } = useMe();

    if (isLoading) return null;

    if (data) {
        redirect("/home");
    }

    return (
        <div>
            {children}
        </div>
    )
}