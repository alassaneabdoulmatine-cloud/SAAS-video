import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";
import { applyOnlyActive } from "./styles";

export default function animation1(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={applyOnlyActive} />;
}
