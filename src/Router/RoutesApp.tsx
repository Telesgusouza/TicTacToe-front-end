import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "../Pages/Authentication";
import Menu from "../Pages/Menu";


function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/authentication" element={<Authentication />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;