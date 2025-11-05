import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden.jsx";

const TablaClientes = ({
  clientes,
  cargando,
}) => {

  const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };



  const clientesOrdenados = [...clientes].sort((a, b) => {
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
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
      <BotonOrden
        campo="id_cliente"
        orden={orden}
        manejarOrden={manejarOrden}>
        ID
      </BotonOrden>
      <BotonOrden
        campo="primer_nombre"
        orden={orden}
        manejarOrden={manejarOrden}>
        Nombre 1
      </BotonOrden>
      <BotonOrden
        campo="segundo_nombre"
        orden={orden}
        manejarOrden={manejarOrden}>
        Nombre 2
      </BotonOrden>
      <BotonOrden
        campo="primer_apellido"
        orden={orden}
        manejarOrden={manejarOrden}>
        Apellido 1
      </BotonOrden>
      <BotonOrden
        campo="segundo_apellido"
        orden={orden}
        manejarOrden={manejarOrden}>
        Apellido 2
      </BotonOrden>
      <BotonOrden
        campo="direccion"
        orden={orden}
        manejarOrden={manejarOrden}>
        Dirección
      </BotonOrden>
      <BotonOrden
        campo="celular"
        orden={orden}
        manejarOrden={manejarOrden}>
        Celular
      </BotonOrden>
      <BotonOrden
        campo="cedula"
        orden={orden}
        manejarOrden={manejarOrden}>
        Cédula
      </BotonOrden>
      <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clientesOrdenados.map((cliente) => {
        return (
          <tr key={cliente.id_cliente}>
            <td>{cliente.id_cliente}</td>
            <td>{cliente.primer_nombre}</td>
            <td>{cliente.segundo_nombre}</td>
            <td>{cliente.primer_apellido}</td>
            <td>{cliente.segundo_apellido}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.cedula}</td>
            <td>
            <Button
  variant="outline-warning"
  size="sm"
  className="me-2"
  onClick={() => {
    setClienteSeleccionado(cliente);
    setMostrarModalEdicion(true);
  }}
>
  <i className="bi bi-pencil"></i>
</Button>

<Button
  variant="outline-danger"
  size="sm"
  onClick={() => {
    setClienteSeleccionado(cliente);
    setMostrarModalEliminacion(true);
  }}
>
  <i className="bi bi-trash"></i>
</Button>
            </td>
        </tr>
        );
      })}
    </tbody>
  </Table>
  </>
  );

};

export default TablaClientes;