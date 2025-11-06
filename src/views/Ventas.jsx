// src/views/Ventas.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaVentas from '../components/ventas/TablaVentas';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta';
import ModalEdicionVenta from '../components/ventas/ModalEdicionVenta';
import ModalEliminacionVenta from '../components/ventas/ModalEliminacionVenta';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [ventaEditada, setVentaEditada] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: '',
    id_empleado: '',
    fecha_venta: new Date().toISOString().split('T')[0],
    total_venta: ''
  });

  // LA FUNCIÓN MÁGICA QUE RESUELVE TODO CON MYSQL DATETIME
  const formatearFechaParaMySQL = (fecha) => {
    if (!fecha) return '2025-01-01 00:00:00';
    // Si viene con T (ISO), quita la T y la Z
    if (fecha.includes('T')) {
      return fecha.replace('T', ' ').substring(0, 19);
    }
    // Si solo es fecha, agrega hora
    if (fecha.length === 10) {
      return fecha + ' 00:00:00';
    }
    return fecha;
  };

  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaVenta(prev => ({ ...prev, [name]: value }));
  };

  const obtenerVentas = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/ventas');
      if (!respuesta.ok) throw new Error('Error al cargar ventas');
      const datos = await respuesta.json();
      setVentas(datos);
      setVentasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor");
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = ventas.filter(v =>
      v.id_venta.toString().includes(texto) ||
      v.id_cliente.toString().includes(texto) ||
      v.id_empleado.toString().includes(texto) ||
      v.fecha_venta.includes(texto) ||
      v.total_venta.toString().includes(texto)
    );
    setVentasFiltradas(filtrados);
    setPaginaActual(1);
  };

  const abrirModalEdicion = (venta) => {
    setVentaEditada({
      ...venta,
      fecha_venta: venta.fecha_venta.split(' ')[0] // solo YYYY-MM-DD para el input date
    });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!ventaEditada?.id_cliente || !ventaEditada?.total_venta) {
      alert("Cliente y total son obligatorios");
      return;
    }

    try {
      const datos = {
        id_cliente: Number(ventaEditada.id_cliente),
        id_empleado: Number(ventaEditada.id_empleado),
        fecha_venta: formatearFechaParaMySQL(ventaEditada.fecha_venta),
        total_venta: parseFloat(ventaEditada.total_venta)
      };

      console.log("Enviando a backend:", datos); // para que veas que está bien

      const respuesta = await fetch(`http://localhost:3000/api/ventas/${ventaEditada.id_venta}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        console.error("Error del backend:", error);
        throw new Error(error.mensaje || "Error del servidor");
      }

      setMostrarModalEdicion(false);
      setVentaEditada(null);
      await obtenerVentas();
      alert("Venta actualizada con éxito");
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al actualizar: " + error.message);
    }
  };

  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/ventas/${ventaAEliminar.id_venta}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) throw new Error("Error al eliminar");
      setMostrarModalEliminar(false);
      setVentaAEliminar(null);
      await obtenerVentas();
      alert("Venta eliminada");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const agregarVenta = async () => {
    if (!nuevaVenta.id_cliente || !nuevaVenta.id_empleado || !nuevaVenta.total_venta) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const datos = {
        id_cliente: Number(nuevaVenta.id_cliente),
        id_empleado: Number(nuevaVenta.id_empleado),
        fecha_venta: formatearFechaParaMySQL(nuevaVenta.fecha_venta),
        total_venta: parseFloat(nuevaVenta.total_venta)
      };

      const respuesta = await fetch('http://localhost:3000/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.mensaje || "Error al registrar");
      }

      setNuevaVenta({
        id_cliente: '', id_empleado: '',
        fecha_venta: new Date().toISOString().split('T')[0],
        total_venta: ''
      });
      setMostrarModal(false);
      await obtenerVentas();
      alert("Venta registrada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al registrar: " + error.message);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Ventas</h4>

      <Row className="align-items-center mb-3">
        <Col lg={5} md={6} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
            + Nueva Venta
          </Button>
        </Col>
      </Row>

      <TablaVentas
        ventas={ventasPaginadas}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={ventasFiltradas.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
      />

      <ModalRegistroVenta
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaVenta={nuevaVenta}
        manejarCambioInput={manejarCambioInput}
        agregarVenta={agregarVenta}
      />

      <ModalEdicionVenta
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        ventaEditada={ventaEditada}
        setVentaEditada={setVentaEditada}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionVenta
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        venta={ventaAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Ventas;