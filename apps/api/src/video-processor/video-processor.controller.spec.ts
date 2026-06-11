import { Test, TestingModule } from '@nestjs/testing';
import { VideoProcessorController } from './video-processor.controller';
import { VideoProcessorService } from './video-processor.service';

describe('VideoProcessorController', () => {
  let controller: VideoProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoProcessorController],
      providers: [VideoProcessorService],
    }).compile();

    controller = module.get<VideoProcessorController>(VideoProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
