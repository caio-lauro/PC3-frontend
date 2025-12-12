import React from "react";
import { Routes, Route } from "react-router-dom";

import Index from "../pages/Index";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}