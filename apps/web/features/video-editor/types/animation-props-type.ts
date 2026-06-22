import { TikTokPage, TikTokToken } from "@remotion/captions";

export type AnimationProps = {
    currentToken: TikTokToken | undefined;
    currentWords: TikTokPage | undefined;
    fps: number;
    frame: number;
    currentMs: number;

}