

import { styles } from "../styles-sub-animation/data/styles-data";
import StyleVariantCard from "./style-variant-card";


export default function StyleVariantsSidebar() {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 CustomScrollbar">
            <div>
                <div className="grid grid-cols-3 gap-3">
                    {styles.map((style) => (
                        <StyleVariantCard
                            key={style.id}
                            text={style.text}
                            variant={style.variant}
                            combineTokensWithinMilliseconds={style.combineTokensWithinMilliseconds}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}