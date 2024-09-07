import { ListTask } from "src/listTasks/entity/listTask.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enum/stausTask.enum";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    longDescription: string;

    @Column({ type: 'varchar', length: 255 })
    shortDescription: string;

    @Column({ type: 'datetime'})
    deadline: Date;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
    status: TaskStatus; // Enum: "en cours" | "terminée"

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => ListTask, (listTask) => listTask.tasks, { nullable: false, onDelete: 'CASCADE' })
    listTask: ListTask
}

