import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";



@Module({
    controllers: [AuthController],
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}