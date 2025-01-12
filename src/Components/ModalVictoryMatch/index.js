import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as Styled from './style';
import iconO from '../../assets/icon-o.svg';
import iconX from '../../assets/icon-x.svg';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal';
function ModalVictoryMatch(_a) {
    var victory = _a.victory, close = _a.close;
    var navigate = useNavigate();
    function handleQuit() {
        navigate("/", { replace: true });
    }
    return (_jsx(Styled.Container, { children: _jsx(Reveal, { y: -30, duration: .3, children: _jsx(Styled.ContainerContent, { victory: victory.player, children: _jsxs("article", { children: [victory.player !== "DRAW" && (_jsx(_Fragment, { children: _jsxs("span", { children: ["PLAYER ", victory.player === "PLAYER_ONE" ? "1" : "2", " GANHOU"] }) })), _jsx(Styled.Title, { children: victory.player === "DRAW" ? (_jsx(_Fragment, { children: _jsx("strong", { children: "DEU VELHA" }) })) : (_jsxs(_Fragment, { children: [_jsx("img", { src: victory.player === "PLAYER_ONE" ? iconO : iconX, alt: "icon do vencedor" }), _jsx("strong", { children: "LEVA A RODADA" })] })) }), _jsxs("div", { children: [_jsx(Button, { btn: 'BUTTON_SILVER', option: "small", onClick: handleQuit, children: "VOLTAR" }), _jsx(Button, { btn: 'BUTTON_YALLOW', option: "small", onClick: close, children: "PR\u00D3XIMO ROUND" })] })] }) }) }) }));
}
export default ModalVictoryMatch;
