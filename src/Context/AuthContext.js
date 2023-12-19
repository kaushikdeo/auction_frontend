import { createContext, useEffect, useReducer, useState } from "react";
import { getItem } from "../utils/localStore";
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER } from "../graphql/queries/userQueries";

export const AuthContext = createContext();

export const authReducer = (prevState, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log("stata", {user: action.payload})
            return {user: action.payload}
        case "LOGOUT":
            console.log("stata", {user: null})
            return {user: null}
        case "UPDATEROLE":
            console.log("stata", {user: {...prevState, currentRole: action.payload} })
            return {user: {...prevState, currentRole: action.payload} }
        case "HYDRATEUSER": {
            console.log("PREV STATE", prevState, action.payload);
            console.log("stata", {user: {...prevState, user: action.payload} })
            return {user: {...prevState, user: action.payload} }
        }
        default:
            return prevState ;
    }
}

export const AuthContextProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser ] = useState(null);
    const { data, loading, error} = useQuery(GET_LOGGED_IN_USER);
    console.log("token from ls", getItem("auth_token"));
    useEffect(() => {
if (data && data.getMe && data.getMe.userId && !loading && !error) {
    console.log("data.getMe", data.getMe)
    setLoggedInUser(data.getMe)
    dispatch({type: 'HYDRATEUSER', payload: data.getMe})
}
    }, [data, loading, error])
    const [state, dispatch] = useReducer(authReducer, {
        user: loggedInUser,
        token: getItem("auth_token"),
    });
    console.log("AuthContext State: ", state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>
    )
}