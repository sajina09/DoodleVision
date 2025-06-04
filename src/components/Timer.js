const TimerPopup = ({ seconds }) => (
  <div
    style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "12px 24px",
      background: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      borderRadius: "12px",
      fontSize: "1.1rem",
      backdropFilter: "blur(6px)",
      zIndex: 60,
    }}
  >
    ⏳ Please wait... Predicting ({seconds}s)
  </div>
);

export default TimerPopup;
