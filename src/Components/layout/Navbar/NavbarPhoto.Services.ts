import axios from "axios";
import { api } from "../../../lib/axios";

export const uploadProfilePhoto = async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file)
    try {
        const res = await api.put(`/users/upload-photo`, formData)
        return res.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Status:', error.response?.status);
            console.error('Server says:', error.response?.data);
        }
        throw error;
    }
}