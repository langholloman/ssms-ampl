import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneStudentArgs,
  FindManyStudentArgs,
  StudentCreateArgs,
  StudentUpdateArgs,
  StudentDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyStudentArgs>(
    args: Subset<T, FindManyStudentArgs>
  ) {
    return this.prisma.student.findMany(args);
  }
  findOne<T extends FindOneStudentArgs>(args: Subset<T, FindOneStudentArgs>) {
    return this.prisma.student.findOne(args);
  }
  create<T extends StudentCreateArgs>(args: Subset<T, StudentCreateArgs>) {
    return this.prisma.student.create<T>(args);
  }
  update<T extends StudentUpdateArgs>(args: Subset<T, StudentUpdateArgs>) {
    return this.prisma.student.update<T>(args);
  }
  delete<T extends StudentDeleteArgs>(args: Subset<T, StudentDeleteArgs>) {
    return this.prisma.student.delete(args);
  }
}
