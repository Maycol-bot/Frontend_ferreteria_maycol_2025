import {useState} from "react";
import './App.css';
import Titulo from "./components/Titulo.jsx";
import Mensaje from "./components/Mensaje.jsx";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Importar componente Encabezado.
import Encabezado from "./components/Navegacion/Encabezado.jsx";

//Importar las vistas.
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import Catalogo from "./views/Catalogo";
import Empleados from "./views/Empleados";
import Usuarios from "./views/Usuarios";
import Ventas from "./views/Ventas";
import Clientes from "./views/Clientes";


//Importar archivo de estilos.
import "./App.css";

const App = () =>{
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}


export default App;

