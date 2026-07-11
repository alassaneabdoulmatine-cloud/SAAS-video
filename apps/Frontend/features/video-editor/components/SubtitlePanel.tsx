import { Input } from "@/components/ui/input";
import { usePagesStore } from "../store/page-store";

export default function SubtitlePanel() {
    const { pagesstore, setPagesstore } = usePagesStore();

    // const updatePageText = (pageIndex: number, text: string) => {
    //     const words = text.trim().split(/\s+/);

    //     const updatedPages = pagesstore.map((page, index) => {
    //         if (index !== pageIndex) return page;

    //         const durationPerWord = page.durationMs / words.length;

    //         const newTokens = words.map((word, tokenIndex) => ({
    //             text: word,
    //             fromMs: tokenIndex * durationPerWord,
    //             toMs: (tokenIndex + 1) * durationPerWord,
    //         }));

    //         return {
    //             ...page,
    //             text,
    //             tokens: newTokens,
    //         };
    //     });

    //     setPagesstore(updatedPages);
    // };

    const updatePageText = (pageIndex: number, text: string) => {
        const words = text.trim().split(/\s+/);

        const updatedPages = pagesstore.map((page, index) => {
            if (index !== pageIndex) return page;

            // Même nombre de mots : on garde les timings
            if (words.length === page.tokens.length) {
                return {
                    ...page,
                    tokens: page.tokens.map((token, i) => ({
                        ...token,
                        text: words[i],
                    })),
                };
            }

            // Nombre de mots différent :
            // on répartit les timings uniquement sur cette page
            const pageStart = page.startMs;
            const pageEnd = page.startMs + page.durationMs;
            const durationPerWord = page.durationMs / words.length;

            const newTokens = words.map((word, i) => ({
                text: word,
                fromMs: pageStart + i * durationPerWord,
                toMs: pageStart + (i + 1) * durationPerWord,
            }));

            return {
                ...page,
                tokens: newTokens,
            };
        });

        setPagesstore(updatedPages);
    };
    console.log("pagesstore", pagesstore)

    return (
        <div className="flex-1 min-w-0 min-h-0 p-4 space-y-4">
            {pagesstore.map((page, index) => (
                <div
                    key={index}
                    className="bg-muted rounded-lg p-4"
                >
                    <Input
                        value={page.tokens.map((token) => token.text).join(" ")}
                        onChange={(e) => updatePageText(index, e.target.value)}
                        className="w-full"
                    />
                </div>
            ))}
        </div>
    );
}