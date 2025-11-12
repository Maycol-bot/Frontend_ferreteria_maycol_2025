import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos.jsx';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Productos = () => {
    const generarPDF = (productos) => {
        const doc = new jsPDF();
        // Encabezado pdf
        doc.setFillColor(28, 41, 51);
        doc.rect(0, 0, 220, 30, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.text("Lista de productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

        // Tabla de productos
        const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Cantidad"];
        const filas = productos.map((producto) => [
            producto.id_producto,
            producto.nombre_producto,
            producto.descripcion_producto,
            producto.id_categoriao,
            `C${producto.precio_unitario}`,
            producto.stock,
        ]);
        const totalPaginas = { total_pages_count_string };

        autoTable(doc, {
            head: [columnas],
            body: filas,
            startY: 40,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 2 },
            margin: { top: 20, left: 14, right: 14 },
            tableWidth: "auto",
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
            },
            pageBreak: 'auto',
            rowPageBreak: 'auto',
            didDrawPage: function (data) {
                const alturaPagina = doc.internal.pageSize.getHeight();
                const anchoPagina = doc.internal.pageSize.getWidth();

                const numeroPagina = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
                doc.text(piePagina, anchoPagina / 2 + 15, alturaPagina - 10, { align: "center" });
            },
        });
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPaginas);
        }

        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        const nombreArchivo = `productos_${dia}-${mes}-${anio}.pdf`;
        doc.save(nombreArchivo);
    };
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/productos');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los productos');
            }
            const datos = await respuesta.json();
            setProductos(datos);
            setProductosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtrados = productos.filter(
            (producto) =>
                producto.nombre_producto.toLowerCase().includes(texto) ||
                producto.descripcion_producto.toLowerCase().includes(texto)
        );
        setProductosFiltrados(filtrados);
    };


    useEffect(() => {
        obtenerProductos();
    }, []);


    return (
        <>
            <Container className="mt-4">
                <h4>Productos</h4>
                <Row>
                    onClick={productosFiltrados}
                    <Col lg={3} md={4} sm={4} xs={5}>
                        <Button
                            className="mb-3"
                            onClick={generarPDFProductos}
                            variant="secondary"
                            style={{ width: "100%" }}
                        >
                            Generar reporte PDF
                        </Button>
                    </Col>
                </Row>

                <TablaProductos
                    productos={productosFiltrados}
                    cargando={cargando}
                />
            </Container>
        </>
    );

};
export default Productos;