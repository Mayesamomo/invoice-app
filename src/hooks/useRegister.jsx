import { useState } from "react";
import axios from "axios";
import API_URL from "../Api/server";
import useAuth from "./useAuth";    

export const useRegister = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuth();

    const register = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${API_URL}auth/register`,
                {
                    email,
                    password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const json = await res.json();

            if (!res === 200) {
                setLoading(false);
                setError(json.error);
            }
            if (res === 200) {
                localStorage.setItem("user", JSON.stringify(json));
                dispatch({
                    type: "REGISTER",
                    payload: json,
                });
                setLoading(false);
                setError("");
            }
        } catch (err) {
            if (!err.res) {
                console.log(err);
                setError("No Server Response");
            } else if (err.res.status === 400) {
                setError("Invalid Credentials");
            } else if (err.res.status === 401) {
                setError("Unauthorized");
            } else {
                setError("Login failed");
            }
        }
    };
    return { register, error, loading };
};