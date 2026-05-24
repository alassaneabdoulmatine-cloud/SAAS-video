import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(':workspaceId/projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreateProjectDto,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.create(
      dto,
      user.userId,
      workspaceId,
    );
  }

  @Get()
  findAll(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.findAll(
      user.userId,
      workspaceId,
    );
  }

  @Get(':id')
  findOne(
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.findOne(
      id,
      user.userId,
      workspaceId,
    );
  }

  @Patch(':id')
  update(
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.update(
      id,
      dto,
      user.userId,
      workspaceId,
    );
  }

  @Delete(':id')
  remove(
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.remove(
      id,
      user.userId,
      workspaceId,
    );
  }
}