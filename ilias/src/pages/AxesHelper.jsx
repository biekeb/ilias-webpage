import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const AxesHelper = ({ size }) => {
  const { scene } = useThree();
  const axesHelperRef = useRef();

  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(size);
    scene.add(axesHelper);
    axesHelperRef.current = axesHelper;

    return () => {
      scene.remove(axesHelper);
    };
  }, [scene, size]);

  return null;
};

export default AxesHelper;
