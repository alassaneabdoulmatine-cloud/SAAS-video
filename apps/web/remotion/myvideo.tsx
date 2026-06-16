import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from "remotion";

export const MyVideo = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const startFrame = 15;

    const scale = spring({
        frame: frame - startFrame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 10
    });

    return (
        <AbsoluteFill>
            <Video src={staticFile("/Top 5 languages (1).mp4")} className="w-full h-full object-contain" />
        </AbsoluteFill>
    );
};