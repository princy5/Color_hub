import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";

const Search = (props) => {
    const { searchedPalettes, setLoading, setSearchedPalettes } = useAuth();
    const [inputValue, setInputValue] = useState("");
    const [focusClassName, setFocusClassname] = useState("search-suggestion-container hide")

    const colors = [{color:"Blue",code:"#0000FF"}, {color:"Red",code:"#ff0000"}, {color:"Green",code:"#00FF00"}, {color:"Yellow",code:"#FFE700"}, {color:"Pink",code:"#FF0098"},];
    const tags = ["Neon", "Gold", "Retro", "Vintage", "Dark", "Light", "Saturated", "Cold", "Warm"];

    const [options, setOptions] = useState({ numResults: 100 })

    useEffect(() => {
        setLoading(true);
        axios.post("/palette/popular", options)
            .then(res => {
                setSearchedPalettes(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [options]);

    const handleColorTagClick = (colorObj) => {
        setOptions({
            numResults: 100,
            hex: colorObj.code,
        });
    }
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        // console.log(inputValue);
    }

    const handleFocusIn = () => {
        setFocusClassname("search-suggestion-container show")
    }

    const handleFocusOut = () => {
        setFocusClassname("search-suggestion-container hide")
    }
    
    return (
        <div className="search-box-container">
            <input
                className="search-box"
                type="text"
                placeholder="Search Palettes"
                value={inputValue}
                onChange={e => handleInputChange(e)}
                onFocus={handleFocusIn}
                onBlur={handleFocusOut}
            />
            <div className={focusClassName}>
                <div className="color-category-container">
                    <div>Colors</div>
                    <div className="color-tag-container">
                        {colors.map((color, i) => (
                            <div
                                key={i}
                                className="color-tags"
                                onClick={() => handleColorTagClick(color)}
                            >
                                <div
                                    key={i}
                                    className="color-tag-circle"
                                    style={{ backgroundColor: color.code }}
                                />
                                {color.color}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tags-category-container">
                    <div>Tags</div>
                    <div className="color-tag-container">
                        {tags.map((tag, i) => (
                            <div
                                key={i}
                                className="color-tags"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Search;