import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import * as mongoose from "mongoose";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    _id: ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId})
    user: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId})
    product: ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    createDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
