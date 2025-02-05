import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async addNote (body:any, token:any){
      return await this.prisma.note.create({ data: {
            title:body.note_title,
            content:body.note_content,
            user:{
                connect:{id:token.id}
            }
        }})
    }
    async getNotebyUser (token:any){
        return await this.prisma.note.findMany({
            where: { userId: token.id }  
        });
    }

    async updateNote(id:string, body:any, token:any){
        const noteId = parseInt(id)
        const noteExists = await this.prisma.note.findUnique({
            where: { id:noteId },
        });
    //If the note isn't in the database will send an errror
        if (!noteExists) {
            throw new Error("Note not found");
        }
       return await this.prisma.note.update({
            where: { id:noteId }, 
            data: {
                title: body.note_title,  
                content: body.note_content,
            },
        });
    }
    async deleteNote(id:string, token:any){
        const noteId = parseInt(id)
        const noteExists = await this.prisma.note.findUnique({
            where: { id:noteId },
        });
    //If the note isn't in the database will send an errror
        if (!noteExists) {
            throw new Error("Note not found");
        }
        return await this.prisma.note.delete({where: { id:noteId }});
    }
}
