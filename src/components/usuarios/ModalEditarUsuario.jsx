// src/components/usuarios/ModalEdicionUsuario.jsx
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionUsuario = ({
  mostrar,
  setMostrar,
  usuarioEditado,
  setUsuarioEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="usuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={usuarioEditado?.usuario || ""}
              onChange={manejarCambio}
              placeholder="Ej: admin2025"
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              value={usuarioEditado?.contrasena || ""}
              onChange={manejarCambio}
              placeholder="Deja vacío si no quieres cambiar"
              maxLength={100}
            />
            <Form.Text className="text-muted">
              Si no cambias la contraseña, se mantiene la actual.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={
            !usuarioEditado?.usuario?.trim()
          }
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionUsuario;