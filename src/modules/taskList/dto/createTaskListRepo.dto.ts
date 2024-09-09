import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateTaskListRequestDTO {
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class CreateTaskListDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
}