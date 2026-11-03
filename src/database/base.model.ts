import { PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class SoftDeleteModel {
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt!: Date | null
}

export abstract class BaseModel extends SoftDeleteModel {
  @PrimaryGeneratedColumn('identity', { type: 'bigint', generatedIdentity: 'ALWAYS' })
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', })
  createdAt!: Date;
}
