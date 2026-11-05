import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'user name'})
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  userName!: string;

  @ApiProperty({ example: 'Str0ngPassw0rd!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password!: string;
}
