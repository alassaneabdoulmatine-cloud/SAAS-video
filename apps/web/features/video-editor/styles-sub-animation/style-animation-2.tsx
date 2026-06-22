
import { AnimationProps } from "../types/animation-props-type";


export default function animation2({ currentToken, currentWords, fps, frame, currentMs }: AnimationProps) {

    return (
        <div className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%] text-6xl font-bold text-white uppercase" >
            {currentWords?.tokens.map((token, index) => {

                if (!currentToken) return null;

                const isCurrentToken = token.text === currentToken?.text;

                return (
                    <span key={index} className={`mx-2 ${isCurrentToken ? "text-yellow-500" : "text-white"}`} >
                        {token.text}
                    </span>
                )
            })}
        </div>
    )
}
