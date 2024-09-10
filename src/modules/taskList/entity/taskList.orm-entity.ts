import { Task } from 'src/modules/task/entity/task.orm-entity';
import { User } from 'src/modules/user/entity/user.orm-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

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

  @ManyToOne(() => User, (user) => user.tasksList, { nullable: false })
  user: User;

  @OneToMany(() => Task, (task) => task.listTask, {
    cascade: ['remove'],
  })
  tasks: Task[];

}
