import { Palette } from "./";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { TailSpin } from "react-loader-spinner";
import axios from "../utils/axios";

const New = () => {
    const { paletteWidth, loading, setLoading } = useAuth();
    const [newPalettes, setNewPalettes] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post("/palette/new", {
                numResults: 100,
            })
            .then(res => {
                setNewPalettes(res.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [])

    return (
        <div>
            <div className="container">
                {loading ?
                    <div className="spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    newPalettes.map((palette, i) =>
                        <Palette
                            key={i}
                            colors={palette.colors}
                            width={paletteWidth}
                            likes={palette.numVotes}
                            paletteId=""
                            title={palette.title}
                            tags=""
                            likeState={false}
                        />
                    )
                }
            </div>
        </div>
    )
};

export default New;