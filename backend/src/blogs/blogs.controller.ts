import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('blogs')
export class BlogsController {
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
    console.log('asik')
    console.log(req.user)
    console.log(body, image)
    // Handle the uploaded image and other data
  }
}

