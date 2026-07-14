"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMe } from "@/features/auth/hooks/useme";
import { AppSidebar } from "@/features/layouts/app-sidebar";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data, isLoading, error } = useMe();

    if (isLoading) return null;

    if (error) {
        redirect("/login");
    }

    return (
        <SidebarProvider>
            <TooltipProvider>
                <AppSidebar />
                <div className="flex p-14 h-[calc(100vh-4rem)] w-full flex-col overflow-hidden">
                    {children}
                </div>
            </TooltipProvider>
        </SidebarProvider>
    )
}