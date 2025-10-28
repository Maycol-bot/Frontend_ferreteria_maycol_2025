import { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas.jsx';
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado.jsx';

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        email: "",
        telefono: ""
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
    };

const obtenerEmpleados = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/empleados');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los empleados');
        }
        const datos = await respuesta.json();
        setEmpleados(datos);
        setEmpleadosFiltrados(datos);
        setCargando(false);
    } catch (error) {
        console.log(error.message);
        setCargando(false);
    }
}

const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = empleados.filter(
        (empleado) =>
            empleado.primer_nombre.toLowerCase().includes(texto) ||
            empleado.segundo_nombre.toLowerCase().includes(texto) ||
            empleado.primer_apellido.toLowerCase().includes(texto) ||
            empleado.segundo_apellido.toLowerCase().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
};


    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const agregarEmpleado = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarempleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado),
    });

    if (!respuesta.ok) throw new Error('Error al agregar el empleado');
    await obtenerEmpleados();
    setMostrarModal(false);
    setNuevoEmpleado({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        email: "",
        telefono: ""
    })} catch (error) {
    console.error("Error al agregar el empleado:", error);
    alert("Error al agregar el empleado");
  }
};

    return (
        <>
            <Container className="mt-4">
                <h4>Empleados</h4>
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
                        variant="primary  "
                        onClick={() => setMostrarModal(true)}
                    >
                        + Nuevo Empleado
                    </Button>
                </Col>

                <TablaEmpleados
                empleados={empleadosFiltrados}
                cargando={cargando}
                 />
        </Container>

        <ModalRegistroEmpleado
            mostrarModal={mostrarModal}
            setMostrarModal={setMostrarModal}
            agregarEmpleado={agregarEmpleado}
            nuevoEmpleado={nuevoEmpleado}
            manejarCambioInput={manejarCambioInput}
        />
        </>
    );

};
export default Empleados;