import {Body, Query, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseArrayPipe, Post, Put} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {Comment, CommentDocument} from "./comment.schema";
import {CreateCommentDto} from "./dto/create.comment.dto";
import {UpdateCommentDto} from "./dto/update.comment.dto";
import {FilterQuery, ObjectId} from "mongoose";
import {ParseObjectIdPipe} from "../pipe/parse-mongoose-id.pipe";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('comments')
@ApiTags('micro-comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    @ApiOperation({
        summary: 'Get comments based on filters'
    })
    @ApiQuery({
        name: 'productId',
        description: 'The productId filter',
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: [Comment]})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    getComments(@Query('productId', ParseObjectIdPipe) productId: ObjectId | undefined): Promise<Comment[]> {
        const filter: FilterQuery<CommentDocument> = {}

        if (productId) {
            filter.product = productId;
        }

        return this.commentsService.find(filter)
    }

    @Get(':idComment')
    @ApiOperation({
        summary: 'Get comments by id'
    })
    @ApiParam({
        name: 'idComment',
        description: 'The id of the comment you want to get',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: Comment})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Comment not found'})
    async getCommentById(@Param('idComment', ParseObjectIdPipe) id: ObjectId): Promise<Comment> {
        const comment = await this.commentsService.findById(id)

        if (!comment) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return comment
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create comments'
    })
    @ApiBody({type: [CreateCommentDto]})
    @ApiResponse({status: HttpStatus.OK, type: [Comment], description: 'The comments created'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    async createComment(@Body(new ParseArrayPipe({ items: CreateCommentDto })) createCommentDto: CreateCommentDto[]) {
        try {
            return await this.commentsService.createMany(createCommentDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idComment')
    @ApiOperation({
        summary: 'Update one comment'
    })
    @ApiParam({
        name: 'idComment',
        description: 'The id of the comment you want to update',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: Comment, description: 'The comment updated'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Comment not found'})
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
    @ApiOperation({
        summary: 'Delete one comment'
    })
    @ApiParam({
        name: 'idComment',
        description: 'The id of the comment you want to delete',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Successfully deleted'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Comment not found'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
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
