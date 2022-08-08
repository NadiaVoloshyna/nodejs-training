import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  addUser(@Body() body) {
    return this.appService.addUser(body);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.appService.deleteUser(id);
  }
}
/* fetch ('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'Scotland'})
}) */
