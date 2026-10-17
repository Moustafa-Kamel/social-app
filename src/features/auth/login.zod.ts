import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email (e.g. name@example.com)"),
  password: zod.string().min(1, "Password is required"),
});

export type LoginForm = zod.infer<typeof loginSchema>;
//quwe@mailinator.com
//Asd123456789#