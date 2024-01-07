import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entity/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) { }

  findAll() {
    return this.blogRepository.find({
      relations: ['user'],
      order: { id: 'DESC' }
    });
  }

  findOne(id: string) {
    return this.blogRepository.findOne({
      where: { id: Number(id) },
      relations: ['user']
    });
  }

  create(body: any) {

    const data = this.blogRepository.create({
      ...body
    });

    return this.blogRepository.save(data);
  }

  async update(id: string, body: any) {
    const data = await this.blogRepository.findOne({
      where: { id: Number(id) },
    });

    if (!data) {
      throw new Error('Data not found');
    }

    const updatedData = { ...data }; 

    for (const key in body) {
      if (body[key] !== null) {
        updatedData[key] = body[key];
      }
    }


    return this.blogRepository.update({ id: Number(id) }, updatedData);
  }

  delete(id: string) {
    return this.blogRepository.delete({ id: Number(id) });
  }


}
