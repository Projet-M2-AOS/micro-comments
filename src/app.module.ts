import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
