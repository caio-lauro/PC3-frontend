import React from "react";
import { Routes, Route } from "react-router-dom";

import Index from "../pages/Index";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Pedido from "../pages/Pedido";
import Relatorio from "../pages/Relatorio";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pedido" element={<Pedido />} />
            <Route path="/relatorio" element={<Relatorio />} />
        </Routes>
    );
}