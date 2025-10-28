import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="primerNombre">
            <Form.Label>Primer Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: carlos"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundoNombre">
            <Form.Label>Segundo Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: juan"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="primerApellido">
            <Form.Label>Primer Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundoApellido">
            <Form.Label>Segundo Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Gómez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección del Cliente</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ej: Calle Falsa 123"
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 123456789"
              maxLength={15}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="emailCliente">
            <Form.Label>Email del Cliente</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={nuevoCliente.email}
              onChange={manejarCambioInput}
              placeholder="Ej: carlos@example.com"
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
          onClick={agregarCliente}
          disabled={!nuevoCliente.primer_nombre.trim()}
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;

