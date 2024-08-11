import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as Styled from './style';

function Menu() {

    const navigation = useNavigate();

    function handleNavigation(url: string) {
        navigation( "/"+ url, {replace: true});
    }

    return (
        <Styled.Container>
            <Styled.Header>

                <nav>
                    <ul>
                        <li onClick={() => handleNavigation("login")} >Login</li> |
                        <li onClick={() => handleNavigation("register")} >registre-se</li>
                    </ul>
                </nav>
            </Styled.Header>

            <Styled.Section>

                <h1>Jogo da velha</h1>

                <ul>
                    <li><Button btn='BUTTON_YALLOW' option={true} >ONLINE</Button></li>
                    <li><Button btn='BUTTON_BLUE' option={true} >CO-OP LOCAL</Button></li>
                    <li><Button btn='BUTTON_BLUE' option={true} >CONTRA A MAQUINA</Button></li>
                </ul>

            </Styled.Section>

        </Styled.Container>
    )
}

export default Menu;
