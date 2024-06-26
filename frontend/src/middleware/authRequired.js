import { useAuth } from "../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthRequired = ({ children }) => {
    const { token } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error("You need to Login/Register first!");
            navigate("/login");
        }
    }, []);

    return (children);
}

export default AuthRequired;