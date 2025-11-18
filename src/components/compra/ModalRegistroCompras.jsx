// src/components/compras/ModalRegistroCompra.jsx
import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ModalRegistroCompra = ({ mostrar, setMostrar, onRegistrado }) => {
    const [form, setForm] = useState({
        id_empleado: "",
        fecha_compra: new Date().toISOString().slice(0, 10),
        total_compra: ""
    });
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const res = await fetch("http://localhost:3000/api/compras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Error al registrar la compra");

            onRegistrado();           // recarga la tabla
            setMostrar(false);        // cierra el modal
            setForm({
                id_empleado: "",
                fecha_compra: new Date().toISOString().slice(0, 10),
                total_compra: ""
            });
        } catch (err) {
            setError(err.message || "No se pudo registrar la compra");
        } finally {
            setCargando(false);
        }
    };

    return (
        <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Compra</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>ID del Empleado *</Form.Label>
                        <Form.Control
                            type="number"
                            name="id_empleado"
                            value={form.id_empleado}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="Ej: 3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de la Compra</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_compra"
                            value={form.fecha_compra}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Total de la Compra *</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="total_compra"
                            value={form.total_compra}
                            onChange={handleChange}
                            required
                            min="0.01"
                            placeholder="0.00"
                        />
                        <Form.Text>Monto total en córdobas</Form.Text>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrar(false)} disabled={cargando}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit" disabled={cargando}>
                        {cargando ? "Guardando..." : "Registrar Compra"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalRegistroCompra;