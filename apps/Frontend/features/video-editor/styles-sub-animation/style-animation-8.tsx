import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import FullTextSubtitleEngine from "./share-component/FullTextSubtitleEngine";

export default function Animation8(props: AnimationProps) {
    return (
        <FullTextSubtitleEngine
            {...props}
            splitLines={true}
            getStyle={({ frame, wordStartFrame, layerLength }) => {
                const fortyPercentOfLayer = layerLength * 0.4;
                const middleFrame = wordStartFrame + fortyPercentOfLayer;
                const scale = interpolate(
                    frame,
                    [wordStartFrame, middleFrame],
                    [0.95, 1.1],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );
                return {
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                };
            }}
        />
    );
}


