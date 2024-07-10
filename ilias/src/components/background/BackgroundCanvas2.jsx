// src/ThreeScene.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

const Scene = () => {
  const meshRef = useRef();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      const hue = scrollY.current % 360;
      const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
      gsap.to(meshRef.current.material.color, {
        r: color.r,
        g: color.g,
        b: color.b,
        duration: 0.5,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={new THREE.Color("hsl(0, 100%, 50%)")} />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Scene />
    </Canvas>
  );
};

export default ThreeScene;
