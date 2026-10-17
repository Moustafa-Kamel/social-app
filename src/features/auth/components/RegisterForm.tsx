import { FieldError, Form, Input, Label, TextField, Select, ListBox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";

import { userDataRegister } from "../register.api";
import { registerSchema } from '../register.zod';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AppButton from "../../../SharedComponents/AppButton/AppButton";
import type { UserDataType } from "../register.types";



export default function RegisterForm() {

    const router = useNavigate()

    const { handleSubmit, register, control, formState: { errors, isSubmitting } } = useForm<UserDataType>({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            dateOfBirth: "",    
            gender: "male",
            password: "",
            rePassword: ""
        },
        mode: 'all',
        resolver: zodResolver(registerSchema)
    })


    function onSubmit(data: UserDataType) {
        toast.promise(userDataRegister(data), {
            loading: 'please wait',
            success: function (msg) {
                router('/login')
                return msg
            },
            error: function (msg) {
                return msg.message
            },
        })
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex mx-auto w-full max-w-md flex-col gap-4 p-6 bg-white my-10 rounded-4xl shadow-2xl sm:p-10">
            {/* {'name'} */}
            <TextField
                isRequired
                type="text"
                isInvalid={!!errors.name}
            >
                <Label>Name</Label>
                <Input {...register('name')} className='focus:ring-main-color' placeholder="Write Your Name" />
                {errors.name && <span className="text-sm text-red-500">{errors.name?.message}</span>}
                <FieldError />
            </TextField>
            {/* {'name'} */}

            {/* {'userName'} */}
            <TextField
                isRequired
                type="text"
                isInvalid={!!errors.username}

            >
                <Label>User Name</Label>
                <Input {...register('username')} className='focus:ring-main-color' placeholder="Enter your UserName" />
                <FieldError />
                {errors.username && <span className="text-sm text-red-500">{errors.username?.message}</span>}

            </TextField>
            {/* {'userName'} */}

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

            {/* {'date'} */}
            <TextField
                isRequired
                type="date"
                isInvalid={!!errors.dateOfBirth}

            >
                <Label>Date</Label>
                <Input {...register('dateOfBirth')} className='focus:ring-main-color' placeholder="Enter your password" />


                <FieldError />
                {errors.dateOfBirth && <span className="text-sm text-red-500">{errors.dateOfBirth?.message}</span>}

            </TextField>
            {/* {'date'} */}

            {/* {'gender'} */}
            {/* <Controller name="gender"  render={({ field }) => { */}


            <Controller name='gender' control={control} render={({ field }) => (
                <>
                    <Select {...field} placeholder="Select one" isInvalid={!!errors.gender} >
                        <Label>Gender</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="male" textValue="male">
                                    male
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="female" textValue="female">
                                    female
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>

                            </ListBox>
                        </Select.Popover>
                    </Select>
                    <FieldError />
                    {errors.gender && <span className="text-sm text-red-500">{errors.gender?.message}</span>}

                </>
            )} />


            {/* }}/> */}

            {/* {'gender'} */}

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

            {/* {'RePassword'} */}
            <TextField
                isRequired
                type="password"
                isInvalid={!!errors.rePassword}
            >
                <Label>Confirm Password</Label>
                <Input {...register('rePassword')} className='focus:ring-main-color' placeholder="Enter Your Confirm Password" />

                <FieldError />
                {errors.rePassword && <span className="text-sm text-red-500">{errors.rePassword?.message}</span>}

            </TextField>
            {/* {'RePassword'} */}

            <div className="flex gap-2 flex-col">
                {/* <Button className='w-full bg-main-color hover:bg-main-color/80 ' type="submit" isDisabled={isSubmitting} >
                    <Check />
                    Sign Up
                </Button> */}
                <AppButton className='w-full bg-main-color hover:bg-main-color/80 ' type="submit" isDisabled={isSubmitting}>
                    <Check />
                    Sign Up
                </AppButton>
                <AppButton className='w-full' type="reset" variant="danger">
                    Reset
                </AppButton>
            </div>
            
        </Form>
    )
}