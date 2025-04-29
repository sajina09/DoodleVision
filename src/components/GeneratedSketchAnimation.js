import React, { useEffect, useRef } from "react";

const GeneratedSketchAnimation = ({ decodedImageArray }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!decodedImageArray) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size = 280; // upscale to 280x280
    const scale = size / 28;

    canvas.width = size;
    canvas.height = size;

    // Clear background
    ctx.fillStyle = "#111"; // Dark background like user side
    ctx.fillRect(0, 0, size, size);

    // Draw white squares where brightness > threshold
    const threshold = 0.5;

    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        let brightness = decodedImageArray[y][x];

        if (brightness > threshold) {
          ctx.fillStyle = "#00ffff"; // Use cyan instead of white for futuristic look
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }, [decodedImageArray]);

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "280px",
          height: "280px",
          border: "2px solid #00ffff88",
          borderRadius: "15px",
          backgroundColor: "#111",
          boxShadow: "0 0 15px #00ffff55",
        }}
      />
    </div>
  );
};

export default GeneratedSketchAnimation;
