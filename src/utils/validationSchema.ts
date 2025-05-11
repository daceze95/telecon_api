import { z as zod } from 'zod';

export const regSchema = zod.object({
    fullName: zod.string().trim().min(1, { message: "Name cannot be empty" }),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().trim().min(1, { message: "Password cannot be empty" }),
    // phone: z.string()
    //   .regex(/^\d{11,15}$/, 'Phone number must be 11 to 15 digits')
    //   .optional(),
  });

export const loginSchema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().trim().min(1, { message: "Password cannot be empty" })
  });