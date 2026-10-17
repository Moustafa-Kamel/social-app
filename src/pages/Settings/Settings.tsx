import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, TextField, Label, Input, FieldError } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import AppButton from "../../SharedComponents/AppButton/AppButton";
import { changePasswordSchema, type ChangePasswordForm } from "../../features/users/changePassword.zod";
import { useChangePassword } from "../../features/users/users.hooks";

export default function Settings() {
  const change = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = (v: ChangePasswordForm) => {
    change.mutate(
      { password: v.password, newPassword: v.newPassword },
      { onSuccess: () => reset() }
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-10 flex w-full max-w-md flex-col gap-4 rounded-4xl bg-white p-10 shadow-2xl"
    >
      <h1 className="text-lg font-extrabold text-slate-900">Change password</h1>

      {/* Current password */}
      <TextField isRequired type="password" isInvalid={!!errors.password}>
        <Label>Current password</Label>
        <Input {...register("password")} className="focus:ring-main-color" placeholder="Enter your current password" />
        <FieldError />
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
      </TextField>

      {/* New password */}
      <TextField isRequired type="password" isInvalid={!!errors.newPassword}>
        <Label>New password</Label>
        <Input {...register("newPassword")} className="focus:ring-main-color" placeholder="Enter your new password" />
        <FieldError />
        {errors.newPassword && <span className="text-sm text-red-500">{errors.newPassword.message}</span>}
      </TextField>

      {/* Confirm */}
      <TextField isRequired type="password" isInvalid={!!errors.confirm}>
        <Label>Confirm new password</Label>
        <Input {...register("confirm")} className="focus:ring-main-color" placeholder="Confirm your new password" />
        <FieldError />
        {errors.confirm && <span className="text-sm text-red-500">{errors.confirm.message}</span>}
      </TextField>

      <div className="flex flex-col gap-2">
        <AppButton className="w-full bg-main-color hover:bg-main-color/80" type="submit" isDisabled={change.isPending}>
          <Check />
          {change.isPending ? "Saving..." : "Change password"}
        </AppButton>
        <AppButton className="w-full" type="reset" variant="danger" onPress={() => reset()}>
          Reset
        </AppButton>
      </div>
    </Form>
  );
}