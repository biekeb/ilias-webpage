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
  const getOffset = () => {
    if (scroll.offset < .25)
      return tl.current
        .to(plane.current.position, { x: 0, y: -4, duration: 70 }, 1)
        .to(plane.current.position, { z: -5, duration: 40, delay: .8 }, 1)
        .to(plane.current.rotation, { y: Math.PI / -1.7, duration: 40, delay: .8 }, 1)
    if (scroll.offset < .4)
      return tl.current
        .to(plane.current.position, { x: -5, y: -4, duration: 120 }, 1)
        .to(plane.current.rotation, { y: Math.PI / -2.7, duration: 40, delay: .8 }, 1)
    if (scroll.offset < .5)
      return tl.current
        .to(plane.current.position, { x: 5, y: -4, duration: 200 }, 1)
        .to(plane.current.rotation, { y: Math.PI / -1.5, duration: 40, delay: .8 }, 1)
    else
      return 4
  };

  useFrame((state, delta) => {
    getOffset();
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      // defaults: { duration: 0, ease: "power1.inOut" },
    });

    // tl.current
    //   // .to(plane.current.position, { y: -20, x: -5, z: -2 }, 0)
    //   .to(plane.current.position, { x: 0, y: -4, z: -5 }, 1)

    //   .to(plane.current.rotation, { y: Math.PI / -2 }, 1)
    // .to(plane.current.position, { z: 0 }, 2)

    //     .to(plane.current.position, { x: 0 }, 1)
    //     .to(plane.current.position, { y: 0 }, 3)

    //     .to(plane.current.position, { x: -2 }, 6)

    //     .to(plane.current.position, { x: 2 }, 9)

    //     .to(plane.current.position, { x: -10 }, 14)

    //     .to(plane.current.position, { x: -15 }, 20);
  }, []);

  // useEffect(() => {
  //   if (hovered) {
  //     gsap.to(plane.current.position, {
  //       y: 0.3,
  //       x: 0.3,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     });
  //   } else {
  //     gsap.to(plane.current.position, {
  //       y: 0,
  //       x: 0,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     });
  //   }
  // }, [hovered]);

  return (
    <primitive
      dispose={null}
      ref={plane}
      object={f16.scene}
      rotation={[0, 0, 0]}
      position={[-30, -5, -15]}
      scale={[0.05, 0.05, 0.05]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}
