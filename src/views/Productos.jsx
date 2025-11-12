// src/pages/Productos.jsx

import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos.jsx';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import ModalRegistroProducto from '../components/productos/ModalRegistroProducto.jsx';
import ModalEdicionProducto from '../components/productos/ModalEdicionProducto.jsx';
import ModalEliminacionProducto from "../components/productos/ModalEliminarProducto.jsx";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    // === CATÁLOGO ===
    const [categorias, setCategorias] = useState([]);

    // === MODALES ===
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEdicion, setMostrarEdicion] = useState(false);
    const [mostrarEliminacion, setMostrarEliminacion] = useState(false);

    const [productoAEditar, setProductoAEditar] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    // === PAGINACIÓN ===
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 5;

    const productosPaginados = productosFiltrados.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
    );

    // === OBTENER NOMBRE DE CATEGORÍA ===
    const obtenerNombreCategoria = async (id_categoria) => {
        if (!id_categoria) return '—';
        try {
            const resp = await fetch(`http://localhost:3000/api/categorias/${id_categoria}`);
            if (!resp.ok) return '—';
            const data = await resp.json();
            return data.nombre_categoria || '—';
        } catch (error) {
            console.error("Error al cargar categoría:", error);
            return '—';
        }
    };

    // === CARGAR PRODUCTOS CON NOMBRE DE CATEGORÍA ===
    const obtenerProductos = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/productos');
            if (!resp.ok) throw new Error('Error al cargar productos');
            const productosRaw = await resp.json();

            const productosConNombres = await Promise.all(
                productosRaw.map(async (p) => ({
                    ...p,
                    nombre_categoria: await obtenerNombreCategoria(p.id_categoria)
                }))
            );

            setProductos(productosConNombres);
            setProductosFiltrados(productosConNombres);
            setCargando(false);
        } catch (error) {
            console.error(error);
            alert("Error al cargar productos.");
            setCargando(false);
        }
    };

    // === CARGAR CATÁLOGO DE CATEGORÍAS ===
    const obtenerCategorias = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/categorias');
            if (!resp.ok) throw new Error('Error al cargar categorías');
            const datos = await resp.json();
            setCategorias(datos);
        } catch (error) {
            console.error(error);
        }
    };

    // === BÚSQUEDA ===
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtrados = productos.filter(p =>
            p.nombre_producto.toLowerCase().includes(texto) ||
            (p.descripcion_producto && p.descripcion_producto.toLowerCase().includes(texto)) ||
            (p.nombre_categoria && p.nombre_categoria.toLowerCase().includes(texto))
        );
        setProductosFiltrados(filtrados);
        setPaginaActual(1);
    };

    // === ABRIR MODALES ===
    const abrirModalRegistro = () => {
        setMostrarRegistro(true);
    };

    const abrirModalEdicion = (producto) => {
        setProductoAEditar(producto);
        setMostrarEdicion(true);
    };

    const abrirModalEliminacion = (producto) => {
        setProductoAEliminar(producto);
        setMostrarEliminacion(true);
    };

    // === ELIMINAR ===
    const eliminarProducto = async () => {
        if (!productoAEliminar) return;

        try {
            const res = await fetch(`http://localhost:3000/api/producto/${productoAEliminar.id_producto}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.mensaje || 'Error al eliminar');
            }

            await obtenerProductos();
            setMostrarEliminacion(false);
        } catch (error) {
            alert(error.message || "No se pudo eliminar el producto.");
        }
    };

    // === LIMPIEZA DE MODALES ===
    const cerrarModalRegistro = () => {
        setMostrarRegistro(false);
    };

    const cerrarModalEdicion = () => {
        setMostrarEdicion(false);
        setProductoAEditar(null);
    };

    const cerrarModalEliminacion = () => {
        setMostrarEliminacion(false);
        setProductoAEliminar(null);
    };

    

    // === useEffect ===
    useEffect(() => {
        obtenerProductos();
        obtenerCategorias();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Productos</h4>

                <Row className="mb-3 align-items-center">
                    <Col lg={3} md={4} sm={6} xs={12} className="text-start">
                        <Button
                            variant="secondary"
                            className="w-100 mb-2"
                            onClick={() => alert('PDF en desarrollo...')}
                        >
                            Generar PDF
                        </Button>
                    </Col>

                    <Col lg={3} md={4} sm={6} xs={12} className="text-end">
                        <Button
                            className="color-boton-registro w-100"
                            onClick={abrirModalRegistro}
                        >
                            + Nuevo Producto
                        </Button>
                    </Col>

                    <Col lg={6} md={12}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <TablaProductos
                    productos={productosPaginados}
                    cargando={cargando}
                    recargarProductos={obtenerProductos}
                    onEditar={abrirModalEdicion}
                    onEliminar={abrirModalEliminacion}
                    totalElementos={productosFiltrados.length}
                    elementosPorPagina={elementosPorPagina}
                    paginaActual={paginaActual}
                    establecerPaginaActual={setPaginaActual}
                />
            </Container>

            {/* === MODALES === */}
            <ModalRegistroProducto
                mostrar={mostrarRegistro}
                setMostrar={cerrarModalRegistro}
                onRegistrado={obtenerProductos}
                categorias={categorias}
            />

            <ModalEdicionProducto
                mostrar={mostrarEdicion}
                setMostrar={cerrarModalEdicion}
                producto={productoAEditar}
                onActualizado={obtenerProductos}
                categorias={categorias}
            />

            <ModalEliminacionProducto
                mostrar={mostrarEliminacion}
                setMostrar={cerrarModalEliminacion}
                producto={productoAEliminar}
                confirmarEliminacion={eliminarProducto}
            />
        </>
    );
};

export default Productos;