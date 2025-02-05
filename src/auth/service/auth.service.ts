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
        //if we don't have users the credentials will be invalid
        if (!user) throw new UnauthorizedException('Invalid Credentials')
            //if the password didn't match the credentials will be invalid
        if (pass !== user.password) throw new UnauthorizedException('Invalid Credentials');

        const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
        return { access_token: token,"role":user.role };
    }
}
