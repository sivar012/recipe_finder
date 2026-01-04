import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect
db.connect(err => {
  if (err) {
    console.log(" MySQL ERROR:", err);
  } else {
    console.log(" MySQL Connected");
  }
});

/* ===============================
   REGISTER API
================================== */
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashed], (err) => {
    if (err) {
      console.log(" Register error:", err);
      return res.status(500).json({ error: "Email already exists" });
    }

    res.json({ message: "Registration successful" });
  });
});

/* ===============================
   LOGIN API
================================== */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0)
      return res.status(400).json({ error: "Invalid email" });

    const user = result[0];

    const match = bcrypt.compareSync(password, user.password_hash);
    if (!match)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Backend running at http://localhost:${PORT}`);
});
