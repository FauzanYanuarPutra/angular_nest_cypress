import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }
  
  async findAll() {
    return this.usersRepository.find({ relations: ['role', 'role.permissions', 'blogs'], order: { blogs: { id: 'DESC' } } });
  }

  async findById(id: string) {
    const NumID = Number(id);
    if (isNaN(NumID)) {
      throw new BadRequestException('ID harus berupa angka');
    }

    const find = await this.usersRepository.findOne({
      where: { id: NumID },
      relations: ['role', 'role.permissions', 'blogs']
    })

    if(!find) {
      throw new NotFoundException('ID tidak ditemukan');
    }

    return find
  }

  async findOne(username: string): Promise<any> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['role', 'role.permissions', 'blogs']
    });
  }

  async create(user: User) {

    console.log(user)

    const paswword = await bcrypt.hash(user.password, 10);

    user.password = paswword
    
    const result = await this.usersRepository.save(user);
    
    return result
  }

  async deleteRole(id: number) {
    const NumID = Number(id);
    if (isNaN(NumID)) {
      throw new BadRequestException('ID harus berupa angka');
    }

    const find = await this.usersRepository.findOne({
      where: { id: NumID },
      relations: ['role', 'role.permissions', 'blogs']
    })

    if(!find) {
      throw new NotFoundException('ID tidak ditemukan');
    }

    find.role = null
    return await this.usersRepository.save(find);
  }  
}



