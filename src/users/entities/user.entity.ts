import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { BaseModel } from '@/database/base.model';
import { ChatMember } from '@/chats/chat-member.entity';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 255, })
  userName!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, select: false })
  passwordHash!: string;

  @OneToMany(() => ChatMember, (member) => member.user)
  memberships!: ChatMember[];
}
