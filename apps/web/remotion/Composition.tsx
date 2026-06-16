import { AbsoluteFill, Img, Sequence } from "remotion";
import { FadeIn } from "./FadeIn";
import { MyVideo } from "./myvideo";




export const MyComposition = () => {
    return (
        <AbsoluteFill>
            <MyVideo />
        </AbsoluteFill>
    );
};