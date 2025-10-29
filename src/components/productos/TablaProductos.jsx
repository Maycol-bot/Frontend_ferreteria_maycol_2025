import React, {useState} from "react";
import {Table, Spinner} from 'react-bootstrap';
import BotonOrden from "../ordenamiento/BotonOrden.jsx";

const TablaProductos = ({productos, cargando}) => {

    const [orden, setOrden] = useState({ campo: "id_producto", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const productosOrdenados = [...productos].sort((a, b) => {
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
            <Spinner>
                <Spinner animation="border" role="status" />
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        );
    };

    return (
        <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden
              campo="id_producto"
              orden={orden}
              manejarOrden={manejarOrden}>
              ID
            </BotonOrden>
            <BotonOrden
              campo="nombre_producto"
              orden={orden}
              manejarOrden={manejarOrden}>
              Nombre Producto
            </BotonOrden>
            <BotonOrden
              campo="descripcion_producto"
              orden={orden}
              manejarOrden={manejarOrden}>
              Descripción Producto
            </BotonOrden>
            <BotonOrden
              campo="categoria_producto"
              orden={orden}
              manejarOrden={manejarOrden}>
              Categoría Producto
            </BotonOrden>
            <BotonOrden
              campo="precio_unitario"
              orden={orden}
              manejarOrden={manejarOrden}>
              Precio Unitario
            </BotonOrden>
            <BotonOrden campo="stock" orden={orden} manejarOrden={manejarOrden}>
              Stock
            </BotonOrden>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosOrdenados.map((producto) => {
            return (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.descripcion_producto}</td>
                <td>{producto.categoria_producto}</td>
                <td>{producto.precio_unitario}</td>
                <td>{producto.stock}</td>
                <td>Accion</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );

};

export default TablaProductos;