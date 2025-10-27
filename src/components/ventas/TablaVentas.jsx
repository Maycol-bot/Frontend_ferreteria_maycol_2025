import { Table, Spinner } from 'react-bootstrap';

const TablaVentas = ({ ventas, cargando }) => {

  if (cargando) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
        <span className="visually-hidden">Cargando...</span>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <th>Fecha de Venta</th>
            <th>Total Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_cliente}</td>
              <td>{venta.id_empleado}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.total_venta}</td>
              <td>Acción</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TablaVentas;
