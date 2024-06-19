import { useEffect, useRef, useState } from "react";
import { Star } from "./Star";
import starArray from "../../assets/stars"
export const ForegroundImg = ({ layer, scroll }) => {
    const [top, setTop] = useState(0)
    const [opcaity, setOpacity] = useState(0)

    const animate = () => {
        setTop((-scroll.current * layer) / 500)
        setOpacity((scroll.current) / 500)

    }

    useEffect(() => {
        setInterval(animate, 100)
    }, [])

    return (
        <>
            <div className="StarsBG" key={layer} style={{ background: `url(${starArray[layer - 1].src})`, transform: `translateY(${top}px)`, opacity: opcaity, transition: "all ease .5s" }} />
        </>
    )
}