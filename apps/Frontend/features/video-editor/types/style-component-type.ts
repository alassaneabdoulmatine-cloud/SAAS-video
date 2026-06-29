import { TikTokPage, TikTokToken } from "@remotion/captions";

export type styleComponentType = React.ComponentType<{
    currentToken: TikTokToken | undefined;
    currentWords: TikTokPage | undefined;
    fps: number;
    frame: number;
    currentMs: number;
}>
