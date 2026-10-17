
import { Navigate } from "react-router"
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // if(isLoading){
    //     return <LoadingSpinner/>
    // }
    if (localStorage.getItem('user_tkn')) {
        return children
    }
    return <Navigate to={'/login'}/>
  
}
