// src/components/compras/ModalEliminarCompra.jsx
import { Modal, Button } from "react-bootstrap";

const ModalEliminarCompra = ({ mostrar, setMostrar, compra, onEliminado }) => {
    const handleEliminar = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/compra/${compra.id_compra}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.mensaje || "Error al eliminar");
        }

        onEliminado();
        setMostrar(false);
    } catch (err) {
        alert(err.message || "No se pudo eliminar la compra");
    }
};

    if (!compra) return null;

    return (
        <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">Eliminar Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro de que deseas eliminar la compra <strong>#{compra.id_compra}</strong>?</p>
                <ul className="mb-0">
                    <li><strong>Fecha:</strong> {new Date(compra.fecha_compra).toLocaleDateString('es-NI')}</li>
                    <li><strong>Total:</strong> C$ {parseFloat(compra.total_compra).toFixed(2)}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleEliminar}>
                    Sí, eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEliminarCompra;