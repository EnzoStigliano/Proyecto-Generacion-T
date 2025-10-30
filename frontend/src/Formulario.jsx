import { useState, useEffect } from "react"
import "./Formulario.css"

export default function Formulario() {
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Proveedor")
  const [formData, setFormData] = useState({})
  const [data, setData] = useState([])
  const [mensajeError, setMensajeError] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")

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

  useEffect(() => {
    cargarDatos()
  }, [tablaSeleccionada])

  const cargarDatos = async () => {
    const res = await fetch(`https://tu-backend-en-render.com/api/${tablaSeleccionada}`)
    const data = await res.json()
    setData(data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensajeError("")
    setMensajeExito("")
    try {
      const res = await fetch(`https://tu-backend-en-render.com/api/${tablaSeleccionada}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      if (res.ok) {
        setMensajeExito(result.message)
        setFormData({})
        cargarDatos()
      } else {
        setMensajeError(result.error || "Los campos no tienen el formato indicado o no existen")
      }
    } catch {
      setMensajeError("Error de conexión con el servidor")
    }
  }

  return (
    <div className="container">
      <h1>Gestión del Almacén</h1>

      <select className="selector" value={tablaSeleccionada} onChange={(e) => setTablaSeleccionada(e.target.value)}>
        {Object.keys(tablas).map((tabla) => (
          <option key={tabla} value={tabla}>{tabla}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="form">
        {tablas[tablaSeleccionada].map((campo) => (
          <input
            key={campo}
            name={campo}
            value={formData[campo] || ""}
            onChange={handleChange}
            placeholder={campo}
            required
          />
        ))}
        <button type="submit">Agregar</button>
      </form>

      {mensajeError && <p className="error">{mensajeError}</p>}
      {mensajeExito && <p className="exito">{mensajeExito}</p>}

      <h2>Datos de {tablaSeleccionada}</h2>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((col) => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((fila) => (
            <tr key={fila.id || Object.values(fila).join("-")}>
              {Object.values(fila).map((valor, i) => (
                <td key={i}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
