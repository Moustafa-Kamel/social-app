import axios from 'axios';
import type { RegisterResponseType, UserDataType } from './register.types';
import { api } from '../../lib/axios';
export interface ApiErrorResponse {
    message?: string;
    errors?: string;
    success?: boolean;
}
export async function userDataRegister(userData: UserDataType) {
    try {
        const response = await api.post<RegisterResponseType>(`/users/signup`, userData);
        return response.data.message;
    } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
            throw new Error(error.response?.data?.message || "حدث خطأ في التسجيل",
                { cause: error }
            );
        }
        else {
            throw new Error("حدث خطأ غير متوقع",
                { cause: error }

            );
        }
    }
}