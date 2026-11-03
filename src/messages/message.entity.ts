import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseModel } from '../database/base.model';
import { Chat } from '../chats/chat.entity';
import { User } from '../users/user.entity';

@Entity('messages')
export class Message extends BaseModel{
  @Column({ name: 'chat_id', type: 'bigint' })
  chatId!: string;

  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat!: Chat;

  @Column({ name: 'sender_id', type: 'bigint', nullable: true })
  senderId!: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'sender_id' })
  sender!: User | null;

  @Column({ type: 'text' })
  body!: string;

  @Column({ name: 'edited_at', type: 'timestamptz', nullable: true })
  editedAt!: Date | null;
}
