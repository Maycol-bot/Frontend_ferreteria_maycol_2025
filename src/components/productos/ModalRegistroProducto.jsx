// src/components/productos/ModalRegistroProducto.jsx

import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ModalRegistroProducto = ({ mostrar, setMostrar, onProductoRegistrado }) => {
  const [formData, setFormData] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // Resetear formulario al abrir
  useEffect(() => {
    if (mostrar) {
      setFormData({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setError('');
      setExito('');
    }
  }, [mostrar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:3000/api/producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || 'Error al registrar el producto');
      }

      setExito('Producto registrado exitosamente');
      setTimeout(() => {
        onProductoRegistrado(); // Recargar lista
        setMostrar(false);
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Producto</Modal.Title>
      </Modal.Header>

      <Form onSubmit={manejarSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {exito && <Alert variant="success">{exito}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto *</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={formData.nombre_producto}
              onChange={manejarCambio}
              required
              placeholder="Ej: Laptop Dell Inspiron"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="descripcion_producto"
              value={formData.descripcion_producto}
              onChange={manejarCambio}
              placeholder="Opcional: características, marca, etc."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ID Categoría *</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={formData.id_categoria}
              onChange={manejarCambio}
              required
              min="1"
              placeholder="Ej: 1 (Electrónicos), 2 (Ropa)..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Unitario *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio_unitario"
              value={formData.precio_unitario}
              onChange={manejarCambio}
              required
              min="0"
              placeholder="0.00"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock *</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={manejarCambio}
              required
              min="0"
              placeholder="Cantidad en inventario"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen (opcional)</Form.Label>
            <Form.Control
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={manejarCambio}
              placeholder="https://ejemplo.com/producto.jpg"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrar(false)} disabled={cargando}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Guardar Producto'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistroProducto;