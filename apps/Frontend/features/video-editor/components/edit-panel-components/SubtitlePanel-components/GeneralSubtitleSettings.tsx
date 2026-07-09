"use client";

import WordsPerLineSection from "./general-settings-components/words-per-line-section";
import PositionSection from "./general-settings-components/position-section";
import AutoEmojiSection from "./general-settings-components/auto-emoji-section";
import KeywordHighlightSection from "./general-settings-components/keyword-highlight-section";
import StyleColorsSection from "./general-settings-components/style-colors-section";
import PunctuationSection from "./general-settings-components/punctuation-section";
import BreakLinesSection from "./general-settings-components/break-lines-section";
import GapFreeSection from "./general-settings-components/gap-free-section";
import BorderRadiusSection from "./general-settings-components/border-radius-section";

export default function GeneralSubtitleSettings() {
    return (
        <div className="w-full space-y-6 select-none font-sans rounded-lg">
            <WordsPerLineSection />
            <PositionSection />
            {/* <AutoEmojiSection /> */}
            {/* <KeywordHighlightSection /> */}
            <StyleColorsSection />
            <PunctuationSection />
            {/* <BreakLinesSection /> */}
            {/* <GapFreeSection /> */}
            <BorderRadiusSection />
        </div>
    );
}
