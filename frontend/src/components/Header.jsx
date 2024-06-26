import { Search } from "."
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { ReactComponent as Logo } from "../assets/colorly-01.svg";

const Header = () => {
    let navigate = useNavigate();
    const { profileName } = useAuth();

    return (
        <div className="navbar">
            <div
                onClick={() => navigate("/")}
            >
                <Logo className="logo" />
            </div>
            <Search />
            <div
                className="profile-info"
            >
                <div className="profile-name">{profileName}</div>
            </div>
        </div>
    )
};

export default Header;