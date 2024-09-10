import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../entity/task.orm-entity";
import { Type } from 'class-transformer';




export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    longDescription?: string;

    @IsOptional()
    @IsString()
    shortDescription?: string;

    @IsOptional()
    // @IsISO8601()
    @Type(() => Date)
    endAt?: Date;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

}