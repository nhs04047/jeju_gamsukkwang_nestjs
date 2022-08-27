import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export type ReviewDocument = Review & Document;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Review {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Prop({
    required: true,
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @Prop({
    required: true,
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userNickName: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
