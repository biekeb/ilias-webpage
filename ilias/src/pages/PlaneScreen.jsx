import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Scroll,
  ScrollControls,
  Clouds,
  Cloud,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import F16 from "../components/3D/f16";
import { ScrollManager } from "./ScrollManager";
import { Interface } from "./Interface";
import { framerMotionConfig } from "./config";
import { MotionConfig } from "framer-motion";
import { BackgroundCanvas } from "../components/background/BackgroundCanvas";
import AxesHelper from "./AxesHelper";
import ParticleText from "./Test";

export const PlaneScreen = () => {
  const [section, setSection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shape, setShape] = useState("torusKnot"); // Track the current shape
  const scene = new THREE.Scene();

  const parameters = {
    materialColor: "#ffeded",
  };

  const cursor = useRef({ x: 0, y: 0 });

  window.addEventListener("mousemove", (event) => {
    cursor.current.x = event.clientX;
    cursor.current.y = event.clientY;
  });

  const scroll = useRef(0);

  const [offset, setOffset] = useState(0);

  console.log(offset);

  useEffect(() => {
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
    return () => {
      document
        .querySelectorAll("canvas[data-engine*='three.js']+div")?.[0]
        ?.removeEventListener("scroll", scrollCount);
    };
  }, []);

  useEffect(() => {
    if (offset >= 4000) {
      setShape("sphere");
    } else {
      setShape("torusKnot");
    }
  }, [offset]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

          {/* Particles */}
          <Particles parameters={parameters} offset={offset} />
          {shape === "torusKnot" ? <ParticleTorusKnot /> : <ParticleSphere />}

          <ScrollControls pages={7} damping={0.1}>
            <Scroll>
              <Clouds material={THREE.MeshLambertMaterial} limit={400}>
                <Cloud position={[-4, -2, 0]} speed={0.2} opacity={0.2} />
                <Cloud position={[4, -2, 0]} speed={0.2} opacity={0.5} />
                <Cloud position={[0, 0, 0]} speed={0.2} opacity={0.2} />
              </Clouds>
            </Scroll>
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

          <AxesHelper size={5} />
        </Canvas>
      </MotionConfig>
      {offset >= 1500 && offset < 1900 && (
        <Button onClick={handleButtonClick} />
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} />}

      {offset >= 2400 && offset < 2800 && (
        <Button2 onClick={handleButtonClick} />
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

const ParticleTorusKnot = () => {
  const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const particlesCount = torusKnotGeometry.attributes.position.count;
  const positions = new Float32Array(particlesCount * 3);

  // Extract the positions from the TorusKnot geometry
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = torusKnotGeometry.attributes.position.getX(i);
    positions[i * 3 + 1] = torusKnotGeometry.attributes.position.getY(i);
    positions[i * 3 + 2] = torusKnotGeometry.attributes.position.getZ(i);
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: "#ff0000",
    sizeAttenuation: true,
    size: 0.03,
  });

  return <points geometry={particlesGeometry} material={particlesMaterial} />;
};

const ParticleSphere = () => {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const particlesCount = sphereGeometry.attributes.position.count;
  const positions = new Float32Array(particlesCount * 3);

  // Extract the positions from the Sphere geometry
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = sphereGeometry.attributes.position.getX(i);
    positions[i * 3 + 1] = sphereGeometry.attributes.position.getY(i);
    positions[i * 3 + 2] = sphereGeometry.attributes.position.getZ(i);
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: "#00ff00",
    sizeAttenuation: true,
    size: 0.03,
  });

  return <points geometry={particlesGeometry} material={particlesMaterial} />;
};

const Particles = ({ parameters, offset }) => {
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = -2 + Math.random(); // Random value between -1 and 0
    positions[i * 3 + 1] = Math.random(); // Random value between 0 and 1
    positions[i * 3 + 2] = Math.random(); // Random value between 0 and 1
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
  });

  const particlesRef = useRef();

  // Update particles position based on offset
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.position.x = offset >= 3000 ? 0 : -10;
    }
  });

  return (
    <points
      ref={particlesRef}
      geometry={particlesGeometry}
      material={particlesMaterial}
    />
  );
};

const Button = ({ onClick }) => {
  return (
    <div className="gif-button">
      <button onClick={onClick}>1</button>
    </div>
  );
};

const Modal = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2>Modal Title</h2>
        <p>This is a modal content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Button2 = ({ onClick }) => {
  return (
    <div className="gif-button2">
      <button onClick={onClick}>2</button>
    </div>
  );
};

export default PlaneScreen;
