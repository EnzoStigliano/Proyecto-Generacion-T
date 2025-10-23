const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "miapp",
  port: 33065
})

app.post("/api/usuarios", (req, res) => {
  const { nombre, email } = req.body
  const sql = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)"
  db.query(sql, [nombre, email], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.json({ message: "Usuario agregado", id: result.insertId })
  })
})

app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios"
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.json(result)
  })
})

app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"))