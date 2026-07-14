"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { EditPanelTopBar } from "@/features/video-editor/components/edit-panel-components/edit-panel-topbar"
import ParametrePanel from "@/features/video-editor/components/parametre-panel"
import StyleVariantsSidebar from "@/features/video-editor/components/style-variants-sidbar"
import SubtitlePanel from "@/features/video-editor/components/SubtitlePanel"
import VideoZone from "@/features/video-editor/components/video-zone"
import { useLeftBarViewStore } from "@/features/video-editor/store/left-bar-view"

export default function VideoEditorStudioLight() {

    const { selectedView } = useLeftBarViewStore();

    return (

        <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[200px]  md:min-w-[450px]"
        >
            {/* style variants sidebar */}
            <ResizablePanel defaultSize="30%" minSize="25%" className="bg-muted/40">
                {selectedView === "style" && <StyleVariantsSidebar />}
                {selectedView === "subtitles" && <SubtitlePanel />}
                {selectedView === "parametre" && <ParametrePanel />}
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:border hover:border-primary" />

            {/* video zone */}
            <ResizablePanel defaultSize="40%" minSize="25%">
                <VideoZone />
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:border hover:border-primary" />

            {/* content zone */}
            <ResizablePanel defaultSize="30%" minSize="25%" className="bg-muted/40">
                <EditPanelTopBar />
                {/* <TextStylePanel /> */}
            </ResizablePanel>
        </ResizablePanelGroup>

    )
}
