import { z } from "zod";

const passwordRule =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .regex(
        passwordRule,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
    confirm: z.string().min(1, "Please confirm the new password"),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })
  .refine((d) => d.newPassword !== d.password, {
  message: "New password must be different from the current one",
  path: ["newPassword"],
})
  

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
//