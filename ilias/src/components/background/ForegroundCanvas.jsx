import { useEffect, useRef } from "react";
import { StarShooting } from "./StarShooting";
export const ForegroundCanvas = ({ layer, scroll }) => {
    const canvasRef = useRef(undefined);
    const stars = useRef([]);
    const vWidth = window.screen.availWidth;
    const vHeight = window.screen.availHeight;
    const interval = useRef(null);
    const animate = (ctx) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        stars.current.forEach(star => star.animate(scroll.current))
        setTimeout(() => animate(ctx), 1000 / 30);
    }

    const createStar = (ctx) => {
        const star = new StarShooting(ctx, Math.random() * 10 + 15, Math.random() * 10 + 15);
        stars.current.push(star);
        stars.current = stars.current.filter(s => s.lifespan > 0)
    }
    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        if (!interval.current) interval.current = setInterval(() => createStar(ctx), 5000);
        animate(ctx)
    }, [canvasRef.current]);

    useEffect(() => {


    }, [])
    return (
        <canvas height={vHeight} width={vWidth} style={{ height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -1 }} ref={canvasRef} />
    )
}