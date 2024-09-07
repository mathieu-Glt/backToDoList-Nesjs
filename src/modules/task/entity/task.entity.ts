import { ListTask } from "src/modules/listTasks/entity/listTask.entity";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enum/stausTask.enum";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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


    // @Column()
}

