import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/guard/auth.guard';
import { BlogsService } from './blogs.service';
import { Public } from 'src/auth/constant';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) { }
  
  @Get()
  @Public()
  get() {
    return this.blogService.findAll()
  }
    
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(7);
        const filename = `${Date.now()}-${randomString}.png`;
        cb(null, filename);
      },
    }),
  }))
  create(@Body() body: any, @UploadedFile() image: Express.Multer.File, @Req() req: any) {
    body.image = image.path
    body.user = req.user
    return this.blogService.create(body)
  }
}

