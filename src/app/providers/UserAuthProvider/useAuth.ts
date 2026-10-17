import { useContext } from "react";
import { UserAuthContext } from "./UserAuthContext";

export default function useAuth(){
    const context = useContext(UserAuthContext);
    if (!context) {
    throw new Error("useAuth must be used within UserAuthProvider");
  }
  return context;
}