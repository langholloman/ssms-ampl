import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested, IsOptional } from "class-validator";
import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ClassCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  className!: string;
  @ApiProperty({
    required: false,
    type: TrainingTrackWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TrainingTrackWhereUniqueInput)
  @IsOptional()
  @Field(() => TrainingTrackWhereUniqueInput, {
    nullable: true,
  })
  trainingTrack?: TrainingTrackWhereUniqueInput | null;
}
export { ClassCreateInput };
