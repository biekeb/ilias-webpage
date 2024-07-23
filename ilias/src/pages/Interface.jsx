import { motion } from "framer-motion";
import ContactForm from "../components/sections/ContactForm";
import { Intro } from "../components/sections/Intro";
import { Start } from "../components/sections/Start";
import { FirstSection } from "../components/sections/FirstSection";
import { SecondSection } from "../components/SecondSection";
import ThirtSection from "../components/sections/ThirthSection";
import ParticleText from "./Test";
import React, { useRef, useEffect } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.2,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <Star />
      <Intr />
      <First />
      <Second />
      <Thirth />
      {/* <ParticleText /> */}
      <div
        style={{
          position: "absolute",
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <Particles />
      </div>
      <ContactSection />
    </div>
  );
};

const Star = () => {
  return (
    <Section>
      <Start />
    </Section>
  );
};

const Intr = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <Intro />
      </motion.div>
    </Section>
  );
};

const First = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <FirstSection />
      </motion.div>
    </Section>
  );
};

const Second = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <SecondSection />
      </motion.div>
    </Section>
  );
};

const Thirth = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <ThirtSection />
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <ContactForm />
    </Section>
  );
};

function Particles() {
  const particleCount = 5000;
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [particleCount]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={particles}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color="white" size={0.05} />
    </points>
  );
}
