"use client";

import EditTopBar from "@/features/video-editor/components/edit-Topbar";
import EditSidebar from "@/features/video-editor/components/edit-sidebar";
import StyleVariantsSidebar from "@/features/video-editor/components/style-variants-sidbar";
import { VideoEditorProvider } from "@/features/video-editor/context/VideoEditorContext";

export default function VideoLayout({ children }: { children: React.ReactNode }) {
    return (
        <VideoEditorProvider>
            <div className="h-dvh w-screen overflow-hidden flex flex-col bg-background text-foreground">
                <div className="flex flex-1 min-h-0 min-w-0">
                    <EditSidebar />
                    <div className="flex-1 min-h-0 min-w-0">
                        {children}
                    </div>
                </div>

            </div>
        </VideoEditorProvider>
    );
}