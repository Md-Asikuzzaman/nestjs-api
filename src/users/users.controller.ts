import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/usersDtos';

const users = [
  {
    id: 1,
    name: 'asik',
    email: 'asik@gmail.com',
  },
  {
    id: 2,
    name: 'naeem',
    email: 'naeem@gmail.com',
  },
  {
    id: 3,
    name: 'emon',
    email: 'emon@gmail.com',
  },
];

@Controller('users')
export class UsersController {
  @Get()
  fetchUsers() {
    return users;
  }

  @Get(':id')
  fetchUsersById(@Param('id', ParseIntPipe) id: number) {
    const user = users.find((user) => user.id == id);
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };

    users.push(newUser);
    return body;
  }

  @Patch(':id')
  updateUser(
    @Body() body: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', 404);

    user.name = body.name;
    user.email = body.email;
    return user;
  }
}
