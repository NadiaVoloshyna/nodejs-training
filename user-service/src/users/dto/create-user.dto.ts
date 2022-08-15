import { IsNotEmpty, MaxLength, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  age: number;

  /* @ApiProperty()
  claims: string[]; */
}
