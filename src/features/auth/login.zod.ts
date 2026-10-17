import * as zod from 'zod'
export const loginSchema = zod.object({
    email: zod.string().email('Email Is Required'),
    password: zod.string().min(1,'password is requie').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
})
//quwe@mailinator.com
//Asd123456789#