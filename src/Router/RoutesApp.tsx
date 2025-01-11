import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../Config/redux/store";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Menu from "../Pages/Menu";
import Home from "../Pages/Home";
import MenuOnline from "../Pages/MenuOnline";
import InfoUser from "../Pages/InfoUser";
import RedirectRouter from "./RedirectRouter";
import ResetPassword from "../Pages/ResetPassword";

function RoutesApp() {

    return (
        <Provider store={store} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset_password" element={<ResetPassword />} />

                    <Route path="/home/:match" element={<RedirectRouter> <Home /> </RedirectRouter>} />
                    <Route path="/home/:match/:idMatch" element={<RedirectRouter> <Home /> </RedirectRouter>} />
                    <Route path="/menu_match_online" element={<RedirectRouter> <MenuOnline /> </RedirectRouter>} />

                    <Route path="/info_user/:page" element={<RedirectRouter> <InfoUser /> </RedirectRouter>} />
                    <Route path="/info_user" element={<RedirectRouter> <InfoUser /> </RedirectRouter>} />

                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default RoutesApp;