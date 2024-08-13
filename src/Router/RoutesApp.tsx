import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Menu from "../Pages/Menu";
import Home from "../Pages/Home";

function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;