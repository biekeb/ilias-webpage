import React from "react";
import { animated, useSpring } from "@react-spring/web";

export const Intro = () => {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 100 },
  });

  return (
    <animated.div
      style={{
        ...springs,
      }}
      className="intro"
    >
      <p>
        ILIAS Solutions provides an advanced fleet management platform tailored
        for defense environments. It integrates with the Autonomic Logistics
        Information System (ALIS) for advanced fighter aircraft like the F-35,
        offering real-time data synchronization and visualization to enhance
        operational efficiency and decision-making.
      </p>
    </animated.div>
  );
};
