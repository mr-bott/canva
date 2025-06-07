

import React from "react";
import DotGrid from "./components/DotGrid/DotGrid"; // Your animated background
import Canvas from "./components/Canvas/Canvas"; // Your main component (e.g., Konva canvas)
import "./App.css"; // Global styles
const App = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Background animation */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0,backgroundColor:"black" }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="white"
          activeColor="#00d8ff"
          proximity={120}
          shockRadius={250}
          shockStrength={7}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Main UI content */}
      <div className="canvas-container">
        <Canvas/>
      </div>
    </div>
  );
};

export default App;
