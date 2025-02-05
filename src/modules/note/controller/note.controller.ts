import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { JwtService } from '@nestjs/jwt';

@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly jwtService:JwtService
) {}

@Post('add/note')
  async addNote(
    @Res() response,
    @Headers() headers: Record<string, string>,
    @Body() body: any
  ) {
    try {
      let headerToken = headers['authorization'].replace('Bearer ', '');
      const decodedJwtAccessToken = this.jwtService.decode(headerToken);
      const result = await this.noteService.addNote(
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

  @Get('')
  async getNotesbyUser (@Res() response, @Headers() headers: Record<string, string>) {
    try {
      let headerToken = headers['authorization'].replace('Bearer ', '');
      const decodedJwtAccessToken = this.jwtService.decode(headerToken);
      const result = await this.noteService.getNotebyUser(decodedJwtAccessToken
      );
      return response.status(HttpStatus.OK).json({
        success: true,
        data: result,
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


  @Put('/update/:id')
  async updateNotes (@Res() response, @Headers() headers: Record<string, string>,
  @Body() body: any, @Param('id') id: string,) {
  try {
    let headerToken = headers['authorization'].replace('Bearer ', '');
    const decodedJwtAccessToken = this.jwtService.decode(headerToken);
    const result = await this.noteService.updateNote(id,body, decodedJwtAccessToken
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

@Delete('/delete/:id')
async deleteNote (@Res() response, @Headers() headers: Record<string, string>,
@Body() body: any, @Param('id') id: string,) {
try {
  let headerToken = headers['authorization'].replace('Bearer ', '');
  const decodedJwtAccessToken = this.jwtService.decode(headerToken);
  const result = await this.noteService.deleteNote(id, decodedJwtAccessToken
  );
  return response.status(HttpStatus.OK).json({
    success: true,
    data: result,
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

