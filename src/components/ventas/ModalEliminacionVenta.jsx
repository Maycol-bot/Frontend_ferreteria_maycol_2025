// src/components/ventas/ModalEliminacionVenta.jsx
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionVenta = ({
  mostrar,
  setMostrar,
  venta,
  confirmarEliminacion,
}) => {
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar la venta con ID{" "}
          <strong>#{venta?.id_venta}</strong>?
        </p>
        <p>
          Cliente ID: <strong>{venta?.id_cliente}</strong> | Empleado ID: <strong>{venta?.id_empleado}</strong>
        </p>
        <p>
          Total: <strong>₡{parseFloat(venta?.total_venta || 0).toFixed(2)}</strong>
        </p>
        <p className="text-muted small">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionVenta;