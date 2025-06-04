/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import TranslucentRedBox from "./Overlay";
import TimerPopup from "./Timer";

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [prediction, setPrediction] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [storyEn, setStoryEn] = useState(" Your story will appear here");
  const [storyNe, setStoryNe] = useState("Wait for it!! ");

  // For the time modal takes to output
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [timerText, setTimerText] = useState("Predicting...");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [loading, setLoading] = useState(false);

  // 📏 Handle resizing
  useEffect(() => {
    if (containerRef.current) {
      const resizeCanvas = () => {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({
          width: clientWidth - 40,
          height: clientHeight - 100,
        });
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  }, []);

  function showErrorNotification(message) {
    const notification = document.createElement("div");
    notification.className = "error-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  // 🚀 Predict and Fetch images
  const handlePredict = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current.canvas.drawing;

    setPrediction("None");
    setShowPopup(false);
    setShowTimerPopup(true);
    setElapsedSeconds(0);

    // Start counting up
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "doodle.png");

      try {
        const predictResponse = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });

        const predictedData = await predictResponse.json();
        setPrediction(predictedData.prediction);
        setStoryEn(predictedData.story);
        setShowPopup(true);
      } catch (error) {
        console.error("Prediction error:", error);
        showErrorNotification("😬 Something went wrong");
      } finally {
        clearInterval(timer);
        setShowTimerPopup(false);
      }
    });
  };

  // 🧹 Clear everything
  const handleClear = () => {
    canvasRef.current.clear();
    setPrediction("");
    setShowPopup(false);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 100px)",
        width: "100%",
        justifyContent: "space-between",
        gap: "20px",
        padding: "10px",
      }}
    >
      {/* 🎨 Left side: Drawing */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          background: "#111",
          border: "2px solid #00ffff88",
          borderRadius: "20px",
          boxShadow: "0 0 20px #00ffff55",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* 🖍️ Controls */}
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#00ffff",
              textShadow: "0 0 8px #00ffffaa",
            }}
          >
            Prediction:{" "}
            {prediction
              ? prediction.charAt(0).toUpperCase() +
                prediction.slice(1).toLowerCase()
              : "None"}
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              background: loading ? "#444" : "#00ffff",
              color: loading ? "#aaa" : "#0a0a0a",
              border: "none",
              borderRadius: "30px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
              boxShadow: "0 0 10px #00ffffaa",
            }}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          <button
            onClick={handleClear}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              background: "#ff4081",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 0 5px #ff4081aa",
            }}
          >
            Clear
          </button>
        </div>

        {/* 🖌️ Canvas */}
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CanvasDraw
            ref={canvasRef}
            brushRadius={2}
            brushColor="#00ffff"
            lazyRadius={1}
            canvasWidth={canvasSize.width}
            canvasHeight={canvasSize.height}
            backgroundColor="#111"
          />
        </div>
      </div>

      {/* ✨ Transparent Story tale */}

      {showPopup && (
        <TranslucentRedBox
          title={prediction}
          englishStory={storyEn}
          nepaliStory={storyNe}
          onClose={() => setShowPopup(false)}
          timeTaken= {elapsedSeconds}
        />
      )}

      {showTimerPopup && <TimerPopup seconds={elapsedSeconds} />}
    </div>
  );
};

export default DrawingBoard;
