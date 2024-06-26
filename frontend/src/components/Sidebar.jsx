import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/auth";
import { BsStar, BsStarFill, BsPen, BsPenFill, BsShuffle, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoColorFilterOutline } from "react-icons/io5";
import { AiFillFire, AiOutlineFire } from "react-icons/ai";

const Sidebar = () => {
    let navigate = useNavigate();
    let path = useLocation().pathname;
    const { logout, token } = useAuth();

    return (
        <div className="sidebar">
            <ul className="sidebar-navs">
                <li
                    onClick={() => navigate("/")}
                    className={path === "/" ? "selected-sidebar" : ""}
                >
                    {path === "/" ?
                        <AiFillFire className="sidebar-icons-2" />
                        :
                        <AiOutlineFire className="sidebar-icons-2" />
                    } Popular
                </li>
                <li
                    onClick={() => navigate("/new")}
                    className={path === "/new" ? "selected-sidebar" : ""}
                >
                    {path === "/new" ?
                        <BsStarFill className="sidebar-icons" />
                        :
                        <BsStar className="sidebar-icons" />
                    } New
                </li>
                <li
                    onClick={() => navigate("/Generate")}
                    className={path === "/Generate" ? "selected-sidebar" : ""}
                >
                    {path === "/Generate" ?
                        <BsPenFill className="sidebar-icons" />
                        :
                        <BsPen className="sidebar-icons" />
                    } Generate
                </li>
                <li
                    onClick={() => navigate("/Random")}
                    className={path === "/Random" ? "selected-sidebar" : ""}
                >
                    <BsShuffle className="sidebar-icons"/> Random
                </li>
                <li
                    onClick={() => navigate("/scheme")}
                    className={path === "/scheme" ? "selected-sidebar" : ""}
                >
                    <IoColorFilterOutline className="sidebar-icons-2" /> Scheme
                </li>
                <li
                    onClick={() => navigate("/Collection")}
                    className={path === "/Collection" ? "selected-sidebar" : ""}
                >
                    {path === "/Collection" ?
                        <BsHeartFill className="sidebar-icons" />
                        :
                        <BsHeart className="sidebar-icons" />
                    } Collection
                </li>
            </ul>
            <div className="login-logout-container">
                {token ?
                    <button
                        className="login-logout-btn"
                        type="submit"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                    :
                    <button
                        className="login-logout-btn"
                        type="submit"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                }
            </div>
        </div>
    )
};

export default Sidebar;