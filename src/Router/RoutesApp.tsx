import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/SignIn";


function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;