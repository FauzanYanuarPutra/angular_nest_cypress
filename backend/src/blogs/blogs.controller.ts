import { Body, Controller, Delete, Get, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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


  @Get(':id')
  @Public()
  getOne(@Req() req: any) {
    return this.blogService.findOne(req.params.id)
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


  @Patch(':id')
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
  update(@Body() body: any, @Req() req: any, @UploadedFile() image: Express.Multer.File) {
    if(image) {
      body.image = image.path
    } else {
      body.image = body.image.replace(`http://localhost:5000/`, '')
    }
    body.user = req.user

    console.log(body)

    return this.blogService.update(req.params.id, body)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Req() req: any) {
    return this.blogService.delete(req.params.id)
  }
}


