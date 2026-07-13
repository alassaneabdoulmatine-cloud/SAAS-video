import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import fs from 'fs/promises';
import { OpenAiService } from 'src/openai/openai.service';
import { FfmpegService } from 'src/ffmpeg/ffmpeg.service';
import { UploadService } from 'src/upload/upload.service';
import { VideoStatus } from '@prisma/client';
import { VideosService } from 'src/videos/videos.service';
import { LocalwhisperService } from 'src/localwhisper/localwhisper.service';

@Injectable()
export class VideoProcessorService {
    constructor(
        @InjectQueue('video-processing')
        private readonly videoProcessingQueue: Queue,

        private readonly openAiService: OpenAiService,
        private readonly ffmpegService: FfmpegService,
        private readonly uploadService: UploadService,
        private readonly videoService: VideosService,
        private readonly localwhisperService: LocalwhisperService,
    ) { }

    /**
     * Ajoute un job dans la queue BullMQ
     */
    async processVideo(videoUrl: string, videoId: string) {
        try {
            await this.videoProcessingQueue.add('process-video', {
                videoUrl,
                videoId,
            });
            console.log('[Queue] Job ajouté');

        } catch (error) {
            console.error(`[Queue Error] Failed to add job for video ${videoId}`, error);
        }
    }

    /**
     * Pipeline principal de traitement vidéo
     */
    async processVideoPipeline(
        videoUrl: string,
        videoId: string,
        projectId: string,
        workspaceId: string,
    ): Promise<any> {
        let tempAudioPath: string | null = null;
        let tempThumbPath: string | null = null;

        const thumbnailKey = `public/${videoId}/thumbnail.jpg`;

        try {

            [tempThumbPath, tempAudioPath] = await Promise.all([
                this.ffmpegService.extractThumbnail(videoUrl, videoId),
                this.ffmpegService.extractAudioForWhisper(videoUrl, videoId),
            ]);

            if (!tempThumbPath) throw new Error('Thumbnail generation failed');
            if (!tempAudioPath) throw new Error('Audio extraction failed');

            const thumbS3Url = await this.uploadService.uploadLocalFile(tempThumbPath, thumbnailKey);
            const transcription = await this.localwhisperService.transcribeLocalWhisper(tempAudioPath);
            // const stylizedSubtitles = await this.openAiService.stylizeSubtitles(transcription);
            //    const transcription = await this.openAiService.transcribe(tempAudioPath);
            //     const stylizedSubtitles = await this.openAiService.stylizeSubtitles(transcription); 

            await this.videoService.update(
                videoId,
                {
                    thumbnailUrl: thumbS3Url,
                    thumbnailKey,
                    subtitles: transcription,
                    status: VideoStatus.SUCCESS,
                },
                projectId,
                workspaceId,
            );

            return {
                transcription,
                thumbnailKey,
                thumbS3Url,
            };
        } catch (error) {
            console.error(`[Pipeline Error] Video ${videoId} failed`, error);

            try {
                await this.videoService.update(
                    videoId,
                    { status: VideoStatus.FAILED },
                    projectId,
                    workspaceId,
                );
            } catch (dbError) {
                console.error('[DB Error] Failed to update status:', dbError);
            }

            throw error;
        } finally {
            await this.safeUnlink(tempAudioPath, 'audio');
            await this.safeUnlink(tempThumbPath, 'thumbnail');
        }
    }

    /**
     * Suppression safe des fichiers temporaires
     */
    private async safeUnlink(filePath: string | null, label: string) {
        if (!filePath) return;

        try {
            await fs.unlink(filePath);
            console.log(`[Clean] ${label} supprimé`);
        } catch (err) {
            console.warn(`[Clean Warning] ${label} déjà supprimé ou introuvable`);
        }
    }
}