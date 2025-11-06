import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroVenta = ({
  mostrarModal,
  setMostrarModal,
  nuevaVenta,
  manejarCambioInput,
  agregarVenta,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
  
          <Form.Group className="mb-3" controlId="idCliente">
            <Form.Label>ID Cliente</Form.Label>
            <Form.Control
              type="number"
              name="id_cliente"
              value={nuevaVenta.id_cliente}
              onChange={manejarCambioInput}
              placeholder="Ej: 1"
              required
            />
          </Form.Group>

    
          <Form.Group className="mb-3" controlId="idEmpleado">
            <Form.Label>ID Empleado</Form.Label>
            <Form.Control
              type="number"
              name="id_empleado"
              value={nuevaVenta.id_empleado}
              onChange={manejarCambioInput}
              placeholder="Ej: 2"
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="fechaVenta">
            <Form.Label>Fecha de Venta</Form.Label>
            <Form.Control
  type="date"
  name="fecha_venta"
  value={nuevaVenta.fecha_venta || ""}
  onChange={manejarCambioInput}
  required
/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="totalVenta">
            <Form.Label>Total de la Venta</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="total_venta"
              value={nuevaVenta.total_venta}
              onChange={manejarCambioInput}
              placeholder="Ej: 150.75"
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
          onClick={agregarVenta}
          disabled={
            !nuevaVenta.id_cliente ||
            !nuevaVenta.id_empleado ||
            !nuevaVenta.fecha_venta ||
            !nuevaVenta.total_venta
          }
        >
          Guardar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;
