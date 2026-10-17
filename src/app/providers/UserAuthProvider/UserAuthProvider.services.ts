import type { UserData, UserDataResponseTypeForData } from "./UserAuthProvider.interface";
import { api } from "../../../lib/axios";

export default async function getUserDataApi(): Promise<null | UserData> {

    const res = await api.get<UserDataResponseTypeForData>(`/users/profile-data`)
    return res.data.data.user

}