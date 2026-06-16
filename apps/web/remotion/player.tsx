import { Player } from '@remotion/player';
import { ReactElement } from 'react';

type VideoPlayerProps = {
    videocomponent: any;
    durationInFrames: number;
    width: number;
    height: number;
    videourl: string;
    subtitles: any[];

}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videocomponent, durationInFrames, width, height, videourl, subtitles }) => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <Player
                component={videocomponent}
                inputProps={{
                    videoSrc: videourl,
                    subtitles: subtitles
                }}
                durationInFrames={durationInFrames}
                compositionWidth={width}
                compositionHeight={height}
                controls
                fps={30}
                style={{ width: "100%", height: "100%" }}
            />

        </div>
    )
};