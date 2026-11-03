import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';
import { SoftDeleteModel } from '../database/base.model';

@Entity('chat_members')
export class ChatMember extends SoftDeleteModel {
  @PrimaryColumn({ name: 'chat_id', type: 'bigint' })
  chatId!: string;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @ManyToOne(() => Chat, (chat) => chat.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat!: Chat;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ name: 'joined_at', type: 'timestamptz' })
  joinedAt!: Date;
}
