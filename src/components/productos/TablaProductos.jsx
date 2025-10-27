import {Table, Spinner} from 'react-bootstrap';

const TablaProductos = ({productos, cargando}) => {

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
            <th>ID</th>
            <th>Nombre Del Producto</th>
        <th>Descripcion Del Producto</th>
        <th>Categoria Del Producto</th>
        <th>Precio unitario</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => {
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