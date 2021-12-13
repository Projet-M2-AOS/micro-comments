import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import * as mongoose from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @ApiProperty({type: String, format: 'mongo-id', minLength: 0, maxLength: 100})
    _id: ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId})
    @ApiProperty({type: String, format: 'mongo-id', minLength: 0, maxLength: 100})
    user: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId})
    @ApiProperty({type: String, format: 'mongo-id', minLength: 0, maxLength: 100})
    product: ObjectId;

    @Prop()
    @ApiProperty({minLength: 0, maxLength: 255})
    title: string;

    @Prop()
    @ApiProperty({minLength: 0, maxLength: 9999})
    description: string;

    @Prop()
    @ApiProperty()
    createDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
