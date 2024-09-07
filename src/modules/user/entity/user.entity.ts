import { ListTask } from 'src/modules/listTasks/entity/listTask.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ListTask, (listTask) => listTask.user, {
    cascade: ['remove'],
  }) // this option allow delete all associated ListTask to User
  tasksList: ListTask[];
}
