
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video-processing')
export class VideoProcessorConsumer extends WorkerHost {
    async process(job: Job<any, any, string>): Promise<any> {
        console.log(job.name);
        return {};
    }
}
