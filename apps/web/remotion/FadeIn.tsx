import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FadeIn = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 60], [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                fontSize: 80,
            }}
        >
            <div style={{ opacity: opacity }}>Hello World!</div>
        </AbsoluteFill>
    );
};