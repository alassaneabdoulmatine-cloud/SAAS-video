import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";
import { applyOpacityFade } from "./styles";

export default function Animation4(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={applyOpacityFade} />;
}
