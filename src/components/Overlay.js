import React, { useState, useEffect } from "react";

const TranslucentRedBox = ({
  title,
  englishStory,
  nepaliStory,
  timeTaken,
  onClose,
}) => {
  const [typedEnglish, setTypedEnglish] = useState("");
  const [typedNepali, setTypedNepali] = useState("");

  useEffect(() => {
    let engIdx = 0;
    let npIdx = 0;

    const engInterval = setInterval(() => {
      if (engIdx < englishStory?.length) {
        setTypedEnglish((prev) => prev + englishStory[engIdx]);
        engIdx++;
      } else {
        clearInterval(engInterval);
      }
    }, 30); // typing speed

    const npStart = englishStory?.length * 30 + 300; // delay Nepali typing

    const nepaliTimeout = setTimeout(() => {
      const npInterval = setInterval(() => {
        if (npIdx < nepaliStory?.length) {
          setTypedNepali((prev) => prev + nepaliStory[npIdx]);
          npIdx++;
        } else {
          clearInterval(npInterval);
        }
      }, 30);
    }, npStart);

    return () => {
      clearInterval(engInterval);
      clearTimeout(nepaliTimeout);
    };
  }, [englishStory, nepaliStory]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "85%",
        maxWidth: "700px",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(255, 100, 100, 0.3)",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(60px)",
        color: "#220505",
        padding: "20px",
        fontSize: "1rem",
        zIndex: 50,
        fontFamily: "monospace",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          border: "none",
          background: "transparent",
          fontSize: "20px",
          color: "#771010",
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <h4
        style={{ fontWeight: "bold", marginTop: "-5px", marginBottom: "8px" }}
      >
        ✨ A story about the {title}.
      </h4>
      <p>
        🌍 <strong>English:</strong> {typedEnglish}.
      </p>
      <p>Time taken: {timeTaken}s</p>
      {/* <p>
        🇳🇵 <strong>Nepali:</strong> {typedNepali}
      </p> */}
    </div>
  );
};

export default TranslucentRedBox;
