import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreUsuario">
            <Form.Label>Nombre del Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={nuevoUsuario.usuario}
              onChange={manejarCambioInput}
              placeholder="Ej: Juan"
              maxLength={20}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Contraseña del Usuario</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              value={nuevoUsuario.contrasena}
              onChange={manejarCambioInput}
              placeholder="Ej: ********"
              maxLength={50}
              required
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarUsuario}
          disabled={!nuevoUsuario.usuario.trim()}
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroUsuario;