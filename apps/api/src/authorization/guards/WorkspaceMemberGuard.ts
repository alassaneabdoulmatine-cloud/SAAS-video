import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class WorkspaceMemberGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;
        const workspaceId = request.params.workspaceId;

        const member = await this.prisma.membership.findFirst({
            where: { userId, workspaceId },
        });

        if (!member) {
            throw new ForbiddenException("vous n'etes pas membre de ce workspace");
        }

        return true;
    }
}