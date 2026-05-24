import EditHeaderBar from "./editheaderbar";
import WorkZone from "./workZone";
import EditSidebar from "./editSidebar";
import EditVidControleSidbar from "./editVidControleSidbar";
import ModelSubSidbar from "./modelSubSidbar";

export default function VideoEditorStudioLight() {
    return (
        <div className="flex flex-col h-screen bg-[#fafafa] text-[#18181b] font-sans overflow-hidden antialiased">
            <EditHeaderBar />
            <div className="flex">
                <EditSidebar />
                <ModelSubSidbar />
                <WorkZone />
                <EditVidControleSidbar />
            </div>

        </div>
    );
}
