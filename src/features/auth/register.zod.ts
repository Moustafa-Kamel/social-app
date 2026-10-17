// import * as zod from 'zod'
// export const registerSchema = zod.object({
//     name: zod.string().regex(/^[a-zA-Z0-9_\s]+$/, 'Name must be at least 2 characters'),
//     username: zod.string().regex(/^[a-z0-9_-]{3,15}$/, 'Username must be 3-30 chars (a-z, 0-9, _).'),
//     email: zod.string().email('Please enter a valid email address.'),
//     dateOfBirth: zod.string().refine(function (value) {

//         const currentDate = new Date();
//         const userDate = new Date(value)
//         if (currentDate.getFullYear() - userDate.getFullYear() > 21) {
//             return true
//         }
//         return false
//     }, {
//         message: 'Your Age Must Be Above 21 Years Old'
//     }),
//     gender: zod.enum(['male', 'female']),
//     password: zod.string().min(1,'password is requie').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
//     rePassword: zod.string().min(1, 'Please confirm your password'),
// }).refine(function (data) {
//     return data.password === data.rePassword
// }, {
//     message: "Password and Confirm Password Should Be Same",
//     path: ["rePassword"]
// })

import * as zod from "zod";

const MIN_AGE = 21; // غيّره لو المطلوب سن تاني

const getAge = (value: string) => {
  const birth = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hadBirthday) age--;
  return age;
};

// الباسورد: كل شرط له رسالته، فاليوزر يعرف الناقص بالظبط
export const passwordSchema = zod
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter (A-Z)")
  .regex(/[a-z]/, "Password must include at least one lowercase letter (a-z)")
  .regex(/[0-9]/, "Password must include at least one number (0-9)")
  .regex(/[#?!@$%^&*-]/, "Password must include at least one special character (# ? ! @ $ % ^ & * -)");

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .regex(/^[a-zA-Z0-9_\s]+$/, "Name can only contain letters, numbers, spaces and _"),

    username: zod
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be at most 15 characters")
      .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, _ and -"),

    email: zod
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email (e.g. name@example.com)"),

    dateOfBirth: zod
      .string()
      .min(1, "Date of birth is required")
      .refine((v) => !Number.isNaN(new Date(v).getTime()), "Please enter a valid date")
      .refine((v) => getAge(v) >= MIN_AGE, `You must be at least ${MIN_AGE} years old`),

    gender: zod.enum(["male", "female"], { message: "Please select your gender" }),

    password: passwordSchema,

    rePassword: zod.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password and Confirm Password must be the same",
    path: ["rePassword"],
  });

export type RegisterForm = zod.infer<typeof registerSchema>;