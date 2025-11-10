// src/components/usuarios/ModalEliminacionUsuario.jsx
import { Modal, Button } from "react-bootstrap";

const ModalEliminarUsuario = ({
  mostrar,
  setMostrar,
  usuario,
  confirmarEliminacion,
}) => {
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al usuario{" "}
          <strong>"{usuario?.usuario}"</strong> (ID: {usuario?.id_usuario})?
        </p>
        <p className="text-muted small">
          Esta acción no se puede deshacer. Se eliminará permanentemente.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarUsuario;