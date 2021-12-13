import {IsDateString, IsOptional, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    @ApiProperty({type: String, format: 'mongo-id', required: false, minLength: 0, maxLength: 100})
    user?: ObjectId;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    @ApiProperty({type: String, format: 'mongo-id', required: false, minLength: 0, maxLength: 100})
    product?: ObjectId;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    @ApiProperty({required: false, minLength: 0, maxLength: 255})
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 9999)
    @ApiProperty({required: false, minLength: 0, maxLength: 9999})
    description?: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({required: false})
    createDate?: Date;
}
