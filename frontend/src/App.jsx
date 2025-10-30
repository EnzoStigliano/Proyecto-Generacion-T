import { useState } from "react"
import Formulario from "./Formulario"
import "./App.css"

export default function App() {
  const [tabla, setTabla] = useState("proveedor")

  return (
      <Formulario tabla={tabla} />
  )
}
