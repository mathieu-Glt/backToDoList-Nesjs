import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TaskStatus } from "../entity/task.orm-entity";
import { Type } from 'class-transformer';




export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    longDescription: string;

    @IsNotEmpty()
    @IsString()
    shortDescription: string;

    @IsNotEmpty()
    // @IsISO8601()
    @Type(() => Date)
    endAt: Date;

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsNotEmpty()
    @IsNumber()
    listTask: number;
}