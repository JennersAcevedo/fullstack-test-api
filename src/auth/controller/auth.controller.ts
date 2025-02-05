import { Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,

    ) { }

    //login needs to be public
    @Public()
    @Get('/login/:email/:password')
    async getLoogin(
        @Res() response,
        @Param('email') email: string,
        @Param('password') password: string,
        @Query() query: any) {
            try {
                const result = await this.authService.getLogin(email, password)
                const { access_token, ...userData } = result;
                response.cookie('authToken', access_token, {
                  httpOnly: false, 
                  secure: false,   
                  sameSite: 'Strict', 
                  maxAge: 24 * 60 * 60 * 1000, 
                });
           
                return response.status(HttpStatus.OK).json({
                  success: true,
                  data: userData,access_token, 
                  reason: '',
                });
              } catch (error: any) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                  success: false,
                  data: error,
                  reason: 'Invalid Params',
                });
              }
    }
}
