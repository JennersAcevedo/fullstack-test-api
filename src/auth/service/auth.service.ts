import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async getLogin(email: any, pass: any) {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) throw new UnauthorizedException('Invalid Credentials')
        if (pass !== user.password) throw new UnauthorizedException('Invalid Credentials');

        const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
        return { access_token: token,"role":user.role };
    }
}
