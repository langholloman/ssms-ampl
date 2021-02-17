import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { ClassService } from "./class.service";
import { CreateClassArgs } from "./CreateClassArgs";
import { UpdateClassArgs } from "./UpdateClassArgs";
import { DeleteClassArgs } from "./DeleteClassArgs";
import { FindManyClassArgs } from "./FindManyClassArgs";
import { FindOneClassArgs } from "./FindOneClassArgs";
import { Class } from "./Class";
import { FindManyStudentArgs } from "../student/FindManyStudentArgs";
import { Student } from "../student/Student";
import { FindManyUserArgs } from "../user/FindManyUserArgs";
import { User } from "../user/User";
import { TrainingTrack } from "../trainingTrack/TrainingTrack";

@graphql.Resolver(() => Class)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ClassResolver {
  constructor(
    private readonly service: ClassService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Class])
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async classes(
    @graphql.Args() args: FindManyClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Class",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Class, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "own",
  })
  async class(
    @graphql.Args() args: FindOneClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Class",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "create",
    possession: "any",
  })
  async createClass(
    @graphql.Args() args: CreateClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Class",
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
        `providing the properties: ${properties} on ${"Class"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        trainingTrack: args.data.trainingTrack
          ? {
              connect: args.data.trainingTrack,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "update",
    possession: "any",
  })
  async updateClass(
    @graphql.Args() args: UpdateClassArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Class | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Class",
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
        `providing the properties: ${properties} on ${"Class"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          trainingTrack: args.data.trainingTrack
            ? {
                connect: args.data.trainingTrack,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => Class)
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "delete",
    possession: "any",
  })
  async deleteClass(
    @graphql.Args() args: DeleteClassArgs
  ): Promise<Class | null> {
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

  @graphql.ResolveField(() => [Student])
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async student(
    @graphql.Parent() parent: Class,
    @graphql.Args() args: FindManyStudentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Student[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Student",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .student(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [User])
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Class,
    @graphql.Args() args: FindManyUserArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .user(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => TrainingTrack, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Class",
    action: "read",
    possession: "any",
  })
  async trainingTrack(
    @graphql.Parent() parent: Class,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<TrainingTrack | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "TrainingTrack",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .trainingTrack();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
