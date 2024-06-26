import { Palette } from "./";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { TailSpin } from "react-loader-spinner";
import axios from "../utils/axios";

const Popular = () => {
    const { paletteWidth, loading, setLoading, searchedPalettes } = useAuth();
    const [popularPalettes, setPopularPalettes] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post("/palette/popular", {
            numResults: 100,
        })
            .then(res => {
                setPopularPalettes(res.data);
                // console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setPopularPalettes(searchedPalettes);
        console.log(searchedPalettes);
    }, [searchedPalettes]);

    return (
        <div>
            <div className="container">
                {loading ?
                    <div className="spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    popularPalettes.map((palette, i) =>
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

export default Popular;