// src/components/compras/TablaCompras.jsx
import React, { useState } from "react";
import { Table, Spinner, Button, Badge } from 'react-bootstrap';
import BotonOrden from "../ordenamiento/BotonOrden.jsx";
import Paginacion from "../ordenamiento/Paginacion.jsx";

const TablaCompras = ({
  compras,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {

  const [orden, setOrden] = useState({ campo: "id_compra", direccion: "desc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  // Ordenamiento local (igual que en productos)
  const comprasOrdenadas = [...compras].sort((a, b) => {
    const valorA = a[orden.campo] ?? "";
    const valorB = b[orden.campo] ?? "";

    if (orden.campo === "fecha_compra") {
      return orden.direccion === "asc"
        ? new Date(valorA) - new Date(valorB)
        : new Date(valorB) - new Date(valorA);
    }

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  // Loading (exactamente igual que en productos)
  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <span className="ms-3">Cargando compras...</span>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <BotonOrden campo="id_compra" orden={orden} manejarOrden={manejarOrden}>
              ID Compra
            </BotonOrden>
            <BotonOrden campo="fecha_compra" orden={orden} manejarOrden={manejarOrden}>
              Fecha
            </BotonOrden>
            <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
              ID Empleado
            </BotonOrden>
            <BotonOrden campo="total_compra" orden={orden} manejarOrden={manejarOrden}>
              Total Compra
            </BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comprasOrdenadas.map((compra) => (
            <tr key={compra.id_compra}>
              <td>
                <Badge bg="primary">#{compra.id_compra}</Badge>
              </td>
              <td>
                {new Date(compra.fecha_compra).toLocaleDateString("es-NI", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </td>
              <td>
                <i className="bi bi-person-circle text-primary me-2"></i>
                {compra.id_empleado}
              </td>
              <td className="text-end fw-bold text-success">
                C$ {parseFloat(compra.total_compra).toFixed(2)}
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    className="me-1"
                    onClick={() => abrirModalEdicion(compra)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => abrirModalEliminacion(compra)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación (exactamente igual) */}
      <Paginacion
        totalElementos={totalElementos}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        onCambioPagina={establecerPaginaActual}
      />
    </>
  );
};

export default TablaCompras;