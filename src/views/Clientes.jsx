import { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import TablaClientes from '../components/clientes/TablaClientes.jsx';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas.jsx';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente.jsx';
import ModalEdicionCliente from '../components/clientes/ModalEdicionCliente.jsx';
import ModalEliminacionCliente from '../components/clientes/ModalEliminacionCliente.jsx';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        direccion: "",
        celular: "",
        email: ""
    });

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
    
    const [clienteEditado, setClienteEditado] = useState(null);
    const [clienteEliminado, setClienteEliminado] = useState(null);

    const abrirModalEdicion = (cliente) => {
        setClienteEditado(cliente);
        setMostrarModalEdicion(true);
    };

    const guardarEdicion = async () => {
        if (!clienteEditado.primer_nombre.trim()) return;
        try {
            const respuesta = await fetch(`http://localhost:3000/api/clientes/${clienteEditado.id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clienteEditado),
            });
            if (!respuesta.ok) throw new Error('Error al guardar la edición');
            setMostrarModalEdicion(false);
            await obtenerClientes();
        } catch (error) {
            console.error("Error al guardar la edición:", error);
            alert("No se pudo guardar la edición. Revisa la consola.");
        }
    };

    const abrirModalEliminacion = (cliente) => {
        setClienteEliminado(cliente);
        setMostrarModalEliminacion(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/clientes/${clienteEliminado.id_cliente}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) throw new Error('Error al eliminar el cliente');
            setClienteEliminado(null);
            setMostrarModalEliminacion(false);
            await obtenerClientes();
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("No se pudo eliminar el cliente. Revisa la consola.");
        }
    };

    const obtenerClientes = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/clientes');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los clientes');
            }
            const datos = await respuesta.json();
            setClientes(datos);
            setClientesFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = clientes.filter(
            (cliente) =>
                cliente.primer_nombre.toLowerCase().includes(texto) ||
                cliente.segundo_nombre.toLowerCase().includes(texto) ||
                cliente.primer_apellido.toLowerCase().includes(texto) ||
                cliente.segundo_apellido.toLowerCase().includes(texto)
        );
        setClientesFiltrados(filtrados);
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoCliente(prev => ({ ...prev, [name]: value }));
    };

    const agregarCliente = async () => {
        if (!nuevoCliente.primer_nombre.trim()) return;
        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarcliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCliente),
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevoCliente({
                primer_nombre: "",
                segundo_nombre: "",
                primer_apellido: "",
                segundo_apellido: "",
                direccion: "",
                celular: "",
                email: ""
            });
            setMostrarModal(false);
            await obtenerClientes(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar cliente:", error);
            alert("No se pudo guardar el cliente. Revisa la consola.");
        }
    };

    return (
        <>
            <Container className="mt-4">
                <h4>Clientes</h4>
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
                    className="my-3"
                    onClick={() => setMostrarModal(true)}
                >
                    + Nuevo Cliente
                </Button>
                </Col>

                <TablaClientes
                    clientes={clientesFiltrados}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                />

        </Container>

            <ModalRegistroCliente
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                nuevoCliente={nuevoCliente}
                agregarCliente={agregarCliente}
                manejarCambioInput={manejarCambioInput}
            />

            <ModalEdicionCliente
                mostrar={mostrarModalEdicion}
                setMostrar={setMostrarModalEdicion}
                clienteEditado={clienteEditado}
                setClienteEditado={setClienteEditado}
                guardarEdicion={guardarEdicion}
            />


            <ModalEliminacionCliente
                mostrar={mostrarModalEliminacion}
                setMostrar={setMostrarModalEliminacion}
                cliente={clienteEliminado}
                confirmarEliminacion={confirmarEliminacion}
            />

        </>
    );

};
export default Clientes;