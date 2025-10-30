import { useState } from "react"
import Formulario from "./Formulario"
import "./App.css"

export default function App() {
  const [tabla, setTabla] = useState("proveedor")

  return (
    <div className="container">
      <h1>Gestión del Almacén</h1>

      <select
        value={tabla}
        onChange={(e) => setTabla(e.target.value)}
        className="selector"
      >
        <option value="proveedor">Proveedor</option>
        <option value="categoria">Categoría</option>
        <option value="producto">Producto</option>
        <option value="cliente">Cliente</option>
        <option value="empleado">Empleado</option>
        <option value="compraStock">Compra Stock</option>
        <option value="detalleCompraStock">Detalle Compra Stock</option>
        <option value="venta">Venta</option>
        <option value="detalleVenta">Detalle Venta</option>
      </select>

      <Formulario tabla={tabla} />
    </div>
  )
}
