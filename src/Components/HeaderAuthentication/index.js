import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import * as Styled from './style';
function HeaderAuthentication() {
    var navigate = useNavigate();
    function backPage() {
        navigate("/", { replace: true });
    }
    return (_jsx(Styled.Header, { children: _jsx("nav", { children: _jsx("ul", { children: _jsx("li", { onClick: backPage, children: "VOLTAR " }) }) }) }));
}
export default HeaderAuthentication;
