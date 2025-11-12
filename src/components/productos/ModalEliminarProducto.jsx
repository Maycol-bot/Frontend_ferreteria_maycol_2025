// src/components/productos/ModalEliminacionProducto.jsx
import { Modal, Button, Alert } from "react-bootstrap";

const ModalEliminacionProducto = ({
  mostrar,
  setMostrar,
  producto,
  confirmarEliminacion
}) => {
  if (!producto) return null;

  const handleEliminar = async () => {
    await confirmarEliminacion();
    setMostrar(false);
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="warning">
          <strong>¡Advertencia!</strong> Esta acción es <strong>irreversible</strong>.
        </Alert>

        <p>
          ¿Estás seguro de que deseas eliminar el siguiente producto?
        </p>

        <div className="bg-light p-3 rounded">
          <p className="mb-1">
            <strong>ID:</strong> {producto.id_producto}
          </p>
          <p className="mb-1">
            <strong>Nombre:</strong> {producto.nombre_producto}
          </p>
          {producto.descripcion_producto && (
            <p className="mb-1 text-muted">
              <small>{producto.descripcion_producto}</small>
            </p>
          )}
          <p className="mb-0">
            <strong>Stock:</strong> {producto.stock} | <strong>Precio:</strong> C${parseFloat(producto.precio_unitario).toFixed(2)}
          </p>
        </div>

        <p className="mt-3 text-muted">
          Esta acción eliminará el producto de forma permanente.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrar(false)}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={handleEliminar}
        >
          Eliminar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionProducto;