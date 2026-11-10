import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Repository, QueryFailedError } from 'typeorm';
import { PasswordService } from '@/common/password/password.service';

const PG_UNIQUE_VIOLATION = '23505';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly passwordService: PasswordService
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create({
      email: dto.email,
      userName: dto.userName,
      passwordHash: await this.passwordService.hash(dto.password)
    });

    try {
      return await this.usersRepo.save(user);
    } catch(error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException('Email is already existed')
      }
      throw error;
    }

    return this.usersRepo.save(user);
  }

  private isUniqueViolation(error: unknown): boolean {
    return (
      error instanceof QueryFailedError
      && (error.driverError as { code?: string }).code === PG_UNIQUE_VIOLATION
    );
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
