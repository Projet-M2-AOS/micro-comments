import {IsDate, IsNotEmpty, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    user: ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    product: ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(0, 9999)
    description: string;

    @IsNotEmpty()
    @IsDate()
    createDate: Date;
}
