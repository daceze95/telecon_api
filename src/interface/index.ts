import { Request } from "express";
import { Types } from "mongoose";

export interface IReg {
    fullName:string,
    email: string,
    password: string,
}

export interface IUser extends IReg {
    phone: string,
    verified: boolean,
    avatar?: string
}

export interface AuthRequest extends Request {
    user: {
        _id: Types.ObjectId,
        email: string,
        verified: boolean
    }
}