import React from "react";
import { Routes, Route } from "react-router-dom";
import Cadastro from "../pages/Cadastro";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<></>} />
            <Route path="cadastrar" element={<Cadastro />} />
        </Routes>
    );
}