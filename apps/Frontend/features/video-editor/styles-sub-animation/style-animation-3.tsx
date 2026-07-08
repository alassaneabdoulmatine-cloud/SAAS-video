import { AnimationProps } from "../types/animation-props-type";
import FullTextSubtitleEngine from "./share-component/FullTextSubtitleEngine";

export default function animation3(props: AnimationProps) {
    return <FullTextSubtitleEngine {...props} splitLines={true} />;
}


