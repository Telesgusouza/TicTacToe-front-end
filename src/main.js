import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from './Router/RoutesApp';
createRoot(document.getElementById('root')).render(_jsxs(StrictMode, { children: [_jsx(RoutesApp, {}), _jsx(ToastContainer, {})] }));
