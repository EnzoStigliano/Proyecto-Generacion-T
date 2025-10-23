import { useState } from "react"

export default function Formulario() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [usuarios, setUsuarios] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://localhost:3001/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email })
    })
    setNombre("")
    setEmail("")
    cargarUsuarios()
  }

  const cargarUsuarios = async () => {
    const res = await fetch("http://localhost:3001/api/usuarios")
    const data = await res.json()
    setUsuarios(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      <h2>Usuarios registrados</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
