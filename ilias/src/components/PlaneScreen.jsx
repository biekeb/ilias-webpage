import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Scroll, ScrollControls, Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";
import F16 from "./f16";
import { Mission } from "./Mission";
import { Start } from "./Start";

export const PlaneScreen = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <spotLight
        angle={0.14}
        color="#ffd0d0"
        penumbra={1}
        position={[25, 50, -20]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        castShadow
      />
      <color attach="background" args={["#005779"]} />
      <ambientLight intensity={1} />

      <ScrollControls pages={4} damping={0.1}>
        <Float speed={1} rotationIntensity={1} floatIntensity={0.1} floatingRange={[1, 10]}>
          <F16 />
          <Scroll>
            <Clouds material={THREE.MeshBasicMaterial}>
              <Cloud segments={40} fade={70} bounds={[10, 0, 2]} volume={5} color="white" />
              <Cloud seed={5} scale={2} volume={5} color="white" fade={50} />
            </Clouds>
          </Scroll>
        </Float>
        <F16 />
        <Scroll html>
          <Mission />
          <Start />
          <div className="homepage">
            <h1>
              Ready and in control:
              <br />
              to your mission and back
            </h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam laboriosam maxime hic
              reprehenderit, alias quisquam, aliquid animi illum repellendus eos eum officia quis
              molestiae. Veritatis non expedita aut similique rem.
            </p>
          </div>
          <h1 style={{ color: "black", top: "100vh" }}>second page</h1>
          <h1 style={{ color: "black", top: "200vh" }}>third page</h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};
