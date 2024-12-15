const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = 5173;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối SQLite3
const db = new sqlite3.Database("./students.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite3:", err.message);
  } else {
    console.log("Connected to SQLite3 database.");
  }
});

// Tạo bảng nếu chưa tồn tại
db.run(`
  CREATE TABLE IF NOT EXISTS students (
    msv TEXT PRIMARY KEY,
    password TEXT
  )
`);

// API: Đăng nhập hoặc Đăng ký
app.post("/students", (req, res) => {
  const { msv, password } = req.body;

  if (!msv || !password) {
    return res.status(400).json({ success: false, message: "Thiếu MSV hoặc mật khẩu." });
  }

  db.get("SELECT * FROM students WHERE msv = ?", [msv], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, message: "Lỗi máy chủ." });
    }

    if (row) {
      // Đăng nhập
      if (row.password === password) {
        return res.json({ success: true, message: "Đăng nhập thành công!" });
      } else {
        return res.status(400).json({ success: false, message: "Sai mật khẩu." });
      }
    } else {
      // Đăng ký
      db.run("INSERT INTO students (msv, password) VALUES (?, ?)", [msv, password], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ success: false, message: "Lỗi khi lưu thông tin." });
        }
        return res.json({ success: true, message: "Đăng ký thành công!" });
      });
    }
  });
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
