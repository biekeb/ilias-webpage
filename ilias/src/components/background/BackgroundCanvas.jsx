import { useEffect, useRef, useState } from "react";
import Dawn from "../../assets/dawn.jpg";
import Blue from "../../assets/blue.png";
import { ForegroundImg } from "./ForegroundImg";
import { StarsFixed } from "../../assets/stars";
import { ForegroundCanvas } from "./ForegroundCanvas";
import "./background.css";

const DawnImg = new Image();
DawnImg.src = Dawn;
const BlueImg = new Image();
BlueImg.src = Blue;
export const BackgroundCanvas = ({ scrollRef }) => {
  const contrast = 1.4;
  const brightness = 0.9;
  const hue = 0;
  const scroll = useRef(0);
  // const canvasRef = useRef(undefined);
  const [starsComponent, setStarsComponent] = useState([]);
  const vWidth = window.screen.availWidth;
  const vHeight = window.screen.availHeight;
  const [offset, setOffset] = useState(0);
  const getFilters = () => {
    // console.log(offset);
    if (offset < 50)
      return {
        brightnessTop: 1.5,
        opacity: 1,
        brightnessBot: 0.4,
        contrast: 1.4,
        hue: 0,
        opacityStars: 0,
      };
    if (offset < 1500)
      return {
        brightnessTop: 1.4,
        opacity: 1,
        brightnessBot: 0.9,
        contrast: 1.4,
        hue: 0,
        opacityStars: 0,
      };
    if (offset < 2500)
      return {
        brightnessTop: 0.5,
        opacity: 0.9,
        brightnessBot: 0.9,
        contrast: 1.4,
        hue: -60,
        opacityStars: 0,
      };
    else
      return {
        brightnessTop: 0.5,
        opacity: 0,
        brightnessBot: 0.5,
        contrast: 0.9,
        hue: -180,
        opacityStars: 1,
      };
  };

  // const checkContrastAndBrightness = (ctx) => {
  //     const offset = scroll.current;
  //     const contrastOffset = Math.max(1.4 - offset / 1000, 1);
  //     const brightnessOffset = Math.max(0.9 - offset / 5000, .75);
  //     const hue = Math.min(-150 + offset / 4, 150)
  //     const opacity = Math.max(2 - offset / 1000, 0);
  //     updatePicture(ctx, brightnessOffset, contrastOffset, hue, opacity)
  // }

  // const updatePicture = (ctx, brightness, contrast, hue, opacity) => {
  //     hue = hue > 0 ? hue : 0
  //     ctx.filter = `opacity(${Math.max(opacity, 0)}) brightness(${3-opacity})`;
  //     console.log(ctx.filter)
  //     ctx?.drawImage(BlueImg, 0, 0, vWidth, vHeight);
  //     ctx.filter = `brightness(${brightness}) contrast(${contrast}) hue-rotate(${-hue}deg)`;
  //     console.log(ctx.filter)

  //     ctx?.drawImage(DawnImg, 0, 0, vWidth, vHeight);

  //     ctx.filter = "";
  // }

  // const animate = (ctx) => {
  //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //     checkContrastAndBrightness(ctx);
  //     setTimeout(() => animate(ctx), 1000 / 30);
  // }

  const createStar = () => {
    const starsArr = [];
    for (let i = 1; i <= 10; i++) {
      starsArr.push(<ForegroundImg layer={i} scroll={scroll} />);
    }
    setStarsComponent(starsArr);
  };

  useEffect(() => {
    createStar();
    setInterval(() => setOffset(scroll.current), 100);
  }, []);

  useEffect(() => {
    const scrollCount = (e) => {
      scroll.current = e.target.scrollTop;
    };
    setTimeout(
      () =>
        document
          .querySelectorAll("canvas[data-engine*='three.js']+div")[0]
          .addEventListener("scroll", scrollCount),
      2000
    );
    return document
      .querySelectorAll("canvas[data-engine*='three.js']+div")?.[0]
      ?.removeEventListener("scroll", scrollCount);
  }, []);

  const filters = getFilters();
  return (
    <>
      <div style={{ position: "relative", zIndex: 0 }}>
        <div
          style={{
            zIndex: 1,
            opacity: filters.opacityStars,
            pointerEvents: "none",
            position: "absolute",
            transition: "opacity 1s 1s",
          }}
        >
          <div
            className="StarsFixed"
            style={{
              background: `url(${StarsFixed.src})`,
              height: "100vh",
              width: "100vw",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
            }}
          ></div>
          {starsComponent}
          <ForegroundCanvas scroll={scroll} />
        </div>
        <div>
          <img
            className="skyPicture"
            src={DawnImg.src}
            style={{
              height: "100vh",
              width: "100vw",
              position: "absolute",
              filter: `brightness(${filters?.brightnessBot}) contrast(${filters?.contrast}) hue-rotate(${filters?.hue}deg)`,
              left: 0,
              top: 0,
            }}
          ></img>
        </div>
        <div
          className="skyPicture"
          style={{
            background: `url(${BlueImg.src}) no-repeat`,
            backgroundSize: "100%",
            height: "100vh",
            width: "100vw",
            filter: `opacity(${filters?.opacity}) brightness(${filters?.brightnessTop})`,
            position: "absolute",
            left: 0,
            top: 0,
            mixBlendMode: "screen",
          }}
        ></div>
        {/* <div style={{background:`url${BlueImg.src}`, filter:"brightness(0.9) contrast(1.4) hue-rotate(0deg)"}} ></div> */}
        {/* <canvas height={vHeight} width={vWidth} style={{ height: "100vh", width: "100vw", position: "absolute", left: 0, top: 0, zIndex: -2 }} ref={canvasRef} /> */}

        {/* <OLD_ForegroundCanvas scroll={scroll} layer="1" /> */}
      </div>
    </>
  );
};
