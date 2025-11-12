// src/components/productos/ModalEdicionProducto.jsx
import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ModalEdicionProducto = ({ mostrar, setMostrar, producto, onActualizado }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (mostrar && producto) {
            setFormData({
                nombre_producto: producto.nombre_producto || '',
                descripcion_producto: producto.descripcion_producto || '',
                id_categoria: producto.id_categoria || '',
                precio_unitario: producto.precio_unitario || '',
                stock: producto.stock || '',
                imagen: producto.imagen || ''
            });
            setError('');
        }
    }, [mostrar, producto]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const res = await fetch(`http://localhost:3000/api/producto/${producto.id_producto}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.mensaje || 'Error al actualizar');

            onActualizado();
            setTimeout(() => setMostrar(false), 800);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    if (!producto) return null;

    return (
        <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto #{producto.id_producto}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={manejarSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* === CAMPOS (igual que registro) === */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control name="nombre_producto" value={formData.nombre_producto} onChange={manejarCambio} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={2} name="descripcion_producto" value={formData.descripcion_producto} onChange={manejarCambio} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría *</Form.Label>
                        <Form.Select
                            name="id_categoria"
                            value={formData.id_categoria}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.nombre_categoria}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio *</Form.Label>
                        <Form.Control type="number" step="0.01" name="precio_unitario" value={formData.precio_unitario} onChange={manejarCambio} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock *</Form.Label>
                        <Form.Control type="number" name="stock" value={formData.stock} onChange={manejarCambio} required min="0" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="url" name="imagen" value={formData.imagen} onChange={manejarCambio} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrar(false)} disabled={cargando}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={cargando}>
                        {cargando ? 'Actualizando...' : 'Actualizar'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalEdicionProducto;