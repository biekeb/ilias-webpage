import React, { useState, useRef, useEffect } from "react";
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
import { BackgroundCanvas } from "../components/background/BackgroundCanvas";
import AxesHelper from "./AxesHelper";
import { useGLTF } from "@react-three/drei";

const spaceshipURL =
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf";

export const PlaneScreen = () => {
  const [section, setSection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blendFactor, setBlendFactor] = useState(0);
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

  // This is where you place the updated useEffect block
  useEffect(() => {
    if (offset >= 5000) {
      setBlendFactor(1);
    } else if (offset >= 4000) {
      setBlendFactor((offset - 4000) / 1000);
    } else {
      setBlendFactor(0);
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
          <MorphingParticles blendFactor={blendFactor} offset={offset} />

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

          {/* <Particles parameters={parameters} offset={offset} /> */}

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

      {offset >= 3500 && offset < 4500 && (
        <Button3 onClick={handleButtonClick} />
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} />}

      {offset >= 3500 && offset < 4500 && (
        <Button4 onClick={handleButtonClick} />
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

const MorphingParticles = ({ blendFactor, offset }) => {
  const particlesRef = useRef();
  const torusKnotGeometry1 = new THREE.SphereGeometry(1, 32, 32);
  const torusKnotGeometry2 = new THREE.SphereGeometry(1, 32, 32);
  const sphereGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);

  const particlesCount = Math.min(
    torusKnotGeometry1.attributes.position.count,
    torusKnotGeometry2.attributes.position.count,
    sphereGeometry.attributes.position.count
  );

  const initialRandomPositions = useRef(new Float32Array(particlesCount * 3));
  const positions = new Float32Array(particlesCount * 3);

  // Generate initial random positions for the particles
  useEffect(() => {
    for (let i = 0; i < particlesCount; i++) {
      initialRandomPositions.current[i * 3] = (Math.random() - 0.5) * 10;
      initialRandomPositions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      initialRandomPositions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }, [particlesCount]);

  // Interpolate between random positions, TorusKnot, and Sphere positions
  for (let i = 0; i < particlesCount; i++) {
    const randomPosition = new THREE.Vector3(
      initialRandomPositions.current[i * 3],
      initialRandomPositions.current[i * 3 + 1],
      initialRandomPositions.current[i * 3 + 2]
    );

    const torusPosition1 = new THREE.Vector3(
      torusKnotGeometry1.attributes.position.getX(i) - 2,
      torusKnotGeometry1.attributes.position.getY(i),
      torusKnotGeometry1.attributes.position.getZ(i)
    );

    const torusPosition2 = new THREE.Vector3(
      torusKnotGeometry2.attributes.position.getX(i) + 2,
      torusKnotGeometry2.attributes.position.getY(i),
      torusKnotGeometry2.attributes.position.getZ(i)
    );

    const spherePosition = new THREE.Vector3(
      sphereGeometry.attributes.position.getX(i) + 3,
      sphereGeometry.attributes.position.getY(i),
      sphereGeometry.attributes.position.getZ(i)
    );

    let blendedPosition = new THREE.Vector3();
    if (offset < 2100) {
      // From offset 0 to 2100, use random positions
      blendedPosition = randomPosition;
    } else if (offset < 3300) {
      // From offset 2100 to 3300, transition from random positions to torus knots
      // Calculate the blend factor 't' based on the current offset
      const t = (offset - 2100) / 1200;
      // Interpolate between random positions and torus knot positions
      blendedPosition = new THREE.Vector3().lerpVectors(
        randomPosition,
        i % 2 === 0 ? torusPosition1 : torusPosition2,
        t
      );
    } else if (offset < 4800) {
      // From offset 3300 to 4800, stay at the torus knot positions
      blendedPosition = i % 2 === 0 ? torusPosition1 : torusPosition2;
    } else if (offset < 5000) {
      // From offset 4800 to 5000, transition from torus knots to sphere
      // Calculate the blend factor 't' based on the current offset
      const t = (offset - 4800) / 200;
      // Interpolate between torus knot positions and sphere position
      const intermediateTorusPosition =
        i % 2 === 0 ? torusPosition1 : torusPosition2;
      blendedPosition = new THREE.Vector3().lerpVectors(
        intermediateTorusPosition,
        spherePosition,
        t
      );
    } else {
      // After offset 5000, use sphere positions
      blendedPosition = spherePosition;
    }

    positions[i * 3] = blendedPosition.x;
    positions[i * 3 + 1] = blendedPosition.y;
    positions[i * 3 + 2] = blendedPosition.z;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: "#ffffff",
    sizeAttenuation: true,
    size: 0.03,
  });

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.position.x = offset >= 2000 ? 0 : -10; // Start the offset effect earlier
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

const Button3 = ({ onClick }) => {
  return (
    <div className="gif-button2">
      <button onClick={onClick}>Ilias</button>
    </div>
  );
};

const Button4 = ({ onClick }) => {
  return (
    <div className="gif-button">
      <button onClick={onClick}>alias</button>
    </div>
  );
};
