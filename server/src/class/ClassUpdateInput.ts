import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { TrainingTrackWhereUniqueInput } from "../trainingTrack/TrainingTrackWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ClassUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  className?: string;
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
export { ClassUpdateInput };
