import { Test, TestingModule } from '@nestjs/testing';
import { LocalwhisperService } from './localwhisper.service';

describe('LocalwhisperService', () => {
  let service: LocalwhisperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalwhisperService],
    }).compile();

    service = module.get<LocalwhisperService>(LocalwhisperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
