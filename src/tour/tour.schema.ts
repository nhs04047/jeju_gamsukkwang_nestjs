import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type TourDocument = Tour & Document;

@Schema()
export class Tour {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  krTitle: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @Prop({ default: '-' })
  @IsString()
  phoneno: string;

  @Prop({ default: 0 })
  @IsNumber()
  likeCount: number;

  @Prop({ default: [] })
  @IsArray()
  @IsString({ each: true })
  likedUsers: string[];

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
