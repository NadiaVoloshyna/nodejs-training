import { Injectable } from '@nestjs/common';

const users = [];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  addUser(user: string) {
    users.push(user);
    console.log(users);
  }

  deleteUser(id: number) {
    const newUsers = users.filter((el) => el.username !== users[id].username);
    console.log(newUsers);
  }
}
