import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/comments'), CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
