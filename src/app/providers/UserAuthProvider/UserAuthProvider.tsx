import React, { useEffect, useState } from "react";
import { UserAuthContext } from "./UserAuthContext";
import getUserDataApi from "./UserAuthProvider.services";
import type { UserData } from "./UserAuthProvider.interface";


export default function UserAuthProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null)
const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem('user_tkn'))

useEffect(() => {
  if (!localStorage.getItem('user_tkn')) return
  getUserDataApi()
    .then(setUserData)
    .catch(() => setUserData(null))
    .finally(() => setIsLoading(false))
}, [])
    return (
        <UserAuthContext.Provider value={{ userData, setUserData, isLoading }}>
            {children}
        </UserAuthContext.Provider>
    )
}