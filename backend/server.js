const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json())

const DATA_FILE = "./almacen.json"

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

// Crear el archivo si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    Proveedor: [],
    Categoria: [],
    Producto: [],
    Cliente: [],
    Empleado: [],
    CompraStock: [],
    DetalleCompraStock: [],
    Venta: [],
    DetalleVenta: []
  }, null, 2))
}

// Función para leer datos
function leerDatos() {
  return JSON.parse(fs.readFileSync(DATA_FILE))
}

// Función para guardar datos
function guardarDatos(datos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2))
}

// Obtener todos los registros de una tabla
app.get("/api/:tabla", (req, res) => {
  const tabla = req.params.tabla
  const datos = leerDatos()

  if (!datos[tabla]) {
    return res.status(400).json({ error: "Tabla no válida" })
  }

  res.json(datos[tabla])
})

// Insertar un registro en una tabla
app.post("/api/:tabla", (req, res) => {
  const tabla = req.params.tabla
  const columnas = tablas[tabla]
  if (!columnas) return res.status(400).json({ error: "Tabla no válida" })

  const datos = leerDatos()
  const tablaDatos = datos[tabla]

  try {
    const nuevoRegistro = {}

    // Verificación básica de campos
    for (const campo of columnas) {
      if (!(campo in req.body)) {
        return res.status(400).json({ error: "Los campos no tienen el formato indicado o no existen" })
      }
      nuevoRegistro[campo] = req.body[campo]
    }

    // Generar id autoincremental
    const idCampo = `id${tabla}`
    const nuevoId = tablaDatos.length > 0 ? tablaDatos[tablaDatos.length - 1][idCampo] + 1 : 1
    nuevoRegistro[idCampo] = nuevoId

    // Simular verificación de claves foráneas
    for (const campo of Object.keys(nuevoRegistro)) {
      if (campo.startsWith("id") && campo !== idCampo) {
        const tablaRelacionada = campo.substring(2)
        if (datos[tablaRelacionada] && !datos[tablaRelacionada].find(r => r[`id${tablaRelacionada}`] == nuevoRegistro[campo])) {
          return res.status(400).json({ error: "Los campos no tienen el formato indicado o no existen" })
        }
      }
    }

    tablaDatos.push(nuevoRegistro)
    guardarDatos(datos)

    res.json({ message: `${tabla} agregado correctamente`, id: nuevoId })
  } catch {
    res.status(400).json({ error: "Los campos no tienen el formato indicado o no existen" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor JSON corriendo en el puerto ${PORT}`))
