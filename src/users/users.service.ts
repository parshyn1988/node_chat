import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create({
      email: dto.email,
      userName: dto.userName,
      passwordHash: dto.password
    });

    return this.usersRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find({ order: { id: 'ASC' }})
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id - ${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepo.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with id - ${id} not found`);
    }
  }
}
