import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersService } from '../interfaces/IUserService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      this.logger.warn(`User with id:${id} doesn't exist`);
      throw new NotFoundException(`User with id:${id} doesn't exist`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.username = updateUserDto.username ?? user.username;
    user.password = updateUserDto.password ?? user.password;
    return user.save();
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      this.logger.warn(`User with id:${id} doesn't exist`);
      throw new NotFoundException(`User with id:${id} doesn't exist`);
    }
    user.remove();
    return id;
  }
}
/* db.users.deleteOne( {"_id": ObjectId("4d512b45cc9374271b02ec4f")});
 
db.users.update(
   { _id: 1 },
   {
     $inc: { age: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
) */
/* db.users.find(
	{
 
		"$or": [
			{ "age": { "$gte": 20 } }
			{ "active": true }
		]
	},
	{
		"username": 1,
		"_id": 0
	}
).limit(3).explain("executionStats")
 
 
db.users.ensureIndex({ "age": 1 })
db.users.getIndexes()
db.users.dropIndex({ "age": 1 }) */
