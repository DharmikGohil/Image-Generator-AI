// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";

function AnimatedBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js effect
    vantaRef.current = window.VANTA.BIRDS({
      el: "#animated-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      colorMode: "variance",
      birdSize: 1.1,
    });

    // Clean up effect on component unmount
    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="animated-background"
      style={{ width: "100%", height: "100vh" }}></div>
  );
}

export default AnimatedBackground;
