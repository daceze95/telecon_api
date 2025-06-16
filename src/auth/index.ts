import { NextFunction, Request, Response } from "express";
import { Payload, verifyJwt } from "../utils";
import { AuthRequest } from "../interface";
import { User } from "../models/userModel";

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "You're not authorized to perform this action!",
      error: "Unauthorized!"
    });
    return;
  }

  try {
    const verifiedToken = verifyJwt(token) as Payload;

    const user = await User.findById(verifiedToken._id);

    if(!user){
      res.status(404).json({
        status: "error",
        message: "User doesn't exist.",
        error: "User not found!"
      });
      return;
    }

    req.user = <Payload>verifiedToken;

    next();
  } catch (error:any) {
    res.status(401).json({
      status: "error",
      message: "Invalid token! Outer error",
      details: error.message
    });
  }
};
