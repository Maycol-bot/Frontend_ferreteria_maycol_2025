// src/views/Usuarios.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaUsuarios from '../components/usuarios/TablaUsuarios.jsx';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario.jsx';
import ModalEditarUsuario from '../components/usuarios/ModalEditarUsuario.jsx';
import ModalEliminarUsuario from '../components/usuarios/ModalEliminarUsuario.jsx';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contrasena: ""
  });

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/usuarios');
      if (!respuesta.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const datos = await respuesta.json();
      setUsuarios(datos);
      setUsuariosFiltrados(datos); // CORREGIDO: "usuariosFiltrados"
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  // CORREGIDO: busca por ID y usuario
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase().trim();
    setTextoBusqueda(texto);

    const filtrados = usuarios.filter((usuario) => {
      const id = usuario.id_usuario?.toString().toLowerCase() || ""; // minúscula
      const nombre = usuario.usuario?.toLowerCase() || "";
      return id.includes(texto) || nombre.includes(texto);
    });

    setUsuariosFiltrados(filtrados); // CORREGIDO
    setPaginaActual(1);
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditado(usuario);
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async (usuarioActualizado) => {
    if (!usuarioActualizado.usuario.trim()) {
      alert("El campo usuario no puede estar vacío");
      return;
    }
    try {
      const respuesta = await fetch(`http://localhost:3000/api/usuarios/${usuarioActualizado.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioActualizado),
      });
      if (!respuesta.ok) throw new Error('Error al actualizar el usuario');

      setMostrarModalEdicion(false);
      await obtenerUsuarios();
      alert("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el usuario");
    }
  };

  const abrirModalEliminacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/api/usuarios/${usuarioAEliminar.id_usuario}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar el usuario');
      setMostrarModalEliminar(false);
      await obtenerUsuarios();
      alert("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el usuario");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const agregarUsuario = async () => {
    if (!nuevoUsuario.usuario.trim() || !nuevoUsuario.contrasena.trim()) {
      alert("Usuario y contraseña son obligatorios");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarusuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el usuario');

      setNuevoUsuario({ usuario: "", contrasena: "" });
      setMostrarModal(false);
      await obtenerUsuarios();
      alert("Usuario agregado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el usuario");
    }
  };

  return (
    <Container className="mt-4">
      <h4>Usuarios</h4>

      <Row className="align-items-center mb-3">
        <Col lg={5} md={6} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
            placeholder="Buscar por ID o usuario..."
          />
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => setMostrarModal(true)}
          >
            + Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <TablaUsuarios
        usuarios={usuariosFiltrados} // CORREGIDO
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        elementosPorPagina={elementosPorPagina}
      />

      <ModalRegistroUsuario
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoUsuario={nuevoUsuario}
        manejarCambioInput={manejarCambioInput}
        agregarUsuario={agregarUsuario}
      />
      <ModalEditarUsuario
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        usuarioEditado={usuarioEditado}
        setUsuarioEditado={setUsuarioEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminarUsuario
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        usuario={usuarioAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Usuarios;