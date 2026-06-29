import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/Prisma/prisma.service';

import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  /**
   * Create workspace + owner membership
   */
  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create workspace
      const workspace = await tx.workspace.create({
        data: {
          name: createWorkspaceDto.name,
        },
      });

      // 2. Create owner membership
      const membership = await tx.membership.create({
        data: {
          userId,
          workspaceId: workspace.id,
          role: 'OWNER',
        },
      });

      return {
        workspace,
        membership,
      };
    });
  }

  /**
   * Get all workspaces of current user
   */
  async findAll(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get one workspace if user belongs to it
   */
  async findOne(id: string, userId: string) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id,

        memberships: {
          some: {
            userId,
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(
        'expace de travaile non trouver',
      );
    }

    return workspace;
  }

  /**
   * Update workspace only if user is OWNER
   */
  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
    userId: string,
  ) {
    // Check ownership
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id,

        memberships: {
          some: {
            userId,
            role: 'OWNER',
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(
        'expace de travaile non trouver',
      );
    }

    return this.prisma.workspace.update({
      where: {
        id,
      },

      data: {
        ...updateWorkspaceDto,
      },
    });
  }

  /**
   * Delete workspace only if user is OWNER
   */
  async remove(id: string, userId: string) {
    // Check ownership
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id,

        memberships: {
          some: {
            userId,
            role: 'OWNER',
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }

    return this.prisma.workspace.delete({
      where: {
        id,
      },
    });
  }
}