import React from "react";
import { animated, useSpring } from "@react-spring/web";
import logo from "../../styling/images/iliaslogo.png";

export const Start = () => {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 100 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
      className="start"
    >
      <img src={logo} alt="" />
      <h1 id="start-h1">
        FLY HIGH,
        <br />
        MANAGE SMART
      </h1>

      <h2 id="start-h2">THE INDUSTRY STANDARD FOR F-35 FLEET MANAGEMENT</h2>
      <div className="scroll-indicator">
        <div
          className="arrow"
          style={{ bottom: "25px", animationDelay: "0.15s" }}
        ></div>
        <div className="arrow" style={{ bottom: "40px" }}></div>
      </div>
    </animated.div>
  );
};
