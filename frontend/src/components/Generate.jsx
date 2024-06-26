import React from "react";
import { Palette } from "./";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { TailSpin } from "react-loader-spinner";

const Generate = () => {
    const { loading, setLoading } = useAuth();
    const [palette, setPalette] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [likeState, setLikeState] = useState(false);
    const [options, setOptions] = useState(["N", "N", "N", "N", "N"]);
    const [color, setColor] = useState("#000000");
    const [rgb, setRgb] = useState([0, 0, 0]);

    const componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    const rgbToHex = ([r, g, b]) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    }

    var url = "http://colormind.io/api/";
    var http = new XMLHttpRequest();

    const getNewPalette = async () => {
        var data = {
            model: "default",
            input: options,
        };
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                var palette = JSON.parse(http.responseText).result;
                var temp_palette = [];
                palette.forEach(rgb => {
                    temp_palette.push(rgbToHex(rgb));
                });
                setPalette(temp_palette);
                setLoading(false);
            }
        }
        http.open("POST", url, true);
        http.send(JSON.stringify(data));
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
        setLoading(true);
        getNewPalette();

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        }
    }, [options, likeCount, likeState])
    
    const keyDownHandler = (e) => {
        if (e.code === "Space") {
            getNewPalette();
            setLikeCount(0);
            setLikeState(false);
        }
    }

    const handleColorChange = (e) => {
        const hex = e.target.value;
        setColor(hex);
        setRgb(hexToRgb(hex));
    }
    
    const handleAdd = () => {
        const newOptions = options.filter(rgb => rgb !== "N");
        if (newOptions.length < 5) {
            newOptions.push(hexToRgb(color));
            setOptions(newOptions);
        }
    }

    const handleRemove = (i) => {
        let newOptions = options;
        newOptions.splice(i, 1);
        if (newOptions.length === 0) {
            newOptions = ["N", "N", "N", "N", "N"];
        }
        setOptions(newOptions);
        getNewPalette();
        setLikeCount(0);
        setLikeState(false);
    }
    
    return (
        <div className="generate-container">
            <div className="generate-palette">
                {loading ? 
                    <div style={{width:"37.1vw", height:"35vw"}} className="generate-spinner">
                        <TailSpin width="80" color="#F23557"/>
                    </div>
                    :
                    <Palette
                        colors={palette}
                        width={35}
                        likes={likeCount}
                        paletteId=""
                        tags=""
                        likeState={likeState}
                     />
                }
            </div>
            <div className="generate-options-container">
                <div className="generate-desc">Hit the Spacebar to generate new palettes!<br/><br/>Add upto 5 colors and we will generate colour palettes using deep learning, based on colours added.</div>
                <div className="generate-add">
                    <div style={{ display: "flex", alignItems: "center", maxWidth: "fit-content" }}>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(e)}
                            className="color-picker"
                        />
                        <div>{color}</div>
                    </div>
                    <div
                        className="add-remove"
                        onClick={handleAdd}
                    >
                        Add
                    </div>
                </div>
                <div>Added Colors:</div>
                <div className="generate-added-colors">
                    {options.filter(color => color !== "N").map((color, i) => 
                        <div key={i} className="added-colors">
                            <div style={{ display: "flex", alignItems: "center", maxWidth: "fit-content" }}>
                                <div
                                    className="color-picker"
                                    style={{ backgroundColor: rgbToHex(color) }}
                                >
                                </div>
                                <div>{rgbToHex(color)}</div>
                            </div>
                            <div
                                className="add-remove"
                                onClick={() => handleRemove(i)}
                            >
                                Remove
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Generate;