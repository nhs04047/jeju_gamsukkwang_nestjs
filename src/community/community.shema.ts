import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export type CommunityDocument = Community & Document;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Community {
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
  head: string;

  @Prop({
    required: true,
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
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({
    required: true,
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  likedUsers: string[];
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
