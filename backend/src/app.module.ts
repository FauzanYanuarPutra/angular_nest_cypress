import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TypeOrmConfig } from './config/Typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BlogsModule } from './blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads', 
    }),ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(TypeOrmConfig), AuthModule, UsersModule, RolesModule, PermissionsModule, BlogsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
    }
  ],
})
export class AppModule {}
