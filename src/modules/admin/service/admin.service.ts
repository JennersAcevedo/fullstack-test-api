import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async addUser(body: any, token: any) {
        let userPrismaResponse = await this.prisma.user.create({ data: body })
        return userPrismaResponse
    }
   }
