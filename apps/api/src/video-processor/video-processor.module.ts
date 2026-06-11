import { Module } from '@nestjs/common';
import { VideoProcessorService } from './video-processor.service';
import { VideoProcessorController } from './video-processor.controller';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessorConsumer } from './video-preocessor.process';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video-processing',
    }),

    // 2. Configuration globale de Bull-Board (accessible sur http://localhost:3000/admin/queues)
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),

    // 3. On enregistre ta queue dans le Board en précisant l'adaptateur BullMQ
    BullBoardModule.forFeature({
      name: 'video-processing',
      adapter: BullMQAdapter, // <--- Tu dis explicitement à Bull-Board : "C'est du BullMQ, pas du vieux Bull"
    }),

  ],
  controllers: [VideoProcessorController],
  providers: [VideoProcessorService, VideoProcessorConsumer],
  exports: [VideoProcessorService],
})
export class VideoProcessorModule { }
