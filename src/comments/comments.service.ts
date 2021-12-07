import { Injectable } from '@nestjs/common';
import {Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentDocument} from "./comment.schema";
import {UpdateCommentDto} from "./dto/update.comment.dto";
import {CreateCommentDto} from "./dto/create.comment.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = new this.commentModel(createCommentDto);
        return comment.save();
    }

    async createMany(createCommentDto: CreateCommentDto[]): Promise<Comment[]> {
        return this.commentModel.insertMany(createCommentDto);
    }

    delete(id: ObjectId) {
        return this.commentModel.findByIdAndDelete(id).exec()
    }

    update(id: ObjectId, updateCommentDto: UpdateCommentDto) {
        return this.commentModel.findByIdAndUpdate(id, updateCommentDto).exec()
    }

    async findAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }

    async findById(id: ObjectId): Promise<Comment> {
        return this.commentModel.findById(id).exec();
    }
}
