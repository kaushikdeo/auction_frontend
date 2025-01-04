import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext";


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    console.log("contextcontext", context)
    if(!context) {
        throw new Error("useAuthContext must be used inside a AuthContextProvider")
    }
    return context;
}