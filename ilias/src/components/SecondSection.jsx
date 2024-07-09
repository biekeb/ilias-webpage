import React from "react";
import { animated, useSpring } from "@react-spring/web";
import logo from "../styling/images/iliaslogo.png";

export const SecondSection = () => {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 100 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
      className="ss"
    >
      <div className="ss-text">
        <div>
          <h2 id="title-span">Plan, Schedule & Control</h2>
        </div>
        <p>
          Ensures efficient maintenance and operational task coordination thanks
          to comprehensive planning and scheduling capabilities, including the
          creation of detailed maintenance schedules, asset availability
          prediction, and asset deployment coordination.
        </p>
      </div>
    </animated.div>
  );
};
