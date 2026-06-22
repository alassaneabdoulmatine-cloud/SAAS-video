import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";
import { applyHighlight } from "./styles";

export default function animation2(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={applyHighlight} />;
}
