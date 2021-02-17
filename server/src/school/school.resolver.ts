import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { SchoolService } from "./school.service";
import { CreateSchoolArgs } from "./CreateSchoolArgs";
import { UpdateSchoolArgs } from "./UpdateSchoolArgs";
import { DeleteSchoolArgs } from "./DeleteSchoolArgs";
import { FindManySchoolArgs } from "./FindManySchoolArgs";
import { FindOneSchoolArgs } from "./FindOneSchoolArgs";
import { School } from "./School";

@graphql.Resolver(() => School)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SchoolResolver {
  constructor(
    private readonly service: SchoolService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [School])
  @nestAccessControl.UseRoles({
    resource: "School",
    action: "read",
    possession: "any",
  })
  async schools(
    @graphql.Args() args: FindManySchoolArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<School[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "School",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => School, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "School",
    action: "read",
    possession: "own",
  })
  async school(
    @graphql.Args() args: FindOneSchoolArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<School | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "School",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => School)
  @nestAccessControl.UseRoles({
    resource: "School",
    action: "create",
    possession: "any",
  })
  async createSchool(
    @graphql.Args() args: CreateSchoolArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<School> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "School",
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
        `providing the properties: ${properties} on ${"School"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => School)
  @nestAccessControl.UseRoles({
    resource: "School",
    action: "update",
    possession: "any",
  })
  async updateSchool(
    @graphql.Args() args: UpdateSchoolArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<School | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "School",
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
        `providing the properties: ${properties} on ${"School"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => School)
  @nestAccessControl.UseRoles({
    resource: "School",
    action: "delete",
    possession: "any",
  })
  async deleteSchool(
    @graphql.Args() args: DeleteSchoolArgs
  ): Promise<School | null> {
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
}
