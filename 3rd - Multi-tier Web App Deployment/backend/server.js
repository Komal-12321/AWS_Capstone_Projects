const express = require("express");
const mysql = require("mysql2"),
const cors = require("cors");

const app = express();
app.use(cors());

// DB connection (local for now)
const db = mysql.createConnection({
  host: "mydbassign3.cfmmskcigzyt.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "PruthaPassword",
  database: "mydbassign3"
});
db.connect(err => {
  if (err) {
    console.log("DB connection error:", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API route
app.get("/data/:type", (req, res) => {
  const type = req.params.type;

  const now = new Date();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString(undefined, { weekday: "long" });

  let response = "";

  if (type === "greet") {
    response = `Hii 👋 You greeted at ${time} on ${day}`;
  } 
  else if (type === "time") {
    response = `The current time is: ${time}`;
  } 
  else if (type === "status") {
    response = "The server is doing well, how about you 😊";
  } 
  else {
    response = "Unknown request";
  }

  res.json([{ message: response }]);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
