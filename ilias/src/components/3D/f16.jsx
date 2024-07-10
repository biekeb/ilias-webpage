import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "react-three-fiber";

export default function F16() {
  const f16 = useGLTF("./assets/f35.glb");
  const plane = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
    });

    tl.current
      .to(plane.current.position, { y: 0 }, 0)
      .to(plane.current.position, { x: 0 }, 0)
      .to(plane.current.position, { z: -14 }, 0)

      .to(plane.current.rotation, { y: Math.PI / -2 }, 1)
      .to(plane.current.position, { z: 0 }, 1)

      .to(plane.current.position, { x: 0 }, 1)
      .to(plane.current.position, { y: 0 }, 3)

      .to(plane.current.position, { x: -2 }, 6)

      .to(plane.current.position, { x: 2 }, 9)

      .to(plane.current.position, { x: -10 }, 14)

      .to(plane.current.position, { x: 0 }, 20);
  }, []);

  useEffect(() => {
    if (hovered) {
      gsap.to(plane.current.position, {
        y: 0.3,
        x: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      gsap.to(plane.current.position, {
        y: 0,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [hovered]);

  return (
    <primitive
      dispose={null}
      ref={plane}
      object={f16.scene}
      rotation={[0, Math.pi, 0]}
      position={[-15, -5, -2]}
      scale={[0.05, 0.05, 0.05]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}
