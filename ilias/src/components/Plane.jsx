/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf --transform 
Files: scene.gltf [8KB] > C:\Users\bellotb\OneDrive - ILIAS Solutions NV\Documents\Frontend\ilias-webpage\ilias\public\assets\plane\scene-transformed.glb [55.96KB] (-599%)
Author: PetriParkkinen (https://sketchfab.com/PetriParkkinen)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/f-35-ce27aef8f565405ab97345111f56cbcf
Title: F-35
*/

import React, { useLayoutEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "react-three-fiber";

export default function F35(props) {
  const { nodes, materials } = useGLTF('./assets/plane/scene-transformed.glb')

  const earth = useRef();
  const scroll = useScroll();
  const tl = useRef();
  useFrame((state, delta) => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
    });

    tl.current

      .to(earth.current.rotation, { y: 10 }, 0)
      .to(earth.current.position, { x: 0}, 6)


      .to(earth.current.rotation, { y: 0 }, 3)

      .to(earth.current.rotation, { y: -1 }, 6)
      .to(earth.current.position, { x: 2 }, 6)

      .to(earth.current.rotation, { y: 1 }, 9)
      .to(earth.current.position, { x: 1 }, 9)

      .to(earth.current.rotation, { y: 0 }, 11)
      .to(earth.current.rotation, { x: -1 }, 11)
      .to(earth.current.position, { x: -2 }, 11)

      .to(earth.current.rotation, { y: 0 }, 15)
      .to(earth.current.rotation, { x: 0 }, 15)
      .to(earth.current.position, { x: 0 }, 15)

      .to(earth.current.rotation, { y: 1 }, 18)
      .to(earth.current.rotation, { x: 0 }, 18)
      .to(earth.current.position, { x: 0 }, 18)

      .to(earth.current.rotation, { y: 0 }, 21);
  }, []);

  return (
    <group scale={20} {...props} dispose={null}ref={earth}>
      {/* <group rotation={[-Math.PI / 2, 0, 0]} scale={1}>
        {/* <lineSegments geometry={nodes.Object_0.geometry} material={materials.material_3} />
        <lineSegments geometry={nodes.Object_0.geometry} material={materials.material_2} />
        <lineSegments geometry={nodes.Object_0.geometry} material={materials.material_1} />
        <lineSegments geometry={nodes.Object_0.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_0_1.geometry} material={materials.material_3} />
      </group> */}
      <mesh geometry={nodes.Object_0_1.geometry} material={materials.material_3} rotation={[-Math.PI / 2, 0, 0]} scale={0.145} />

      <mesh geometry={nodes.Object_3.geometry} material={materials.material_0} rotation={[-Math.PI / 2, 0, 0]} scale={0.145} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.material_1} rotation={[-Math.PI / 2, 0, 0]} scale={0.145} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.material_2} rotation={[-Math.PI / 2, 0, 0]} scale={0.145} />
    </group>
  )
}

useGLTF.preload('./assets/plane/scene-transformed.glb')
