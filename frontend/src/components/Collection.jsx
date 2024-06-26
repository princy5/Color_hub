import AuthRequired from "../middleware/authRequired";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Palette from "./Palette";
import { TailSpin } from "react-loader-spinner";

const Collection = () => {
    const { paletteWidth, token, loading, setLoading } = useAuth();
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get("/palette", {
                headers: {
                    authorization: "Token " + token,
                }
            })
            .then((res) => {
                setCollection(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data);
            })
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <AuthRequired>
            <div className="container">
                {loading ?
                    <div className="spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    collection.map((palette, i) => 
                        <Palette
                            key={i}
                            colors={palette.colors}
                            width={paletteWidth}
                            likes={palette.likes}
                            likeState={true}
                            paletteId={palette._id}
                            title={palette.title}
                        />
                    )
                }
            </div>
        </AuthRequired>
    )
}

export default Collection;