import {IsDateString, IsNotEmpty, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    @ApiProperty({type: String, minLength: 0, maxLength: 100})
    user: ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    @ApiProperty({type: String, minLength: 0, maxLength: 100})
    product: ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    @ApiProperty({minLength: 0, maxLength: 255})
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(0, 9999)
    @ApiProperty({minLength: 0, maxLength: 9999})
    description: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    createDate: Date;
}
