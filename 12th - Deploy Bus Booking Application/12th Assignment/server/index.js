const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 RDS CONNECTION
const db = mysql.createConnection({
  host: "assign-12-bus-booking.cfmmskcigzyt.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "PruthaPassword",
  database: "bus_booking"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("✅ Connected to RDS");
  }
});

// 🎟️ BOOK API
app.post("/book", (req, res) => {
  const { name, age, seats, source, destination } = req.body;

  const query =
    "INSERT INTO bookings (name, age, seats, source, destination) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, age, seats, source, destination], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving booking");
    }

    res.send("Seat Confirmed ✅");
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});