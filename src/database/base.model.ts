import { PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class SoftDeleteModel {
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null
}

export abstract class BaseModel extends SoftDeleteModel {
  @PrimaryGeneratedColumn('identity', { type: 'bigint', generatedIdentity: 'ALWAYS' })
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', })
  createdAt!: Date;
}
