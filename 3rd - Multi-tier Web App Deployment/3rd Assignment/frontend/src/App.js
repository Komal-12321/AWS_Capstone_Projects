import React, { useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("Choose an action");
  const [loading, setLoading] = useState(false);

  const fetchData = (type) => {
    setLoading(true);

    axios.get(`http://65.0.55.92:5000/data/${type}`)
      .then(res => {
        setMsg(res.data[0].message);
        setLoading(false);
      })
      .catch(() => {
        setMsg("Error connecting to backend");
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Multi-Tier App</h1>
        <p style={styles.subtitle}>Frontend • Backend • Cloud</p>

        <div style={styles.buttonGrid}>
          <button style={styles.button} onClick={() => fetchData("greet")}>
            👋 Greet
          </button>

          <button style={styles.button} onClick={() => fetchData("time")}>
            ⏰ Time
          </button>

          <button style={styles.button} onClick={() => fetchData("status")}>
            ⚡ Status
          </button>
        </div>

        <div style={styles.outputBox}>
          {loading ? "Loading..." : msg}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
  },

  title: {
    marginBottom: "10px",
    color: "#222",
    fontSize: "24px"
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "14px"
  },

  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",   // 👈 THIS FIXES CROWDING
    marginBottom: "30px"
  },

  button: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#2a5298",
    color: "#fff",
    transition: "0.2s",
  },

  outputBox: {
    background: "#f5f7fb",
    padding: "18px",
    borderRadius: "12px",
    fontWeight: "500",
    fontSize: "16px",
    minHeight: "50px"
  }
};

export default App;