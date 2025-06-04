const PredictionDisplay = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Prediction: {prediction}</h2>
    </div>
  );
};

export default PredictionDisplay;
