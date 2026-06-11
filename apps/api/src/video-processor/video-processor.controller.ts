import { Controller, Post, Body } from '@nestjs/common';
import { VideoProcessorService } from './video-processor.service';

@Controller('video-processor')
export class VideoProcessorController {
  constructor(private readonly videoProcessorService: VideoProcessorService) { }

  @Post()
  async processVideo(@Body() body: { videoUrl: string; videoId: string }) {
    const { videoUrl, videoId } = body;
    await this.videoProcessorService.processVideo(videoUrl, videoId);
    return { message: 'Video processing job added to the queue' };
  }
}
