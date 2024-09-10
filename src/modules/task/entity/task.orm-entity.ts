import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskList } from '../../taskList/entity/taskList.orm-entity';

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  longDescription: string;

  @Column({ type: 'varchar', length: 255 })
  shortDescription: string;

  @Column({ type: 'datetime' })
  endAt: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status: TaskStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;

  @ManyToOne(() => TaskList, (listTask) => listTask.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  listTask: TaskList;

}
