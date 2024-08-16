import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../Config/redux/store";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Menu from "../Pages/Menu";
import Home from "../Pages/Home";


function RoutesApp() {

    return (
        <Provider store={store} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home/:match" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default RoutesApp;