import * as zod from 'zod'
export const registerSchema = zod.object({
    name: zod.string().regex(/^[a-zA-Z0-9_\s]+$/, 'Name Is Required'),
    username: zod.string().regex(/^[a-z0-9_-]{3,15}$/, 'User Name Is Required'),
    email: zod.string().email('Email Is Required'),
    dateOfBirth: zod.string().refine(function (value) {

        const currentDate = new Date();
        const userDate = new Date(value)
        if (currentDate.getFullYear() - userDate.getFullYear() > 21) {
            return true
        }
        return false
    }, {
        message: 'Your Age Must Be Above 21 Years Old'
    }),
    gender: zod.enum(['male', 'female']),
    password: zod.string().min(1,'password is requie').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
    rePassword: zod.string().min(1, 'Please confirm your password'),
}).refine(function (data) {
    return data.password === data.rePassword
}, {
    message: "Password and Confirm Password Should Be Same",
    path: ["rePassword"]
})