import {IsDateString, IsOptional, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    user?: ObjectId;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    product?: ObjectId;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 9999)
    description?: string;

    @IsOptional()
    @IsDateString()
    createDate?: Date;
}
