import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  private async checkMembership(userId: string, workspaceId: string) {
    const member = await this.prisma.membership.findFirst({
      where: {
        userId,
        workspaceId,
      },
    });

    if (!member) {
      throw new ForbiddenException(
        "tu n'es pas membre de ce workspace",
      );
    }

    return member;
  }

  async create(createProjectDto: CreateProjectDto, userId: string, workspaceId: string) {

    await this.checkMembership(userId, workspaceId);

    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        workspaceId
      },
    });
  }

  async findAll(userId: string, workspaceId: string) {
    await this.checkMembership(userId, workspaceId);

    return this.prisma.project.findMany({
      where: { workspaceId },
    });
  }

  async findOne(id: string, userId: string, workspaceId: string) {
    await this.checkMembership(userId, workspaceId);

    const project = await this.prisma.project.findFirst({
      where: { id, workspaceId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string, workspaceId: string) {
    await this.checkMembership(userId, workspaceId);

    return this.prisma.project.update({
      where: { id },
      data: { name: updateProjectDto.name },
    });
  }

  async remove(id: string, userId: string, workspaceId: string) {
    await this.checkMembership(userId, workspaceId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}