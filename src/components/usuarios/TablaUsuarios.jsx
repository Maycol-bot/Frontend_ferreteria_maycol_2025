import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaUsuarios = ({ usuarios = [], cargando }) => {

  const [orden, setOrden] = useState({ campo: "id_usuario", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };


  const usuariosOrdenados = [...usuarios].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
        <span className="visually-hidden">Cargando...</span>
      </div>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <BotonOrden
            campo="id_usuario"
            orden={orden}
            manejarOrden={manejarOrden}
          >
            ID
          </BotonOrden>
          <BotonOrden
            campo="usuario"
            orden={orden}
            manejarOrden={manejarOrden}
          >
            Usuario
          </BotonOrden>
          <BotonOrden
            campo="contrasena"
            orden={orden}
            manejarOrden={manejarOrden}
          >
            Contraseña
          </BotonOrden>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {usuariosOrdenados.map((usuario) => (
          <tr key={usuario.id_usuario}>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.usuario}</td>
            <td>{usuario.contrasena}</td>
            <td>Acción</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaUsuarios;

