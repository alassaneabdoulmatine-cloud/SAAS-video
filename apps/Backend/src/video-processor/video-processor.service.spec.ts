import { Test, TestingModule } from '@nestjs/testing';
import { VideoProcessorService } from './video-processor.service';

describe('VideoProcessorService', () => {
  let service: VideoProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoProcessorService],
    }).compile();

    service = module.get<VideoProcessorService>(VideoProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
