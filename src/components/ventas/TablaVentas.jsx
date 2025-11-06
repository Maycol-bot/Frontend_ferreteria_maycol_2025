// src/components/ventas/TablaVentas.jsx
import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaVentas = ({
  ventas,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  setPaginaActual
}) => {
  const [orden, setOrden] = useState({ campo: "id_venta", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc"
    }));
  };

  const ventasOrdenadas = [...ventas].sort((a, b) => {
    const A = a[orden.campo] ?? "";
    const B = b[orden.campo] ?? "";
    if (typeof A === "number" && typeof B === "number") {
      return orden.direccion === "asc" ? A - B : B - A;
    }
    return orden.direccion === "asc"
      ? String(A).localeCompare(String(B))
      : String(B).localeCompare(String(A));
  });

  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <BotonOrden campo="id_venta" orden={orden} manejarOrden={manejarOrden}>ID</BotonOrden>
            <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>Cliente</BotonOrden>
            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>Empleado</BotonOrden>
            <BotonOrden campo="fecha_venta" orden={orden} manejarOrden={manejarOrden}>Fecha</BotonOrden>
            <BotonOrden campo="total_venta" orden={orden} manejarOrden={manejarOrden}>Total</BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasOrdenadas.map((v) => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.id_cliente}</td>
              <td>{v.id_empleado}</td>
              <td>{new Date(v.fecha_venta).toLocaleDateString('es-NI')}</td>
              <td>₡{parseFloat(v.total_venta).toFixed(2)}</td>
              <td>
                <Button variant="outline-warning" size="sm" className="me-2"
                  onClick={() => abrirModalEdicion(v)}>
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm"
                  onClick={() => abrirModalEliminacion(v)}>
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

export default TablaVentas;