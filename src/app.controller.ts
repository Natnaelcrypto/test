import { Controller, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/app")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("photos")
  @UseInterceptors(FileInterceptor("photos",{storage:diskStorage({
    destination:"./uploads"
    ,filename:(req,files,callback)=>{
      const filename=`${files.originalname}`
      callback(null,filename)
    }

  })}))
  async uploadPhoto(@UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({
          maxSize:1000000
        })
      ]
    })

  ) files:Express.Multer.File){
    return {
      files
    }
  }
  @Post("uploads")
  @UseInterceptors(FileInterceptor("uploads",{storage:diskStorage({
    destination:"./uploads"
    ,filename:(req,files,callback)=>{
      const filename=`${files.originalname}`
      callback(null,filename)
    }

  })}))
  uploadSingle(@UploadedFile() file:any){
    console.log(file)
  }

}
