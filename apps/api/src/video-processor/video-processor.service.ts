import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static'; // 1. AJOUT DE L'IMPORT DU MOTEUR STATIC

@Injectable()
export class VideoProcessorService {
    constructor(
        @InjectQueue('video-processing') private readonly videoProcessingQueue: Queue,
    ) {
        // 2. CONFIGURATION : On lie la passerelle (fluent-ffmpeg) au moteur binaire (ffmpeg-static)
        ffmpeg.setFfmpegPath(ffmpegPath);
    }

    async processVideo(videoUrl: string, videoId: string) {
        // Ajouter un job à la queue BullMQ
        await this.videoProcessingQueue.add('process-video', {
            videoUrl,
            videoId,
        });
        console.log("job added to the queue");
    }

    /**
     * Extrait l'audio en lisant la vidéo en streaming depuis CloudFront
     * @param cloudfrontUrl L'URL directe de la vidéo
     * @param videoId ID pour le nom du fichier unique
     * @returns Le chemin local du fichier audio extrait
     */
    async extractAudioFromUrl(cloudfrontUrl: string, videoId: string): Promise<string> {
        const tempDir = os.tmpdir();
        const audioOutputPath = path.join(tempDir, `audio-${videoId}-${Date.now()}.mp3`);

        return new Promise((resolve, reject) => {
            ffmpeg(cloudfrontUrl)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate(96)
                .audioChannels(1)
                .audioFrequency(16000)

                // 💡 AJOUT SÉCURITÉ VPS : Limite FFmpeg à un seul thread CPU pour ne pas freeze l'API
                .outputOptions('-threads 1')

                .output(audioOutputPath)
                .on('start', (commandLine) => {
                    console.log('FFmpeg a démarré le streaming en direct...');
                })
                .on('end', () => {
                    console.log('Extraction audio terminée avec succès !');
                    resolve(audioOutputPath);
                })
                .on('error', (err) => {
                    console.error('Erreur FFmpeg :', err);
                    reject(err);
                })
                .run();
        });
    }

    /**
     * Supprime un fichier en toute sécurité s'il existe
     */
    private safeDelete(filePath: string) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    // Optionnel : pour être sûr que le job est bien en cours
    async getQueueStatus() {
        return {
            waiting: await this.videoProcessingQueue.getWaitingCount(),
            active: await this.videoProcessingQueue.getActiveCount(),
        };
    }
}