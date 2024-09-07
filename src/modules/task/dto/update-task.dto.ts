import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../enum/stausTask.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  readonly longDescription?: string;

  @IsOptional()
  @IsString()
  readonly shortDescription?: string;

  @IsOptional()
  @IsDateString()
  readonly deadline?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;

  @IsOptional()
  @IsInt()
  readonly listTask?: number;
}
