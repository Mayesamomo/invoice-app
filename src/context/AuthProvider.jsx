/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                auth: true,
                user: action.payload,
                role: action.payload.role,
                accessToken: action.payload.token,
            };
        case "REGISTER":
            return {
                ...state,
                auth: true,
                user: action.payload.user,
                // role: action.payload.role,
                accessToken: action.payload.accessToken,
            };
        case "LOGOUT":
            return {
                ...state,
                auth: false,
                user: null,
                role: null,
                accessToken: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        role: null,
        auth: false,
        accessToken: null,
    });
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch({
                type: "LOGIN",
                payload: JSON.parse(user),
            });
        }
    }, []);

    console.log("AuthContext state: ", state);
    return (
        <AuthContext.Provider
            value={{ ...state, dispatch }}
        >
            {children}
        </AuthContext.Provider>
    )
};