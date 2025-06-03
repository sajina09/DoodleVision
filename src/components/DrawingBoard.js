import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [prediction, setPrediction] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [reconstructedImage, setReconstructedImage] = useState(null);
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

  // 🚀 Predict and Fetch images
  const handlePredict = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current.canvas.drawing;
    setLoading(true);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "doodle.png");

      try {
        // First predict
        const predictResponse = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });
        const predictData = await predictResponse.json();
        setPrediction(predictData.prediction);

        // Then fetch generated and reconstructed
        // await fetchGeneratedAndReconstructedImage(blob, predictData.prediction);
      } catch (error) {
        console.error("Prediction or Generation error:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  // 🎨 Fetch generated and reconstructed images
  const fetchGeneratedAndReconstructedImage = async (blob, predictedClass) => {
    const formData = new FormData();
    formData.append("file", blob, "doodle.png");
    formData.append("label", predictedClass);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setGeneratedImage(data.generated_image); // new generated sketch
      setReconstructedImage(data.reconstructed_image); // enhanced user sketch
    } catch (error) {
      console.error("Error fetching generated/reconstructed image:", error);
    }
  };

  // 🧹 Clear everything
  const handleClear = () => {
    canvasRef.current.clear();
    setPrediction("");
    setGeneratedImage(null);
    setReconstructedImage(null);
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
              boxShadow: "0 0 10px #ff4081aa",
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

      {/* ✨ Right Side: Model Outputs */}
      {/* <div
        style={{
          flex: 1,
          background: "#111",
          border: "2px solid #00ffff88",
          borderRadius: "20px",
          boxShadow: "0 0 20px #00ffff55",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {generatedImage || reconstructedImage ? (
          <>
            <h3 style={{ color: "#00ffff" }}>Generated Sketch</h3>
            {generatedImage && (
              <img
                // src={`data:image/png;base64,${generatedImage}`}
                src={generatedImage}
                alt="Generated"
                style={{
                  width: "80%",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px #00ffff88",
                }}
              />
            )}

            <h3 style={{ color: "#ff4081" }}>Reconstructed Sketch</h3>
            {reconstructedImage && (
              <img
                // src={`data:image/png;base64,${reconstructedImage}`}
                src={reconstructedImage}
                alt="Reconstructed"
                style={{
                  width: "80%",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px #ff4081aa",
                }}
              />
            )}
          </>
        ) : (
          <p
            style={{
              color: "#00ffff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ✨ Model will generate after you Predict!
          </p>
        )}
      </div> */}
    </div>
  );
};

export default DrawingBoard;
