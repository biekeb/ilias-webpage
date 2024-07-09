import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";
import gsap from "gsap";
import { useGLTF, useFrame } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

const F16 = () => {
  const { scene } = useGLTF("./assets/f16.glb");
  return (
    <primitive
      object={scene}
      rotation={[5, Math.PI / -2, Math.PI / -2]}
      position={[0, 0, -2]}
      scale={[0.05, 0.05, 0.05]}
    />
  );
};

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const { scene, camera } = useThree();

  useEffect(() => {
    // Scene setup
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    // Parameters for GUI
    const parameters = {
      materialColor: "#ffeded",
    };

    // GUI setup
    const gui = new GUI();
    gui.addColor(parameters, "materialColor").onChange(() => {
      material.color.set(parameters.materialColor);
      particlesMaterial.color.set(parameters.materialColor);
    });

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
    gradientTexture.magFilter = THREE.NearestFilter;

    // Materials
    const material = new THREE.MeshToonMaterial({
      color: parameters.materialColor,
      gradientMap: gradientTexture,
    });

    // Objects
    const objectsDistance = 4;
    const mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      material
    );
    const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
    const mesh3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      material
    );

    mesh1.position.x = 2;
    mesh2.position.x = -2;
    mesh3.position.x = 2;

    mesh1.position.y = 0;
    mesh2.position.y = -objectsDistance;
    mesh3.position.y = -objectsDistance * 2;

    scene.add(mesh1, mesh2, mesh3);

    const sectionMeshes = [mesh1, mesh2, mesh3];

    // Lights
    const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    // Particles
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] =
        objectsDistance * 0.5 -
        Math.random() * objectsDistance * sectionMeshes.length;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
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
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 6;
    cameraGroup.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Resize handler
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Scroll handler
    let scrollY = window.scrollY;
    let currentSection = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
      const newSection = Math.round(scrollY / sizes.height);
      if (newSection !== currentSection) {
        currentSection = newSection;
        gsap.to(sectionMeshes[currentSection].rotation, {
          duration: 1.5,
          ease: "power2.inOut",
          x: "+=6",
          y: "+=3",
          z: "+=1.5",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Mouse move handler
    const cursor = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Animate camera
      camera.position.y = (-scrollY / sizes.height) * objectsDistance;
      const parallaxX = cursor.x * 0.5;
      const parallaxY = -cursor.y * 0.5;
      cameraGroup.position.x +=
        (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
      cameraGroup.position.y +=
        (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

      // Animate meshes
      for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1;
        mesh.rotation.y += deltaTime * 0.12;
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      gui.destroy();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <F16 />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <ThreeScene />
    </Canvas>
  );
};

export default App;
