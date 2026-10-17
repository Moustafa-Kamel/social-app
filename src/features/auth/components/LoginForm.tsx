import { FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { userDataLogin } from "../login.api";
import { loginSchema } from '../login.zod';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AppButton from "../../../SharedComponents/AppButton/AppButton";
import { useContext } from "react";
import { UserAuthContext } from "../../../app/providers/UserAuthProvider/UserAuthContext";
import type { UserDataType } from "../login.types";



export default function LoginForm() {

    const router = useNavigate()
    const { setUserData } = useContext(UserAuthContext)
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<UserDataType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'all',
        resolver: zodResolver(loginSchema)
    })


    function onSubmit(data: UserDataType) {
        toast.promise(userDataLogin(data), {
            loading: 'please wait',
            success: function (data) {
               localStorage.setItem('user_tkn',data.data.token);
               setUserData(data.data.user)
                router('/feed')
                return <h1 className="text-emerald-500 capitalize">{data.message}</h1>
            },
            error: function (msg) {
                return msg.message
            },
        })
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex mx-auto w-full max-w-md flex-col gap-4 p-6 bg-white my-10 rounded-4xl shadow-2xl sm:p-10">

            {/* {'email'} */}
            <TextField
                isRequired
                type="email"
                isInvalid={!!errors.email}

            >
                <Label>Email</Label>
                <Input {...register('email')} className='focus:ring-main-color' placeholder="Enter your Email" />
                <FieldError />
                {errors.email && <span className="text-sm text-red-500">{errors.email?.message}</span>}

            </TextField>
            {/* {'email'} */}

            {/* {'password'} */}
            <TextField
                isRequired
                type="password"
                isInvalid={!!errors.password}
            >
                <Label>Password</Label>
                <Input {...register('password')} className='focus:ring-main-color' placeholder="Enter your password" />

                <FieldError />
                {errors.password && <span className="text-sm text-red-500">{errors.password?.message}</span>}

            </TextField>
            {/* {'password'} */}
            <div className="flex gap-2 flex-col">

                <AppButton className='w-full bg-main-color hover:bg-main-color/80 ' type="submit" isDisabled={isSubmitting}>
                    <Check />
                    Sign In
                </AppButton>
                <AppButton className='w-full' type="reset" variant="danger">
                    Reset
                </AppButton>
            </div>
        </Form>
    )
}