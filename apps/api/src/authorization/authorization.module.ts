import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { WorkspaceMemberGuard } from './guards/WorkspaceMemberGuard';

@Module({
  imports: [PrismaModule],
  providers: [WorkspaceMemberGuard],
  exports: [WorkspaceMemberGuard],
})
export class AuthorizationModule { }
