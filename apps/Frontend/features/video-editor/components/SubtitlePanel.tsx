// import { Input } from "@/components/ui/input";
// import { PageCaption, usePagesStore } from "../store/page-store";
// import { useCallback } from "react";
// import { useVideoEditor } from "../hooks/use-video-editor";
// import { useVideoConfig } from "remotion";


// export default function SubtitlePanel() {
//     const { pagesstore, setPagesstore, currentPage } = usePagesStore();
//     const { playerRef } = useVideoEditor();
//     const fps = 30;

//     const updatePageText = useCallback((pageIndex: number, text: string) => {
//         const words = text.trim().split(/\s+/);

//         const updatedPages = pagesstore.map((page, index) => {
//             if (index !== pageIndex) return page;

//             // same number of words : we keep the timings
//             if (words.length === page.tokens.length) {
//                 return {
//                     ...page,
//                     tokens: page.tokens.map((token, i) => ({
//                         ...token,
//                         text: words[i],
//                     })),
//                 };
//             }

//             // different number of words :
//             // we distribute the timings only on this page
//             const pageStart = page.startMs;
//             const pageEnd = page.startMs + page.durationMs;
//             const durationPerWord = page.durationMs / words.length;

//             const newTokens = words.map((word, i) => ({
//                 text: word,
//                 fromMs: pageStart + i * durationPerWord,
//                 toMs: pageStart + (i + 1) * durationPerWord,
//             }));

//             return {
//                 ...page,
//                 tokens: newTokens,
//             };
//         });

//         setPagesstore(updatedPages);
//     }, [setPagesstore, pagesstore]);

//     function handleSeekTo(page: PageCaption) {
//         if (playerRef.current) {
//             playerRef.current.seekTo((page.startMs / 1000) * fps + 1);
//         }
//     }

//     return (
//         <div className="flex-1 min-w-0 min-h-0 p-4 space-y-4">
//             {pagesstore.map((page, index) => (
//                 <div
//                     key={index}
//                     onClick={() => handleSeekTo(page)}
//                     className={currentPage?.startMs === page.startMs && currentPage?.durationMs === page.durationMs ? "bg-muted p-4 rounded-md" : "p-4"}
//                 >
//                     <input
//                         value={page.tokens.map((token) => token.text).join(" ")}
//                         onChange={(e) => updatePageText(index, e.target.value)}
//                         className="w-full hover:border py-1 px-2 hover:border-primary rounded-md"
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// }



import { useCallback, useEffect, useRef } from "react";
import { usePagesStore, PageCaption } from "../store/page-store";
import { useVideoEditor } from "../hooks/use-video-editor";

export default function SubtitlePanel() {
    const { pagesstore, setPagesstore, currentPage } = usePagesStore();
    const { playerRef } = useVideoEditor();

    const fps = 30;

    // Stocke les références de chaque page
    const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});


    const updatePageText = useCallback(
        (pageIndex: number, text: string) => {
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
                // on recalcule seulement cette page
                const pageStart = page.startMs;
                const durationPerWord =
                    page.durationMs / words.length;

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
        },
        [setPagesstore, pagesstore]
    );


    function handleSeekTo(page: PageCaption) {
        if (playerRef.current) {
            playerRef.current.seekTo(
                (page.startMs / 1000) * fps + 1
            );
        }
    }


    // Scroll automatique vers la page active
    useEffect(() => {
        if (!currentPage) return;

        const index = pagesstore.findIndex(
            (page) =>
                page.startMs === currentPage.startMs &&
                page.durationMs === currentPage.durationMs
        );

        if (index !== -1) {
            pageRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentPage, pagesstore]);


    return (
        <div className="flex-1 min-w-0 min-h-0 p-4 space-y-4 overflow-y-auto">
            {pagesstore.map((page, index) => (
                <div
                    key={index}
                    ref={(element) => {
                        pageRefs.current[index] = element;
                    }}
                    onClick={() => handleSeekTo(page)}
                    className={
                        currentPage?.startMs === page.startMs &&
                            currentPage?.durationMs === page.durationMs
                            ? "bg-muted p-4 rounded-md"
                            : "p-4"
                    }
                >
                    <input
                        value={page.tokens
                            .map((token) => token.text)
                            .join(" ")
                        }
                        onChange={(e) =>
                            updatePageText(
                                index,
                                e.target.value
                            )
                        }
                        className="w-full hover:border py-1 px-2 hover:border-primary rounded-md"
                    />
                </div>
            ))}
        </div>
    );
}