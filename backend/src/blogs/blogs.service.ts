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
      relations: ['user']
    });
  }

  create(body: any) {

    const data = this.blogRepository.create({
      ...body
    });

    return this.blogRepository.save(data);
  }
}
