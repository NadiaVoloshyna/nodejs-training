import { UserDocument } from '../schemas/user.schema';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<User>;

  findAll(): Promise<UserDocument[]>;

  findOne(id: string): Promise<User>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: string): Promise<string>;
}
