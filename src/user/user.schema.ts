import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export type UserDocument = User & Document;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User {
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
    unique: true,
    index: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  nickname: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @Prop()
  @IsString()
  description: string;

  @Prop({ default: [] })
  stamp: string[];

  @Prop({ default: 0 })
  experience: number;

  @Prop({ default: 'profileImg.png' })
  profileImgUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
