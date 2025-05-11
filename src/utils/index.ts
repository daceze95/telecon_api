import bcrypt from "bcryptjs";
import  jwt, { JwtPayload } from "jsonwebtoken";
import { APP_SECRET, SALT_ROUND } from "../config";
import { Types } from "mongoose";
import multer from "multer";
import path from 'path';
import fs from 'fs';

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads'); // Specify the directory where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
  });

export const upload = multer({ storage: storage });

const dir = './public/images/uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

export interface Payload extends JwtPayload { _id: Types.ObjectId, email:string, verified:boolean }

const salt =  bcrypt.genSaltSync(SALT_ROUND);

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, salt );
}

export const decryptPassword = ( password:string, hashedPassword:string ) => {
  return bcrypt.compareSync( password, hashedPassword);
}

export const signToken = ( obj:Payload ) => jwt.sign( obj, APP_SECRET, {expiresIn:"1h"});

export const verifyJwt = (jwtPayload: string) => jwt.verify(jwtPayload, APP_SECRET)