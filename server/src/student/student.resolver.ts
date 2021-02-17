import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { StudentService } from "./student.service";
import { CreateStudentArgs } from "./CreateStudentArgs";
import { UpdateStudentArgs } from "./UpdateStudentArgs";
import { DeleteStudentArgs } from "./DeleteStudentArgs";
import { FindManyStudentArgs } from "./FindManyStudentArgs";
import { FindOneStudentArgs } from "./FindOneStudentArgs";
import { Student } from "./Student";

@graphql.Resolver(() => Student)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class StudentResolver {
  constructor(
    private readonly service: StudentService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Student])
  @nestAccessControl.UseRoles({
    resource: "Student",
    action: "read",
    possession: "any",
  })
  async students(
    @graphql.Args() args: FindManyStudentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Student[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Student",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Student, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Student",
    action: "read",
    possession: "own",
  })
  async student(
    @graphql.Args() args: FindOneStudentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Student | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Student",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Student)
  @nestAccessControl.UseRoles({
    resource: "Student",
    action: "create",
    possession: "any",
  })
  async createStudent(
    @graphql.Args() args: CreateStudentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Student> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Student",
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
        `providing the properties: ${properties} on ${"Student"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Student)
  @nestAccessControl.UseRoles({
    resource: "Student",
    action: "update",
    possession: "any",
  })
  async updateStudent(
    @graphql.Args() args: UpdateStudentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Student | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Student",
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
        `providing the properties: ${properties} on ${"Student"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Student)
  @nestAccessControl.UseRoles({
    resource: "Student",
    action: "delete",
    possession: "any",
  })
  async deleteStudent(
    @graphql.Args() args: DeleteStudentArgs
  ): Promise<Student | null> {
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
