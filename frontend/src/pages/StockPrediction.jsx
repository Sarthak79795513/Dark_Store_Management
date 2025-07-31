import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PredictionForm = () => {
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [predictionHistory, setPredictionHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      price: parseFloat(price),
      category: category
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", data);
      const predictedQty = response.data.predicted_quantity;
      setResult(predictedQty);
      setError(null);

      // Add to history for graph
      setPredictionHistory((prev) => [
        ...prev,
        { price: parseFloat(price), quantity: predictedQty }
      ]);
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const chartData = {
    labels: predictionHistory.map((entry) => `₹${entry.price}`),
    datasets: [
      {
        label: "Predicted Quantity",
        data: predictionHistory.map((entry) => entry.quantity),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Stock Quantity Predictor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Predict</button>
      </form>

      {result && <p style={styles.result}>✅ Predicted Quantity: <strong>{result}</strong></p>}
      {error && <p style={styles.error}>❌ {error}</p>}

      {predictionHistory.length > 0 && (
        <div style={styles.chartContainer}>
          <h3 style={styles.chartHeading}>📈 Prediction History</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

// 💅 Inline Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#fefefe"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#2e7d32"
  },
  error: {
    marginTop: "20px",
    fontSize: "16px",
    color: "red"
  },
  chartContainer: {
    marginTop: "30px"
  },
  chartHeading: {
    marginBottom: "10px",
    textAlign: "center"
  }
};

export default PredictionForm;
