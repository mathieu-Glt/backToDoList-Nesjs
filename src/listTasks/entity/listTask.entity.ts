import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; 

    @ManyToOne(() => User, (user) => user.tasksList, { nullable: false })
    user: User;
    
}