import axios from 'axios';
import type { LoginResponseType, UserDataType } from './login.types';
import { api } from '../../lib/axios';
export interface ApiErrorResponse {
    message?: string;
    errors?: string;
    success?: boolean;
}
export async function userDataLogin(userData: UserDataType) {
    try {
        const response = await api.post<LoginResponseType>(`/users/signin`, userData);
        
        // return response.data.message;
        return response.data;

    } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
            throw new Error(error.response?.data?.message || "حدث خطأ في الدخول",
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