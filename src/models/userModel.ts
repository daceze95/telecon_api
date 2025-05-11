import { Schema, model } from 'mongoose';
import { IUser } from '../interface/index';

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  fullName: { 
    type: String,
    required: true,
    lowercase: true,
    trim: true, 
    },
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
    },
  password: { 
    type: String,
    required: true,
    trim: true, 
    },
  phone: { 
    type: String,
    unique: true,
    sparse: true, // makes it optional but unique
    trim: true, 
    },
  verified: { type: Boolean, default: false },
  avatar: { type: String, sparse: true },
});

// 3. Create a Model.
export const User = model<IUser>('User', userSchema);
