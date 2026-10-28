
import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .email("Enter a valid email.")
    .trim()
    .min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
export const signInSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .trim()
    .min(1, "Email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const otpSchema = z.object({
  otp: z.string().min(1, "Enter the verification code."),
});

export type otpFormValues = z.infer<typeof otpSchema>;
export type SignUpFormSchema = z.infer<typeof signUpSchema>;
export type SignInFormSchema = z.infer<typeof signInSchema>;