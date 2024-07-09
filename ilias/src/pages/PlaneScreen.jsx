import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Scroll,
  ScrollControls,
  Clouds,
  Cloud,
} from "@react-three/drei";
import * as THREE from "three";
import F16 from "../components/3D/f16";
import { ScrollManager } from "./ScrollManager";
import { Interface } from "./Interface";
import { framerMotionConfig } from "./config";
import { MotionConfig } from "framer-motion";
import { Experience } from "./Expierence";
import { BackgroundCanvas } from "../components/background/BackgroundCanvas";

export const PlaneScreen = () => {
  const [section, setSection] = useState(0);

  return (
    <>
      <BackgroundCanvas />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas
          camera={{ position: [0, 3, 10], fov: 42 }}
          style={{ height: "100vh" }}
        >
          <spotLight
            angle={0.14}
            color="#ffd0d0"
            penumbra={1}
            position={[25, 50, -20]}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            castShadow
          />
          <ambientLight intensity={3} />

          <ScrollControls pages={7} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />

            <Scroll></Scroll>
            <Float
              speed={0.5}
              rotationIntensity={0.5}
              floatIntensity={0.1}
              floatingRange={[1, 10]}
            >
              <F16 />
            </Float>

            <Scroll html className="scroll">
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </MotionConfig>
    </>
  );
};
