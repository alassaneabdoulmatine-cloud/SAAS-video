import { Module } from '@nestjs/common';
import { LocalwhisperService } from './localwhisper.service';

@Module({
  providers: [LocalwhisperService],
  exports: [LocalwhisperService],
})
export class LocalwhisperModule { }
