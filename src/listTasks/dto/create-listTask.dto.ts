import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateListTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    user: number;  // Assuming you would pass the user ID when creating a task

}