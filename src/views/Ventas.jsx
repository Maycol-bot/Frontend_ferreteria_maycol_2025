import { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import TablaVentas from '../components/ventas/TablaVentas.jsx';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas.jsx';
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta.jsx';

const Ventas = () => {
 const [ventas, setVentas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [ventasFiltradas, setVentasFiltradas] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaVenta, setNuevaVenta] = useState({
        id_cliente: "",
        id_empleado: "",
        fecha_venta: "",
        total_venta: ""
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevaVenta((prev) => ({ ...prev, [name]: value }));
    };

const obtenerVentas = async () => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/ventas');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos');
        }
        const datos = await respuesta.json();
        setVentas(datos);
        setVentasFiltradas(datos);
        setCargando(false);
    } catch (error) {
        console.log(error.message);
        setCargando(false);
    }
}

const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = ventas.filter(
        (venta) =>
            venta.id_cliente.toLowerCase().includes(texto) ||
            venta.id_empleado.toLowerCase().includes(texto)
    );
    setVentasFiltradas(filtrados);
};


    useEffect(() => {
        obtenerVentas();
    }, []);

    const agregarVenta = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarventa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaVenta),
            });

            if (!respuesta.ok) throw new Error('Error al agregar la venta');
            await obtenerVentas();
            setMostrarModal(false);
            setNuevaVenta({
                id_cliente: "",
                id_empleado: "",
                fecha_venta: "",
                total_venta: ""
            });
        } catch (error) {
            console.error("Error al agregar la venta:", error);
            alert("Error al agregar la venta");
        }
    };

    return (
        <>
            <Container className="mt-4">
                <h4>Ventas</h4>
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
                        + Nueva Venta
                    </Button>
                </Col>

                <TablaVentas
                    ventas={ventasFiltradas}
                    cargando={cargando}
                />
        </Container>
            <ModalRegistroVenta
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                nuevaVenta={nuevaVenta}
                manejarCambioInput={manejarCambioInput}
                agregarVenta={agregarVenta}
            />
        </>
    );

};
export default Ventas;