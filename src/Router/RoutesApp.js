import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Menu, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/reset_password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/home/:match", element: _jsxs(RedirectRouter, { children: [" ", _jsx(Home, {}), " "] }) }), _jsx(Route, { path: "/home/:match/:idMatch", element: _jsxs(RedirectRouter, { children: [" ", _jsx(Home, {}), " "] }) }), _jsx(Route, { path: "/menu_match_online", element: _jsxs(RedirectRouter, { children: [" ", _jsx(MenuOnline, {}), " "] }) }), _jsx(Route, { path: "/info_user/:page", element: _jsxs(RedirectRouter, { children: [" ", _jsx(InfoUser, {}), " "] }) }), _jsx(Route, { path: "/info_user", element: _jsxs(RedirectRouter, { children: [" ", _jsx(InfoUser, {}), " "] }) })] }) }) }));
}
export default RoutesApp;
