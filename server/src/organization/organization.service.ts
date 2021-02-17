import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneOrganizationArgs,
  FindManyOrganizationArgs,
  OrganizationCreateArgs,
  OrganizationUpdateArgs,
  OrganizationDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyOrganizationArgs>(
    args: Subset<T, FindManyOrganizationArgs>
  ) {
    return this.prisma.organization.findMany(args);
  }
  findOne<T extends FindOneOrganizationArgs>(
    args: Subset<T, FindOneOrganizationArgs>
  ) {
    return this.prisma.organization.findOne(args);
  }
  create<T extends OrganizationCreateArgs>(
    args: Subset<T, OrganizationCreateArgs>
  ) {
    return this.prisma.organization.create<T>(args);
  }
  update<T extends OrganizationUpdateArgs>(
    args: Subset<T, OrganizationUpdateArgs>
  ) {
    return this.prisma.organization.update<T>(args);
  }
  delete<T extends OrganizationDeleteArgs>(
    args: Subset<T, OrganizationDeleteArgs>
  ) {
    return this.prisma.organization.delete(args);
  }
}
