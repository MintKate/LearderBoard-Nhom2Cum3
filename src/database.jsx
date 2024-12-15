import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Hàm mở kết nối đến SQLite
export async function openDb() {
  return open({
    filename: "./database.sqlite", // Tên file database
    driver: sqlite3.Database,
  });
}

// Tạo bảng (nếu chưa tồn tại)
export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      msv TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  console.log("Database initialized");
}
