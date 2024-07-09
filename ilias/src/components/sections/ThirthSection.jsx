import React from "react";
import { gsap } from "gsap";
import ScrollMagic from "scrollmagic";
import "particles.js";
import { useEffect } from "react";

function ThirtSection() {
  return (
    <div className="container">
      <div className="header">
        A SEAMLESS INTEGRATION, FOR A HOLISTIC FLEET MANAGEMENT
      </div>
      <div className="main">
        <div className="circle">
          <span className="text">ILIAS</span>
        </div>
        <div className="connector"></div>
        <div className="circle">
          <span className="text">ALIS</span>
        </div>
      </div>
      <div className="footer">
        <ul>
          <li>Interfacing with ALIS/ODIN</li>
          <li>Reducing admin task by MX personnel</li>
          <li>Optimizing maintenance</li>
          <li>Single point of truth</li>
        </ul>
      </div>
    </div>
  );
}

export default ThirtSection;