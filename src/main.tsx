
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import RoutesApp from './Router/RoutesApp';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesApp />
    <ToastContainer />
  </StrictMode>
)
