import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Palette } from "./";
import { TailSpin } from "react-loader-spinner";
import axios from "../utils/axios";

const Random = () => {
    const { paletteWidth, loading, setLoading } = useAuth();
    const [randomPalette, setRandomPalette] = useState({ id: 2439624, title: 'Pick your orange.', numVotes: 2, colors: [] });

    const getNewPalette = () => {
        setLoading(true);
        axios.get("/palette/random")
            .then(res => {
                setRandomPalette(res.data[0]);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }
    
    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
        getNewPalette();

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        }
    }, []);

    const keyDownHandler = (e) => {
        if (e.code === "Space") {
            getNewPalette();
        }
    }
    
    return (
        <div className="random-container">
            <div className="random-screen">
                {loading ?
                    <div className="spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    <Palette
                        colors={randomPalette.colors}
                        width={35}
                        likes={randomPalette.numVotes}
                        title={randomPalette.title}
                        paletteId=""
                        tags=""
                        likeState={false}
                    />
                }
            </div>
        </div>
    )
}

export default Random;