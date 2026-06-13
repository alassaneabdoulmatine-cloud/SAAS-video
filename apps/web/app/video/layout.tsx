"use client";

import EditHeaderBar from "@/features/video-editor/components/editheaderbar";
import EditSidebar from "@/features/video-editor/components/editSidebar";
import StyleSidebar from "@/features/video-editor/components/style-sidbar";

export default function VideoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-dvh w-screen overflow-hidden flex flex-col bg-background text-foreground">
            <EditHeaderBar />
            <div className="flex flex-1 min-h-0 w-full">
                <EditSidebar />
                <StyleSidebar />
                <div className="flex-1 min-h-0 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}