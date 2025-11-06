// src/components/ventas/ModalEdicionVenta.jsx
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionVenta = ({
    mostrar,
    setMostrar,
    ventaEditada,
    setVentaEditada,
    guardarEdicion,
}) => {
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setVentaEditada((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="idCliente">
                        <Form.Label>ID Cliente</Form.Label>
                        <Form.Control
                            type="number"
                            name="id_cliente"
                            value={ventaEditada?.id_cliente || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: 5"
                            min="1"
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="idEmpleado">
                        <Form.Label>ID Empleado</Form.Label>
                        <Form.Control
                            type="number"
                            name="id_empleado"
                            value={ventaEditada?.id_empleado || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: 2"
                            min="1"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fechaVenta">
                        <Form.Label>Fecha de Venta</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_venta"
                            value={ventaEditada?.fecha_venta || ""}  // ya viene como YYYY-MM-DD
                            onChange={manejarCambio}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="totalVenta">
                        <Form.Label>Total de Venta (₡)</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="total_venta"
                            value={ventaEditada?.total_venta || ""}
                            onChange={manejarCambio}
                            placeholder="Ej: 12500.50"
                            min="0.01"
                            required
                        />
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
                        !ventaEditada?.id_cliente ||
                        !ventaEditada?.id_empleado ||
                        !ventaEditada?.fecha_venta ||
                        !ventaEditada?.total_venta
                    }
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionVenta;