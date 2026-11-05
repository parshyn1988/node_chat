import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { ChatMember } from '@/chats/chat-member.entity';
import { BaseModel } from '@/database/base.model';

@Entity('chats')
export class Chat extends BaseModel {

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @OneToMany(() => ChatMember, (member) => member.chat)
  members!: ChatMember[];
}
