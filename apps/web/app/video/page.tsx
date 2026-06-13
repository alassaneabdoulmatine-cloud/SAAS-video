"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Timeline from "@/features/video-editor/components/timeline"
import VideoZone from "@/features/video-editor/components/video-zone"

export default function VideoEditorStudioLight() {
    return (
        <ResizablePanelGroup
            orientation="vertical"
            className="h-full"
        >
            <ResizablePanel defaultSize="90%">
                <VideoZone />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="10%" minSize="10%" maxSize="10%">
                <Timeline />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
