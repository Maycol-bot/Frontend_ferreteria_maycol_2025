// src/pages/Compras.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaCompras from '../components/compras/TablaCompras.jsx';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra.jsx';
import ModalEdicionCompra from '../components/compras/ModalEdicionCompra.jsx';
import ModalEliminarCompra from '../components/compras/ModalEliminarCompra.jsx';

const Compras = () => {
    const [compras, setCompras] = useState([]);
    const [comprasFiltradas, setComprasFiltradas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    // Modales
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEdicion, setMostrarEdicion] = useState(false);
    const [mostrarEliminacion, setMostrarEliminacion] = useState(false);

    const [compraEditada, setCompraEditada] = useState(null);
    const [compraAEliminar, setCompraAEliminar] = useState(null);

    // Paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 8;
    const comprasPaginadas = comprasFiltradas.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
    );

    // Cargar compras
    const obtenerCompras = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/compras');
            const data = await res.json();
            setCompras(data);
            setComprasFiltradas(data);
            setCargando(false);
        } catch (error) {
            console.error(error);
            alert("Error al cargar compras");
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerCompras();
    }, []);

    // Búsqueda
    const manejarBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtradas = compras.filter(c =>
            c.id_compra.toString().includes(texto) ||
            c.id_empleado.toString().includes(texto)
        );
        setComprasFiltradas(filtradas);
        setPaginaActual(1);
    };

    // === ABRIR MODALES ===
    const abrirModalEdicion = (compra) => {
        setCompraEditada({ ...compra });
        setMostrarEdicion(true);
    };

    const abrirModalEliminacion = (compra) => {
        setCompraAEliminar(compra);
        setMostrarEliminacion(true);
    };

    // === EDITAR COMPRA (igual que en Categorias.jsx) ===
    const guardarEdicion = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/compra/${compraEditada.id_compra}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(compraEditada)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.mensaje || 'Error al actualizar compra');
            }

            await obtenerCompras();
            setMostrarEdicion(false);
            setCompraEditada(null);
        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar la compra");
        }
    };

    // === ELIMINAR COMPRA (igual que en Categorias.jsx) ===
    const confirmarEliminacion = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/compra/${compraAEliminar.id_compra}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.mensaje || 'Error al eliminar');
            }

            await obtenerCompras();
            setMostrarEliminacion(false);
            setCompraAEliminar(null);
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar la compra");
        }
    };

    return (
        <Container className="mt-4">
            <h4>Compras a Proveedores</h4>

            <Row className="mb-3 align-items-center">
                <Col lg={3} md={4} sm={6}>
                    <Button
                        variant="success"
                        className="w-100"
                        onClick={() => setMostrarRegistro(true)}
                    >
                        + Nueva Compra
                    </Button>
                </Col>

                <Col lg={6} md={8}>
                    <CuadroBusquedas
                        textoBusqueda={textoBusqueda}
                        manejarCambioBusqueda={manejarBusqueda}
                        placeholder="Buscar por ID o empleado..."
                    />
                </Col>
            </Row>

            <TablaCompras
                compras={comprasPaginadas}
                cargando={cargando}
                abrirModalEdicion={abrirModalEdicion}
                abrirModalEliminacion={abrirModalEliminacion}
                totalElementos={comprasFiltradas.length}
                elementosPorPagina={elementosPorPagina}
                paginaActual={paginaActual}
                establecerPaginaActual={setPaginaActual}
            />

            {/* MODALES */}
            <ModalRegistroCompra
                mostrar={mostrarRegistro}
                setMostrar={setMostrarRegistro}
                onRegistrado={obtenerCompras}
            />

            <ModalEdicionCompra
                mostrar={mostrarEdicion}
                setMostrar={setMostrarEdicion}
                compra={compraEditada}
                setCompra={setCompraEditada}
                onGuardar={guardarEdicion}
            />

            <ModalEliminarCompra
                mostrar={mostrarEliminacion}
                setMostrar={setMostrarEliminacion}
                compra={compraAEliminar}
                onConfirmar={confirmarEliminacion}
            />
        </Container>
    );
};

export default Compras;