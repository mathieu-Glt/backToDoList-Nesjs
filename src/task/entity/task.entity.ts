import { ListTask } from "src/listTasks/entity/listTask.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
}
