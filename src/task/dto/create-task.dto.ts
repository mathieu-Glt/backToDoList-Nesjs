import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../enum/stausTask.enum";

export class CreateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly longDescription: string;

    @IsNotEmpty()
    @IsString()
    readonly shortDescription: string;

    @IsNotEmpty()
    @IsDateString()
    readonly deadline: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    readonly status?: TaskStatus

    @IsNotEmpty()
    @IsNumber()    
    readonly listTask: number;


}