// src/components/compras/ModalEdicionCompra.jsx
import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ModalEdicionCompra = ({ mostrar, setMostrar, compra, onActualizado }) => {
    const [form, setForm] = useState({});
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (compra) {
            setForm({
                id_empleado: compra.id_empleado || "",
                fecha_compra: compra.fecha_compra?.slice(0, 10) || "",
                total_compra: compra.total_compra || ""
            });
        }
    }, [compra]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const res = await fetch(`http://localhost:3000/api/compra/${compra.id_compra}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.mensaje || "Error al actualizar la compra");
            }

            onActualizado();
            setMostrar(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    if (!compra) return null;

    return (
        <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Compra #{compra.id_compra}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>ID Empleado</Form.Label>
                        <Form.Control
                            type="number"
                            name="id_empleado"
                            value={form.id_empleado}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_compra"
                            value={form.fecha_compra}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Total Compra</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="total_compra"
                            value={form.total_compra}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrar(false)} disabled={cargando}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={cargando}>
                        {cargando ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalEdicionCompra;