import { useEffect, useRef, useState } from "react";
import Dawn from "../../assets/dawn2.png";
import Blue from "../../assets/blue.png";
import { ForegroundImg } from "./ForegroundImg";
import { StarsFixed } from "../../assets/stars";
import { ForegroundCanvas } from "./ForegroundCanvas";

const DawnImg = new Image();
DawnImg.src = Dawn;
const BlueImg = new Image();
BlueImg.src = Blue;
export const BackgroundCanvas = ({ scrollRef }) => {
    const contrast = 1.4
    const brightness = .9
    const hue = 0
    const scroll = useRef(0);
    const canvasRef = useRef(undefined);
    const [starsComponent, setStarsComponent] = useState([]);
    const vWidth = window.screen.availWidth;
    const vHeight = window.screen.availHeight;

    const checkContrastAndBrightness = (ctx) => {
        const offset = scroll.current;
        const contrastOffset = Math.max(1.4 - offset / 1000, 1);
        const brightnessOffset = Math.max(0.9 - offset / 5000, .75);
        const hue = Math.min(-150 + offset / 4, 150)
        const opacity = Math.max(1.4 - offset / 1000, 0);
        updatePicture(ctx, brightnessOffset, contrastOffset, hue, opacity)
    }

    const updatePicture = (ctx, brightness, contrast, hue, opacity) => {
        hue = hue > 0 ? hue : 0
        ctx.filter = `opacity(${Math.max(opacity, 0)})`;
        ctx?.drawImage(BlueImg, 0, 0, vWidth, vHeight);
        ctx.filter = `brightness(${brightness}) contrast(${contrast}) hue-rotate(${-hue}deg)`;
        ctx?.drawImage(DawnImg, 0, 0, vWidth, vHeight);

        ctx.filter = "";
    }

    const animate = (ctx) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        checkContrastAndBrightness(ctx);
        setTimeout(() => animate(ctx), 1000 / 30);
    }

    const createStar = (ctx) => {
        const starsArr = []
        for (let i = 1; i <= 10; i++) {
            starsArr.push(<ForegroundImg layer={i} scroll={scroll} />)
        }
        setStarsComponent(starsArr);
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        context.globalCompositeOperation = "screen"
        context.filter = '';
        createStar(context);
        console.log("Animated !")

        animate(context);
    }, [canvasRef.current]);

    useEffect(() => {
        const scrollCount = (e) => {
            console.log(e.target.scrollTop)
            scroll.current = e.target.scrollTop
        }
        setTimeout(() => document.querySelectorAll("canvas[data-engine*='three.js']+div")[0].addEventListener("scroll", scrollCount), 2000)
        return document.querySelectorAll("canvas[data-engine*='three.js']+div")?.[0]?.removeEventListener("scroll", scrollCount)
    }, [])

    return (
        <>
            <div>

                <canvas height={vHeight} width={vWidth} style={{ height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -2 }} ref={canvasRef} />


                <div className="StarsFixed" style={{ background: `url(${StarsFixed.src})`, height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -1 }} ></div>
                {starsComponent}
                <ForegroundCanvas scroll={scroll} />

                {/* <OLD_ForegroundCanvas scroll={scroll} layer="1" /> */}
            </div>
        </>
    )
}