import { Report } from 'src/report/report.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: 'Unknown company' }) company: string;

  @Column({ nullable: true, default: false }) isBlocked: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
