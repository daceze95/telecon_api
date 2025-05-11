import { NextFunction, Request, Response} from 'express';
import path from 'path';

export const indexController = (req:Request, res:Response, next:NextFunction)  => {
  // res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  res.status(200).json({
    msg: "Hello client!"
  })
}