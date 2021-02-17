import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneSchoolArgs,
  FindManySchoolArgs,
  SchoolCreateArgs,
  SchoolUpdateArgs,
  SchoolDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManySchoolArgs>(args: Subset<T, FindManySchoolArgs>) {
    return this.prisma.school.findMany(args);
  }
  findOne<T extends FindOneSchoolArgs>(args: Subset<T, FindOneSchoolArgs>) {
    return this.prisma.school.findOne(args);
  }
  create<T extends SchoolCreateArgs>(args: Subset<T, SchoolCreateArgs>) {
    return this.prisma.school.create<T>(args);
  }
  update<T extends SchoolUpdateArgs>(args: Subset<T, SchoolUpdateArgs>) {
    return this.prisma.school.update<T>(args);
  }
  delete<T extends SchoolDeleteArgs>(args: Subset<T, SchoolDeleteArgs>) {
    return this.prisma.school.delete(args);
  }
}
