import { AiOutlineHeart as Heart, AiFillHeart as FilledHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Palette = (props) => {
    const { userId } = useAuth();
    const colors = props.colors.map(color => {
        if (color[0] !== '#') 
            return color = '#' + color;
        return color;
    });
    const paletteTitle = props.title;
    const width = props.width;
    const [paletteId, setPaletteId] = useState(props.paletteId);
    const [likeCount, setLikeCount] = useState(props.likes);
    const [liked, setLiked] = useState(props.likeState);
    const [className, setClassName] = useState("color-link");
    let path = useLocation().pathname;

    const likeToggle = (likeState) => {
        if (likeState) {
            toast.info("Palette unsaved!"); 
        } else {
            toast.success("Palette saved!");
        }
        setLiked(prevState => !prevState);
        setLikeCount(prevCount => {
            if (likeState) {
                if (prevCount <= 1) return 0;
                return prevCount - 1
            };
            return prevCount + 1;
        });

        const paletteData = {
            paletteId: paletteId,
            colors: colors,
            likedByUser: userId,
            likes: likeCount,
            title: paletteTitle
        }
        
        if (likeState === false) {
            axios.patch("/palette", paletteData)
                .then((res) => {
                    // console.log("saved");
                    // console.log(res.data);
                })
                .catch((err) => {
                    toast.error(err.response.data);
                });   
        } else {
            axios.patch("/palette/unsave", paletteData)
                .then((res) => {
                    if (path === "/Collection") {
                        window.location.reload(false);
                    }
                    // console.log("unsaved");
                    // console.log(res.data);
                })
                .catch((err) => {
                    toast.error(err.response.data);
                });   
        }
    }

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [];
    }

    const getLightOrDark = (hex) => {
        const rgb = hexToRgb(hex);
        const [r, g, b] = rgb;
        const hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );
        if (hsp > 180) {
            return "#000000"; // color is light
        }
        return "#ffffff" // color is dark
    }
    
    const copy = (str) => {
        toast.success("Color Copied!");
    }

    return (
        <div className="item">
            <div
                className="palette"
                style={{
                    width: `${width}vw`,
                    height: `${width}vw`,
                }}
            >
                <CopyToClipboard
                    text={colors[0]}
                    onCopy={() => copy(colors[0])}
                >
                    <div 
                        className="color" 
                        style={{
                            backgroundColor: colors[0],
                            height: `${width}vw`,
                            width: `${width}vw`
                        }}
                    >
                        <span 
                            style={{ color: getLightOrDark(colors[0]) }} 
                            className="color-link"
                        >
                            {colors[0]}
                        </span>
                    </div>
                </CopyToClipboard>
                <CopyToClipboard
                    text={colors[1]}
                    onCopy={() => copy(colors[1])}
                >
                    <div 
                        className="color" 
                        style={{
                            backgroundColor: colors[1],
                            height: `${width / 1.6}vw`,
                            width: `${width}vw`
                        }}
                    >
                        <span
                            style={{ color: getLightOrDark(colors[1]) }}
                            className="color-link"
                        >
                            {colors[1]}
                        </span>
                    </div>
                </CopyToClipboard>
                <CopyToClipboard
                    text={colors[2]}
                    onCopy={() => copy(colors[2])}
                >
                    <div 
                        className="color" 
                        style={{
                            backgroundColor: colors[2],
                            height: `${width / 2.8}vw`,
                            width: `${width}vw`
                        }}
                    >
                        <span 
                            style={{ color: getLightOrDark(colors[2]) }} 
                            className="color-link"
                        >
                            {colors[2]}
                        </span>
                    </div>
                </CopyToClipboard>
                <CopyToClipboard
                    text={colors[3]}
                    onCopy={() => copy(colors[3])}
                >
                    <div 
                        className="color" 
                        style={{
                            backgroundColor: colors[3],
                            height: `${width / 6.1}vw`,
                            width: `${width}vw`
                        }}
                    >
                        <span 
                            style={{ color: getLightOrDark(colors[3]) }} 
                            className="color-link"
                        >
                            {colors[3]}
                        </span>
                    </div>
                </CopyToClipboard>
            </div>

            <div className="palette-like">
                <div
                    className="like-icon"
                    onClick={() => likeToggle(liked)}
                >
                    {(liked) ? <FilledHeart /> : <Heart />}
                </div>
                <div className="likes-count">
                    {likeCount}
                </div>
            </div>
            <div className="palette-desc">{paletteTitle}</div>
        </div>
    )
}

export default Palette;