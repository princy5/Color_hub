import { useAuth } from "../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const NoAuthRequired = ({ children }) => {
    const { token } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (token) {
            toast.success("Already registered.");
            navigate("/");
        }
    }, []);

    return (children);
}

export default NoAuthRequired;