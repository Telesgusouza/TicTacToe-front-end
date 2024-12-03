import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../Config/redux/store";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Menu from "../Pages/Menu";
import Home from "../Pages/Home";
import MenuOnline from "../Pages/MenuOnline";
import InfoUser from "../Pages/InfoUser";


function RoutesApp() {

    return (
        <Provider store={store} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/home/:match" element={<Home />} />
                    <Route path="/home/:match/:idMatch" element={<Home />} />
                    <Route path="/menu_match_online" element={<MenuOnline />} />

                    <Route path="/info_user/:page" element={<InfoUser />} />
                    <Route path="/info_user" element={<InfoUser />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default RoutesApp;