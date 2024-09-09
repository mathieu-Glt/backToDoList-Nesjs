import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.orm-entity.ts";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";



@Module({
    controllers: [AuthController],
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}