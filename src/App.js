import React, { useState } from "react";
import DrawingBoard from "./components/DrawingBoard";

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "hidden",
      }}
    >
      {/* 🎨 App Title */}
      <h3
        style={{
          fontSize: "1.5rem",
          marginTop: "0px",
          marginBottom: "20px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#00ffff",
        }}
      >
        🎨 Model Doodle 🎨
      </h3>

      {/* ❓ About Us Button */}
      <button
        onClick={() => setShowAbout(true)}
        style={{
          position: "absolute",
          top: "20px",
          right: "80px",
          background: "#00ffff",
          color: "#0a0a0a",
          fontWeight: "bold",
          fontSize: "20px",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          boxShadow: "0 0 15px #00ffff88",
          zIndex: 10,
        }}
      >
        ?
      </button>
      <button
        onClick={() => setShowShare(true)}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px", // more right
          background: "#00ffff",
          color: "#0a0a0a",
          fontWeight: "bold",
          fontSize: "20px",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          boxShadow: "0 0 15px #00ffff88",
          zIndex: 10,
        }}
      >
        📤
      </button>

      {/* 🎯 Main Content */}
      <DrawingBoard />

      {/* 📜 About Modal */}
      {showAbout && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setShowAbout(false)}
        >
          <div
            style={{
              background: "#111",
              border: "2px solid #00ffff88",
              borderRadius: "20px",
              padding: "30px",
              color: "#00ffff",
              textAlign: "center",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 0 20px #00ffff55",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 style={{ marginBottom: "20px" }}> What is this? </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#ccc" }}>
              Welcome to the Model Doodle! 🎨 Here you draw doodles and watch an
              AI model decide what it looks like, and then the Sketchy guru
              generates its interpretation! Built with love, neon dreams, and
              lots of coffee ☕✨
              <br />
              <br />
              Choose from these classes please:
              <br />
              🌸 Flower <br />
              🎩 Hat <br />
              🚲 Bicycle <br />
              🐱 Cat <br />
              🌳 Tree <br />
              🐟 Fish <br />
              🕯️ Candle <br />
              ⭐ Star <br />
              🙂 Face <br />
              🏠 House
            </p>

            <button
              onClick={() => setShowAbout(false)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                background: "#00ffff",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0 0 10px #00ffffaa",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showShare && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setShowShare(false)}
        >
          <div
            style={{
              background: "#111",
              border: "2px solid #00ffff88",
              borderRadius: "20px",
              padding: "30px",
              color: "#00ffff",
              textAlign: "center",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 0 20px #00ffff55",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "20px" }}>📤 Share Model Doodle</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#ccc" }}>
              Scan this QR code to share with your friends!
            </p>

            {/* QR Code */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://your-sketch-portal-link.com"
              alt="QR Code"
              style={{
                marginTop: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 15px #00ffff55",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
