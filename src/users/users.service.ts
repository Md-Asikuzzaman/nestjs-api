import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

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

@Injectable()
export class UsersService {
  fetchUsers(): User[] {
    return users;
  }

  fetchUserById(id: number): User {
    const user = users.find((user) => user.id == id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = {
      id: users.length + 1,
      ...createUserDto,
    };

    users.push(newUser);
    return newUser;
  }

  updateUserById(id: number, updateUserDto: UpdateUserDto): User {
    const user = users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const updatedUser = { ...user, ...updateUserDto };
    const index = users.findIndex((user) => user.id === id);
    users[index] = updatedUser;
    return updatedUser;
  }

  deleteUserById(id: number): User[] {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    users.splice(userIndex, 1);
    return users;
  }
}
