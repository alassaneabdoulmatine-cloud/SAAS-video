import { Controller } from '@nestjs/common';
import { GoogleaiService } from './googleai.service';

@Controller('googleai')
export class GoogleaiController {
  constructor(private readonly googleaiService: GoogleaiService) {}
}
