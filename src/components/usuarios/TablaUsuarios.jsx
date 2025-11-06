// src/components/usuarios/TablaUsuarios.jsx
import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaUsuarios = ({
  usuarios,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  setPaginaActual
}) => {
  const [orden, setOrden] = useState({ campo: "id_usuario", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc"
    }));
  };

  const usuariosOrdenados = [...usuarios].sort((a, b) => {
    const A = a[orden.campo] ?? "";
    const B = b[orden.campo] ?? "";
    return orden.direccion === "asc"
      ? String(A).localeCompare(String(B))
      : String(B).localeCompare(String(A));
  });

  if (cargando) return <div className="text-center my-5"><Spinner animation="border" /></div>;

  return (
    <>
      <Table bordered hover responsive className="mt-3">
        <thead className="table-light">
          <tr>
            <BotonOrden campo="id_usuario" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="usuario" orden={orden} manejarOrden={manejarOrden}>Usuario</BotonOrden>
            <BotonOrden campo="contrasena" orden={orden} manejarOrden={manejarOrden}>Contraseña</BotonOrden>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosOrdenados.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.usuario}</td>
              <td>••••••</td>
              <td className="text-center">
                <Button variant="outline-warning" size="sm" className="me-2"
                  onClick={() => abrirModalEdicion(u)}>
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm"
                  onClick={() => abrirModalEliminacion(u)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />
    </>
  );
};

export default TablaUsuarios;