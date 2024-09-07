import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListTask } from "./entity/listTask.entity";
import { ListTaskService } from "./listTask.service";
import { ListTaskController } from "./listTask.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([ListTask]), 
    UserModule, // I import UserModule for to use UserService
], 
    controllers: [ListTaskController],
    providers: [ListTaskService],
    exports: [ListTaskService] // Export ListTaskService if other modules need it
})
export class ListTaskModule {}