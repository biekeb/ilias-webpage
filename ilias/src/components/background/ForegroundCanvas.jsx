import { useEffect, useRef, useState } from "react";
import { Star } from "./Star";
import starArray from "../../assets/stars"
export const ForegroundCanvas = ({ layer, scroll }) => {
    const canvasRef = useRef(undefined);
    const stars = useRef([]);
    const vWidth = window.screen.availWidth;
    const vHeight = window.screen.availHeight;
    const [top,setTop] = useState(0)
    // const animate = (ctx) => {
    //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //     stars.current.forEach(star => star.animate(scroll.current))
    //     setTimeout(() => animate(ctx), 1000 / 30);
    // }

    // const createStar = (ctx) => {
    //     const starsArr = [];
    //     for (let i = 0; i < 80; i++) {
    //         const star = new Star(ctx, layer);
    //         starsArr.push(star);
    //     }
    //     stars.current = starsArr;
    // }
    // useEffect(() => {
    //     const ctx = canvasRef.current.getContext("2d");
    //     createStar(ctx);
    //     animate(ctx)
    // }, [canvasRef.current]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         let canvasUrl = canvasRef.current.toDataURL();
    //         // Create an anchor, and set the href value to our data URL
    //         const createEl = document.createElement('a');
    //         createEl.href = canvasUrl;

    //         // This is the name of our downloaded file
    //         createEl.download = "Stars " + layer;

    //         // Click the download button, causing a download, and then remove it
    //         createEl.click();
    //         createEl.remove();

    //     }, 10000)
    // }, [])
    const animate = () => {
        setTop((-scroll.current * layer) / 500)
    }

    useEffect(()=>{
        setInterval(animate,100)
    },[])

    return (
        <>
            <div className="StarsBG" key={layer} style={{ background:`url(${starArray[layer - 1].src})`, transform:`translateY(${top}px)`, transition: "transform ease .5s" }} />
            {/* <canvas height={vHeight} width={vWidth} style={{ height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -1 }} ref={canvasRef} /> */}
        </>
    )
}