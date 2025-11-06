// src/views/Clientes.jsx
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaClientes from '../components/clientes/TablaClientes';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';
import ModalEdicionCliente from '../components/clientes/ModalEdicionCliente';
import ModalEliminacionCliente from '../components/clientes/ModalEliminacionCliente';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '',
    direccion: '', celular: '', cedula: ''
  });

  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({ ...prev, [name]: value }));
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.primer_nombre.trim() || !nuevoCliente.primer_apellido.trim()) return;

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente)
      });
      if (!respuesta.ok) throw new Error('Error al registrar');
      
      setNuevoCliente({ primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '',
        direccion: '', celular: '', cedula: '' });
      setMostrarModal(false);
      await obtenerClientes();
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) throw new Error('Error al obtener');
      const datos = await respuesta.json();
      setClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = clientes.filter(cli =>
      `${cli.primer_nombre} ${cli.segundo_nombre} ${cli.primer_apellido} ${cli.segundo_apellido}`.toLowerCase().includes(texto) ||
      cli.celular.includes(texto) || cli.cedula.includes(texto) || cli.direccion.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
    establecerPaginaActual(1);
  };

  const abrirModalEdicion = (cliente) => {
    setClienteEditado({ ...cliente });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!clienteEditado.primer_nombre.trim() || !clienteEditado.primer_apellido.trim()) {
      alert("Nombre y apellido obligatorios");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/clientes/${clienteEditado.id_cliente}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteEditado)
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.mensaje || "Error del servidor");
      }

      setMostrarModalEdicion(false);
      await obtenerClientes();
      alert("¡Cliente actualizado!");
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    }
  };

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/clientes/${clienteAEliminar.id_cliente}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        if (respuesta.status === 404) throw new Error("Cliente no encontrado");
        const error = await respuesta.json();
        throw new Error(error.mensaje || "Error del servidor");
      }

      setMostrarModalEliminar(false);
      setClienteAEliminar(null);
      await obtenerClientes();
      alert("¡Cliente eliminado correctamente!");
    } catch (error) {
      alert("No se pudo eliminar: " + error.message);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Clientes</h4>
      
      <Row className="align-items-center mb-3">
        <Col lg={5} md={6} sm={8} xs={12}>
          <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
            + Nuevo Cliente
          </Button>
        </Col>
      </Row>

      <TablaClientes
        clientes={clientesPaginados}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={clientesFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
      />

      <ModalEdicionCliente
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        clienteEditado={clienteEditado}
        setClienteEditado={setClienteEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionCliente
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        cliente={clienteAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Clientes;