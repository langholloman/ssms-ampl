import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { TrainingTrackService } from "./trainingTrack.service";
import { TrainingTrackCreateInput } from "./TrainingTrackCreateInput";
import { TrainingTrackWhereInput } from "./TrainingTrackWhereInput";
import { TrainingTrackWhereUniqueInput } from "./TrainingTrackWhereUniqueInput";
import { TrainingTrackUpdateInput } from "./TrainingTrackUpdateInput";
import { TrainingTrack } from "./TrainingTrack";
import { ClassWhereInput } from "../class/ClassWhereInput";
import { Class } from "../class/Class";

@swagger.ApiBasicAuth()
@swagger.ApiTags("training-tracks")
@common.Controller("training-tracks")
export class TrainingTrackController {
  constructor(
    private readonly service: TrainingTrackService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: TrainingTrack })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: TrainingTrackCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"TrainingTrack"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        addDays: true,
        createdAt: true,
        dayCount: true,
        id: true,
        trainingTrackName: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [TrainingTrack] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: TrainingTrackWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "TrainingTrack",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        addDays: true,
        createdAt: true,
        dayCount: true,
        id: true,
        trainingTrackName: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: TrainingTrack })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "TrainingTrack",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        addDays: true,
        createdAt: true,
        dayCount: true,
        id: true,
        trainingTrackName: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: TrainingTrack })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @common.Body()
    data: TrainingTrackUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"TrainingTrack"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          addDays: true,
          createdAt: true,
          dayCount: true,
          id: true,
          trainingTrackName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: TrainingTrack })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: TrainingTrackWhereUniqueInput
  ): Promise<TrainingTrack | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          addDays: true,
          createdAt: true,
          dayCount: true,
          id: true,
          trainingTrackName: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/classes")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "any",
  })
  async findManyClasses(
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @common.Query() query: ClassWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Class[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Class",
    });
    const results = await this.service.findOne({ where: params }).classes({
      where: query,
      select: {
        className: true,
        createdAt: true,
        id: true,

        trainingTrack: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/classes")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "update",
    possession: "any",
  })
  async createClasses(
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @common.Body() body: TrainingTrackWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      classes: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"TrainingTrack"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/classes")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "update",
    possession: "any",
  })
  async updateClasses(
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @common.Body() body: TrainingTrackWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      classes: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"TrainingTrack"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/classes")
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "update",
    possession: "any",
  })
  async deleteClasses(
    @common.Param() params: TrainingTrackWhereUniqueInput,
    @common.Body() body: TrainingTrackWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      classes: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"TrainingTrack"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
