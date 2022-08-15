import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Permissions {
  WRITE_TEXT,
  EDIT_USER,
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  age: number;

  @Prop({
    enum: Permissions,
    default: [Permissions.WRITE_TEXT],
    type: [String],
  })
  claims: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
