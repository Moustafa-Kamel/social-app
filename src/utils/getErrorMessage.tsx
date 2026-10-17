// utils/getErrorMessage.ts
import { isAxiosError } from "axios";

export const getErrorMessage = (e: unknown) =>
  isAxiosError(e) ? e.response?.data?.message ?? e.message : "Something went wrong";