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
  database: "almacen",
  port: 33065
})

const tablas = {
  Proveedor: ["nombre", "cuit", "telefono", "email", "direccion", "ciudad", "provincia", "pais"],
  Categoria: ["nombre", "descripcion"],
  Producto: ["nombre", "descripcion", "precioCosto", "precioVenta", "stock", "idCategoria", "idProveedor"],
  Cliente: ["dni", "nombre", "direccion", "ciudad", "codigoPostal", "telefono", "email"],
  Empleado: ["nombre", "dni", "cargo", "salario", "email", "fechaIngreso"],
  CompraStock: ["fecha", "total", "idProveedor", "idEmpleado"],
  DetalleCompraStock: ["idCompra", "idProducto", "cantidad"],
  Venta: ["fecha", "total", "tipoPago", "idCliente", "idEmpleado"],
  DetalleVenta: ["idVenta", "idProducto", "cantidad"]
}

// Insertar datos genérico
app.post("/api/:tabla", (req, res) => {
  const tabla = req.params.tabla
  const columnas = tablas[tabla]
  if (!columnas) return res.status(400).json({ error: "Tabla no válida" })

  const valores = columnas.map(c => req.body[c])

  const placeholders = columnas.map(() => "?").join(", ")
  const sql = `INSERT INTO ${tabla} (${columnas.join(", ")}) VALUES (${placeholders})`

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(400).json({ error: "Los campos no tienen el formato indicado o no existen" })
    }
    res.json({ message: `${tabla} agregado correctamente`, id: result.insertId })
  })
})

// Mostrar datos de una tabla
app.get("/api/:tabla", (req, res) => {
  const tabla = req.params.tabla
  const sql = `SELECT * FROM ${tabla}`
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ error: "Error al obtener los datos" })
    res.json(result)
  })
})

app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"))
