"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { EditPanelTopBar } from "@/features/video-editor/components/edit-panel-components/edit-panel-topbar"
import TextStylePanel from "@/features/video-editor/components/edit-panel-components/TextStylePanel-components/TextStylePanel"

import EditSidebar from "@/features/video-editor/components/edit-sidebar"
import StyleVariantsSidebar from "@/features/video-editor/components/style-variants-sidbar"
import Timeline from "@/features/video-editor/components/timeline"
import VideoZone from "@/features/video-editor/components/video-zone"

export default function VideoEditorStudioLight() {
    return (
        <ResizablePanelGroup
            orientation="vertical"
            className="h-full"
        >
            <ResizablePanel defaultSize="90%">
                <ResizablePanelGroup
                    orientation="horizontal"
                    className="min-h-[200px]  md:min-w-[450px]"
                >
                    {/* style variants sidebar */}
                    <ResizablePanel defaultSize="30%" className="bg-muted/40">
                        <StyleVariantsSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle className="hover:border hover:border-primary" />

                    {/* video zone */}
                    <ResizablePanel defaultSize="40%">
                        <VideoZone />
                    </ResizablePanel>
                    <ResizableHandle withHandle className="hover:border hover:border-primary" />

                    {/* content zone */}
                    <ResizablePanel defaultSize="30%" className="bg-muted/40">
                        <EditPanelTopBar />
                        {/* <TextStylePanel /> */}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle className="hover:border hover:border-primary" />

            {/* timeline */}
            <ResizablePanel defaultSize="10%" minSize="10%" className="bg-muted/40">
                <Timeline />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
