import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import { fromError } from "zod-validation-error";
import { z as zod } from "zod";
import { decryptPassword, encryptPassword, signToken } from "../utils";
import { loginSchema, regSchema } from "../utils/validationSchema";
import { AuthRequest } from "../interface";
import path from "path";
import { Types } from "mongoose";
import fs from "fs";

// export const userController = (req:Request, res:Response )  => {
//   res.send('respond with a resource(s)');
// }

export const userController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Drop the phone index (ONLY RUN THIS ONCE, NOT IN EVERY REQUEST)
    // await User.collection.dropIndex("phone_1");

    // Get all indexes in the User collection
    const indexes = await User.collection.indexes();

    res.json({ status: "success", indexes });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "An error occurred",
      error: err.message,
    });
    return;
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fullName, email, password } = regSchema.parse(req.body); //validate user input

    const hashedPassword = encryptPassword(password); // hashpassword

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    // const finalRes = await User.findById({ _id: result._id }).select(
    //   "-password -__v"
    // );

    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      data: result,
    });
  } catch (err: any) {
    if (err instanceof zod.ZodError) {
      const validationErr = fromError(err);
      res.status(400).json({
        status: "error",
        message: "Invalid input data",
        details: validationErr?.details[0]?.message,
      });
      return;
    } else if (err.code === 11000) {
      // Handle duplicate email error
      res.status(400).json({
        status: "error",
        message: "Email already in use.",
      });
      return;
    } else {
      // Handle general server errors
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred.",
        error: err.message,
      });

      // next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "Email doesn't exist.",
        error: "User not found",
      });
      return;
    }

    let validate = decryptPassword(password, user.password);

    if (validate) {
      const token = signToken({
        _id: user._id,
        email,
        verified: user.verified,
      });

      res.status(200).json({
        status: "success",
        message: "Login successful.",
        token,
        data: user,
      });
      return;
    }

    res.status(400).json({
      status: "error",
      message: "Incorrect login details.",
      error: "Invalid email or password",
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "INTERNAL_SERVER_ERROR",
      error: err,
    });
  }
};

export const uploadProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { avatar: `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!user) {
      res.status(400).json({
        status: "error",
        message: "User doesn't exist",
        error: "User not found",
      });
      return;
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "upload successful.",
        avatar: user.avatar
      });
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {
  const userId = req.params.userId;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      status: "error",
      message: "Invalid user ID",
      error: "Provide a valid userID",
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "No use with the id was found.",
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "INTERNAL_SERVER_ERROR",
      error: error.message,
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  Next: NextFunction
) => {

  try {
    const users = await User.find();

    if (!users) {
      res.status(404).json({
        status: "error",
        message: "No users found.",
        error: "Users not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Users found",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "INTERNAL_SERVER_ERROR",
      error: error.message,
    });
  }
};
