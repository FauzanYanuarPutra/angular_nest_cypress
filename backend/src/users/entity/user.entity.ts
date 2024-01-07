import { Exclude } from 'class-transformer';
import { Blog } from 'src/blogs/entity/blog.entity';
import { Role } from 'src/roles/entity/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne(() => Role, role => role.users, { nullable: true })
  role: Role

  @OneToMany(() => Blog, role => role.user, {nullable: true})
  blogs: Blog[]
}


