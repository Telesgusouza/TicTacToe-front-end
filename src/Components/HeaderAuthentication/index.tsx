import { useNavigate } from 'react-router-dom';
import * as Styled from './style';

function HeaderAuthentication() {

    const navigate = useNavigate();

    function backPage() {

        navigate("/", {replace: true});
    }

    return (
        <Styled.Header>
            <nav>
                <ul>
                    <li onClick={backPage} >VOLTAR </li>
                </ul>
            </nav>
        </Styled.Header>
    )
}

export default HeaderAuthentication;