import { Task } from "src/task/entity/task.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; 

    @ManyToOne(() => User, (user) => user.tasksList, { nullable: false })
    user: User;

    @OneToMany(() => Task, (task) => task.listTask, { cascade: ['remove'] })
    tasks: Task[];

    
}