import React from "react";
import { animated, useSpring } from "@react-spring/web";

export const FirstSection = () => {

  return (
    <animated.div
      style={{
      }}
      className="fs"
    >
      <div className="fs-text">
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
