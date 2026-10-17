import { Button } from "@heroui/react";
import type React from "react";

export default function AppButton({children,...props}:React.ComponentProps<typeof Button>) {
  return (
    <Button {...props}>{children}</Button>
  )
}
