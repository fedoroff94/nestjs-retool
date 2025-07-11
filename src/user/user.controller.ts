import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      company: string;
      isBlocked: boolean;
    },
  ): Promise<User> {
    return this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.company,
      createUserDto.isBlocked,
    );
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateUserDto: Partial<{
      username: string;
      email: string;
      company: string;
      isBlocked: boolean;
    }>,
  ) {
    const result = await this.userService.updateUser(+id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.userService.deleteUser(+id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
