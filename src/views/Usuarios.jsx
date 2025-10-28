import { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import TablaUsuarios from '../components/usuarios/TablaUsuarios.jsx';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas.jsx';
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario.jsx';

const Usuarios = () => {
 const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [usuarioFiltrados, setUsuarioFiltrados] = useState([]);
    
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: "",
        contrasena: "",
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    };

const obtenerUsuarios = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos');
        }
        const datos = await respuesta.json();
        setUsuarios(datos);
        setUsuarioFiltrados(datos);
        setCargando(false);
    } catch (error) {
        console.log(error.message);
        setCargando(false);
    }
}

const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
        (usuario) =>
            usuario.Id_usuario.toLowerCase().includes(texto) 
    );
    setUsuarioFiltrados(filtrados);
};


    useEffect(() => {
        obtenerUsuarios();
    }, []);

const agregarUsuario = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarusuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!respuesta.ok) throw new Error('Error al agregar el usuario');

    // limpiar modal y refrescar lista
    setNuevoUsuario({ usuario: "", contrasena: "" });
    setMostrarModal(false);
    await obtenerUsuarios();
  } catch (error) {
    console.error("Error al agregar el usuario:", error);
    alert("Error al agregar el usuario");
  }
};


    return (
        <>
            <Container className="mt-4">
                <h4>Usuario</h4>
                <Row>
            
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <Col className="text-end">
                   <Button
                    variant="primary"

                    onClick={() => setMostrarModal(true)}
                >
                   + Nuevo Usuario
                </Button>
                </Col>

                <TablaUsuarios
                    usuarios ={usuarioFiltrados}
                    cargando={cargando}
                />
        </Container>

            <ModalRegistroUsuario
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                nuevoUsuario={nuevoUsuario}
                manejarCambioInput={manejarCambioInput}
                agregarUsuario={agregarUsuario}
            />
        </>
    );

};
export default Usuarios;
