import { useContext } from "react"
import { UserAuthContext } from "../../providers/UserAuthProvider/UserAuthContext"
import { Navigate } from "react-router"
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default function AuthProtected({ children }: { children: React.ReactNode }) {
    const { userData } = useContext(UserAuthContext)
    // if (isLoading) {
    //     return <LoadingSpinner/>
    // }
    if (userData) {
        return <Navigate to={'/'} />
    }
    return (
        children
    )
}
