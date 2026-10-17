import { createContext } from "react";
import type { UserAuthContextType } from "./UserAuthProvider.interface";

export const UserAuthContext = createContext<UserAuthContextType>({
    userData: null,
    setUserData: () => {},
    isLoading: true
});