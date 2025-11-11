// src/components/ventas/TablaVentas.jsx
import React, { useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaVentas = ({
  ventas,
  cargando,
  obtenerDetalles,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {
  // Estado para ordenamiento
  const [orden, setOrden] = useState({ campo: "id_venta", direccion: "desc" });

  // Manejar clic en encabezado
  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  // Ordenar ventas
  const ventasOrdenadas = [...ventas].sort((a, b) => {
    let valorA = a[orden.campo];
    let valorB = b[orden.campo];

    // Manejo especial para fechas
    if (orden.campo === "fecha_venta") {
      valorA = new Date(a.fecha_venta);
      valorB = new Date(b.fecha_venta);
    }

    // Manejo especial para total_venta (número)
    if (orden.campo === "total_venta") {
      valorA = parseFloat(a.total_venta) || 0;
      valorB = parseFloat(b.total_venta) || 0;
    }

    // Comparación numérica
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    // Comparación de strings
    const comparacion = String(valorA ?? "").localeCompare(String(valorB ?? ""));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border">
          <span className="visually-hidden">Cargando ventas...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <BotonOrden campo="id_venta" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>
            <BotonOrden campo="fecha_venta" orden={orden} manejarOrden={manejarOrden}>
              Fecha
            </BotonOrden>
            <BotonOrden campo="nombre_cliente" orden={orden} manejarOrden={manejarOrden}>
              Cliente
            </BotonOrden>
            <BotonOrden campo="nombre_empleado" orden={orden} manejarOrden={manejarOrden}>
              Empleado
            </BotonOrden>
            <BotonOrden campo="total_venta" orden={orden} manejarOrden={manejarOrden}>
              Total
            </BotonOrden>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasOrdenadas.map((v) => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{new Date(v.fecha_venta).toLocaleDateString('es-NI')}</td>
              <td>{v.nombre_cliente}</td>
              <td>{v.nombre_empleado}</td>
              <td className="text-end">C$ {parseFloat(v.total_venta).toFixed(2)}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="outline-info"
                  className="me-1"
                  onClick={() => obtenerDetalles(v.id_venta)}
                  title="Ver detalles"
                >
                  <i className="bi bi-info-circle"></i>
                </Button>
                <Button
                  size="sm"
                  variant="outline-warning"
                  className="me-1"
                  onClick={() => abrirModalEdicion(v)}
                  title="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => abrirModalEliminacion(v)}
                  title="Eliminar"
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación reutilizable */}
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaVentas;