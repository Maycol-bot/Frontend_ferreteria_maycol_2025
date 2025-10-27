import { Table, Spinner } from "react-bootstrap";

const TablaUsuarios = ({ usuarios = [], cargando }) => {
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
          <th>ID Usuario</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id_usuario}>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.usuario}</td>
            <td>{usuario.contraseña}</td>
            <td>Acción</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaUsuarios;

