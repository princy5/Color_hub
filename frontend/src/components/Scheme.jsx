import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Palette } from "./";
import { TailSpin } from "react-loader-spinner";

const Scheme = () => {
    const { paletteWidth, loading, setLoading } = useAuth();
    const [paletteType, setPaletteType] = useState("Random");
    const [schemePalettes, setSchemePalettes] = useState([]);

    const axios = require("axios");

    const options = {
        method: 'GET',
        url: `https://random-palette-generator.p.rapidapi.com/palette/100/4`,
        headers: {
            'X-RapidAPI-Key': '124d5d93f5msh15031b5a949a625p1bc8b7jsnfc43bcf6c50a',
            'X-RapidAPI-Host': 'random-palette-generator.p.rapidapi.com'
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.request(options)
            .then(res => {
                setSchemePalettes(res.data.data);
                setPaletteType(res.data.type);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);
    
    return (
        <div className="scheme-container">
            <div className="container">
                {loading ?
                    <div className="spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    schemePalettes.map((palette, i) => 
                        <Palette
                            key={i}
                            colors={palette.palette}
                            width={paletteWidth}
                            likes={0}
                            paletteId=""
                            tags=""
                            likeState={false}
                        />
                    )
                }
            </div>
            <div className="scheme-options-container">
                <div className="">
                    <div className="palette-type">{paletteType.toUpperCase()}</div>
                </div>
            </div>
        </div>
    )
}

export default Scheme;