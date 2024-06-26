import { useContext, useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "../utils/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [paletteWidth, setPaletteWidth] = useState(60 / 3);
    const [userId, setUserId] = useState(1);
    const [profileName, setProfileName] = useState("");
    const [profileAvatar, setProfileAvatar] = useState("#");
    const [cookies, setCookies, removeCookies] = useCookies(["auth"]);
    const [token, setTokenState] = useState(cookies.token);
    const [loading, setLoading] = useState(false);
    const [searchedPalettes, setSearchedPalettes] = useState([]);

    const setToken = (newToken) => {
        setTokenState(newToken);
        setCookies("token", newToken, { path: "/" });   // cookie accessible on all pages
    }

    const deleteToken = () => {
        setTokenState(null);
        removeCookies("token");
    }

    const logout = () => {
        deleteToken();
        setProfileName("");
        setProfileAvatar("#");
    }

    useEffect(() => {
        if (token) {
            axios.get("/auth/profile", {
                headers: {
                    Authorization: "Token " + token,
                }
            })
            .then((res) => {
                setUserId(res.data.userId);
                setProfileName(res.data.name);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
        }
    }, [userId, profileName, profileAvatar, token]);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                deleteToken,
                userId,
                profileName,
                setProfileName,
                profileAvatar,
                setProfileAvatar,
                logout,
                paletteWidth,
                setPaletteWidth,
                loading,
                setLoading,
                searchedPalettes,
                setSearchedPalettes,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
