import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Logger,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { ClearCacheInterceptor } from 'src/cache/ClearCacheInterceptor';
import { IUsersService } from '../interfaces/IUserService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('IUsersService') private readonly usersService: IUsersService,
  ) {}

  @Post()
  @UseInterceptors(ClearCacheInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(
      'someone is creating a user' + JSON.stringify(createUserDto),
    );
    // this.cacheManager.reset();
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseInterceptors(CacheInterceptor)
  @CacheTTL(100)
  async findAll() {
    await new Promise((r) => setTimeout(r, 5000));
    console.log('done');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
