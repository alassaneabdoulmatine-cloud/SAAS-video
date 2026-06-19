import { useContext } from "react";
import { VideoEditorContext } from "../context/VideoEditorContext";

export function useVideoEditor() {
    const context = useContext(VideoEditorContext);
    if (!context) throw new Error("useVideoEditor doit être utilisé dans un VideoEditorProvider");
    return context;
}
