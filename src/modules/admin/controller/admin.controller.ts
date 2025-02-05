import { Body, Controller, Get, Headers, HttpStatus, Post, Res } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/guard/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) { }
//this endpoint only will be accesibe for the admin user
    @Post('/add/user')
    async addUser(
        @Res() response,
        @Headers() headers: Record<string, string>,
        @Body() body: any
    ) {
        try {
            let headerToken = headers['authorization'].replace('Bearer ', '');
            const decodedJwtAccessToken = this.jwtService.decode(headerToken);
            const result = await this.adminService.addUser(
                body,
                decodedJwtAccessToken
            );
            return response.status(HttpStatus.OK).json({
                success: true,
                data: result,
                reason: '',
            });
        } catch (error: any) {
            console.log(error)
            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                data: error,
                reason: 'Invalid Params',
            });
        }
    }
}
