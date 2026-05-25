import { Module } from '@nestjs/common';
import { PrismaModule } from './Prisma/prisma.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { VideosModule } from './videos/videos.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [PrismaModule, WorkspaceModule, UserModule, AuthModule, ProjectsModule, VideosModule, AuthorizationModule],
})
export class AppModule { }
