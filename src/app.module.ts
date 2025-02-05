import { Module } from '@nestjs/common';
import { NoteController } from './modules/note/controller/note.controller';
import { NoteService } from './modules/note/service/note.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { AdminController } from './modules/admin/controller/admin.controller';
import { AdminService } from './modules/admin/service/admin.service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory:() => {
      return {
        signOptions:{expiresIn:'24h'},
        secret: process.env.SECRET
      }
    }
  })],
  controllers: [NoteController,AuthController,AdminController],
  providers: [NoteService, AuthService,PrismaService, AdminService],
  exports:[PrismaService]
})
export class AppModule {}
