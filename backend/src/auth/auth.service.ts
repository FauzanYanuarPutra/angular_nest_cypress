import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async findAll() {
    return this.userService.findAll();
  }

  async getProfile(id: string) {
    const user = await this.userService.findById(id);

    return user
  }
  
  async login(username: string, pass: string) {

    const user = await this.userService.findOne(username);

    let password: any;

    if (user) {
      password = await bcrypt.compare(pass, user.password);
    }


    if (!password) {
      console.log('error')
      throw new UnauthorizedException('Incorrect username or password');
    }


    const result = {
      id: user.id,
      username: user.username,
      password: user.password,
      roles: user.role,
    }

    return {
      userId: result,
      access_token: await this.jwtService.sign(result)
    };
  }

  async register(body: any) {
    console.log(body)
    const user = await this.userService.findOne(body.username);

    if(user) {
      throw new UnauthorizedException('User already exists');
    }

    const data: any = this.userService.create(body)

    const result = {
      id: data.id,
      username: data.username,
      password: data.password,
      roles: data.role,
    }

    return {
      userId: result,
      access_token: await this.jwtService.sign(result)
    }
  }
}
