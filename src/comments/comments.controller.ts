import {Body, Query, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseArrayPipe, Post, Put} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {Comment} from "./comment.schema";
import {CreateCommentDto} from "./dto/create.comment.dto";
import {UpdateCommentDto} from "./dto/update.comment.dto";
import {ObjectId} from "mongoose";
import {ParseObjectIdPipe} from "../pipe/parse-mongoose-id.pipe";

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    getComments(@Query('productId', ParseObjectIdPipe) productId: ObjectId): Promise<Comment[]> {
        return this.commentsService.find({productId})
    }

    @Get(':idComment')
    async getCommentById(@Param('idComment', ParseObjectIdPipe) id: ObjectId): Promise<Comment> {
        const comment = await this.commentsService.findById(id)

        if (!comment) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return comment
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createComment(@Body(new ParseArrayPipe({ items: CreateCommentDto })) createCommentDto: CreateCommentDto[]) {
        try {
            return await this.commentsService.createMany(createCommentDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idComment')
    async updateComment(@Param('idComment', ParseObjectIdPipe) id: ObjectId, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        let comment: Comment;

        try {
            comment = await this.commentsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        if (!comment) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        try {
            await this.commentsService.update(id, updateCommentDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        return this.commentsService.findById(id)
    }

    @Delete(':idComment')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteComment(@Param('idComment', ParseObjectIdPipe) id: ObjectId) {
        let comment: Comment;
        try {
            comment = await this.commentsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }


        if (!comment) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        await this.commentsService.delete(id)
    }
}
