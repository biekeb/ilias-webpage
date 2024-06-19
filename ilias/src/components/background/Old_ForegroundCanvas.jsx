import { useEffect, useRef } from "react";
import { Star } from "./Star";
export const OLD_ForegroundCanvas = ({ layer, scroll }) => {
    const canvasRef = useRef(undefined);
    const stars = useRef([]);
    const vWidth = window.screen.availWidth;
    const vHeight = window.screen.availHeight;
    const animate = (ctx) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        stars.current.forEach(star => star.animate(scroll.current))
        setTimeout(() => animate(ctx), 1000 / 30);
    }

    const createStar = (ctx) => {
        const starsArr = [];
        for (let i = 0; i < 2500; i++) {
            const star = new Star(ctx, layer);
            starsArr.push(star);
        }
        stars.current = starsArr;
    }
    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        createStar(ctx);
        animate(ctx)
    }, [canvasRef.current]);

    useEffect(() => {
        setTimeout(() => {
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'StarsFixed.png');
            let canvas = canvasRef.current
            let dataURL = canvas.toDataURL('image/png');
            let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        }, 5000)


    }, [])
    return (
        <canvas height={vHeight} width={vWidth} style={{ height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -1 }} ref={canvasRef} />
    )
}