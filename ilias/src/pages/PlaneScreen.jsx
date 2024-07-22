import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Scroll,
  useScroll,
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
import { RotatingSphere } from "../components/RotatingSphere/RotatingSphere"


const CloudsWithScroll = () => {
  const ref = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (!scroll) return;
    const opacity = 1 - Math.min(scroll.offset * 3, 1); // Adjust the multiplier and range as needed
    if (ref.current) {
      ref.current.children.forEach((cloud) => {
        if (!cloud.material) return;
        cloud.material.opacity = opacity;
      });
    }
  });

  return (
    <Clouds ref={ref} material={THREE.MeshLambertMaterial} limit={400}>
      <Cloud position={[-4, -2, 0]} speed={0.2} opacity={0.2} />
      <Cloud position={[4, -2, 0]} speed={0.2} opacity={0.5} />
      <Cloud position={[0, 0, 0]} speed={0.2} opacity={0.2} />
    </Clouds>
  );
};

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

  // console.log(offset);

  // useEffect(() => {
  //   setInterval(() => setOffset(scroll.current), 100);
  // }, []);

  // useEffect(() => {
  //   const scrollCount = (e) => {
  //     scroll.current = e.target.scrollTop;
  //   };
  //   setTimeout(
  //     () =>
  //       document
  //         .querySelectorAll("canvas[data-engine*='three.js']+div")[0]
  //         .addEventListener("scroll", scrollCount),
  //     2000
  //   );
  //   return () => {
  //     document
  //       .querySelectorAll("canvas[data-engine*='three.js']+div")?.[0]
  //       ?.removeEventListener("scroll", scrollCount);
  //   };
  // }, []);

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

  // const handleButtonClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

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
          {/* <MorphingParticles /> */}

          <ScrollControls pages={7} damping={0.1}>
            {/* <CloudsWithScroll /> */}
            <RotatingSphere />

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
      {/* {offset >= 1500 && offset < 1900 && (
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
      {isModalOpen && <Modal onClose={handleCloseModal} />} */}
    </>
  );
};
const MorphingParticles = () => {
  const particlesRef = useRef();
  const torusKnotGeometry1 = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const torusKnotGeometry2 = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const sphereGeometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.3, 100, 16), []);
  const [rotation, setRotation] = useState(0);

  const particlesCount = Math.min(
    torusKnotGeometry1.attributes.position.count,
    torusKnotGeometry2.attributes.position.count,
    sphereGeometry.attributes.position.count
  );

  const positions = new Float32Array(particlesCount * 3);
  const positionsFunnel = new Float32Array(particlesCount * 3);
  const initialRandomPositions = useRef(new Float32Array(particlesCount * 3));

  // Generate initial random positions for the particles
  useEffect(() => {
    for (let i = 0; i < particlesCount; i++) {
      initialRandomPositions.current[i * 3] = (Math.random() - 0.5) * 10;
      initialRandomPositions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      initialRandomPositions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }, [particlesCount]);

  // Generate funnel positions
  const generateFunnelPositions = () => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = (i / particlesCount) * Math.PI * 2;
      const radius = (particlesCount - i) / particlesCount * 2;
      const x = torusKnotGeometry2.attributes.position.getX(i)
      const y = torusKnotGeometry1.attributes.position.getY(Math.round(particlesCount / 2.3)); // Funnel height
      const z = radius * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  };

  // Interpolate between random positions, TorusKnot, and Funnel positions
  const getSpheres = () => {
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

      const blendedPosition = i % 2 === 0 ? torusPosition1 : torusPosition2;

      positions[i * 3] = blendedPosition.x;
      positions[i * 3 + 1] = blendedPosition.y;
      positions[i * 3 + 2] = blendedPosition.z;
    }
  };

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  const particlesGeometryFunnel = new THREE.BufferGeometry();
  particlesGeometryFunnel.setAttribute(
    'position',
    new THREE.BufferAttribute(generateFunnelPositions(), 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffffff',
    sizeAttenuation: true,
    size: 0.03,
  });

  // Create text sprites
  const createTextSprite = (text, x, y) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;

    context.font = '50px Arial';
    context.fillStyle = '#ffbbff';
    context.fillText(text, 0, 50);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 1, 1);
    sprite.position.set(x, y, 0);

    return sprite;
  };

  useEffect(() => {
    if (particlesRef.current) {
      const sprite1 = createTextSprite('ilias', -1.9, -.2);
      const sprite2 = createTextSprite('Alis', 2.1, -.2);
      particlesRef.current.add(sprite1);
      particlesRef.current.add(sprite2);
    }
  }, [particlesCount]);

  useFrame(() => {
    if (particlesRef.current) {
      torusKnotGeometry1.rotateY(rotation);
      torusKnotGeometry2.rotateY(rotation);
      setRotation(rotation + 1 / 360);
      getSpheres();
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points
        ref={particlesRef}
        geometry={particlesGeometry}
        material={particlesMaterial}
      />
      <points
        ref={particlesRef}
        geometry={particlesGeometryFunnel}
        material={particlesMaterial}
      />
    </>
  );
};
