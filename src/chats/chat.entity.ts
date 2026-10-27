import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  DeleteDateColumn
} from 'typeorm';
import { ChatMember } from './chat-member.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('identity', { type: 'bigint', generatedIdentity: 'ALWAYS' })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', })
  createdAt!: Date;

  @OneToMany(() => ChatMember, (member) => member.chat)
  members!: ChatMember[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;
}
