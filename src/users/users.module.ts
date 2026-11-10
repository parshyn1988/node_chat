import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { PasswordModule } from '@/common/password/password.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
