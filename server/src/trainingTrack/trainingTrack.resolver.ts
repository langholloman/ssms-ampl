import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TrainingTrackService } from "./trainingTrack.service";
import { CreateTrainingTrackArgs } from "./CreateTrainingTrackArgs";
import { UpdateTrainingTrackArgs } from "./UpdateTrainingTrackArgs";
import { DeleteTrainingTrackArgs } from "./DeleteTrainingTrackArgs";
import { FindManyTrainingTrackArgs } from "./FindManyTrainingTrackArgs";
import { FindOneTrainingTrackArgs } from "./FindOneTrainingTrackArgs";
import { TrainingTrack } from "./TrainingTrack";
import { FindManyClassArgs } from "../class/FindManyClassArgs";
import { Class } from "../class/Class";

@graphql.Resolver(() => TrainingTrack)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TrainingTrackResolver {
  constructor(
    private readonly service: TrainingTrackService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [TrainingTrack])
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "any",
  })
  async trainingTracks(
    @graphql.Args() args: FindManyTrainingTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "TrainingTrack",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => TrainingTrack, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "own",
  })
  async trainingTrack(
    @graphql.Args() args: FindOneTrainingTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "TrainingTrack",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => TrainingTrack)
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "create",
    possession: "any",
  })
  async createTrainingTrack(
    @graphql.Args() args: CreateTrainingTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"TrainingTrack"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => TrainingTrack)
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "update",
    possession: "any",
  })
  async updateTrainingTrack(
    @graphql.Args() args: UpdateTrainingTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "TrainingTrack",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"TrainingTrack"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => TrainingTrack)
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "delete",
    possession: "any",
  })
  async deleteTrainingTrack(
    @graphql.Args() args: DeleteTrainingTrackArgs
  ): Promise<TrainingTrack | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Class])
  @nestAccessControl.UseRoles({
    resource: "TrainingTrack",
    action: "read",
    possession: "any",
  })
  async classes(
    @graphql.Parent() parent: TrainingTrack,
    @graphql.Args() args: FindManyClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Class",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .classes(args);
    return results.map((result) => permission.filter(result));
  }
}
