import { Module } from '@nestjs/common';
import { GoogleaiService } from './googleai.service';
import { GoogleaiController } from './googleai.controller';

@Module({
  controllers: [GoogleaiController],
  providers: [GoogleaiService],
})
export class GoogleaiModule {}
