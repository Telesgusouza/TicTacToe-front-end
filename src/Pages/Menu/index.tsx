import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as Styled from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';

function Menu() {

    const [logged, setLogged] = useState<boolean>(false);

    const navigation = useNavigate();

    useEffect(() => {

        async function getUser() {
            const jsonToken = localStorage.getItem("token");

            setLogged(false);
            
            if (jsonToken) {
                const token = JSON.parse(jsonToken);
                // const user = axios.get(baseUrl + );

                /*
                
                ATENÇAÕ
                ADICIONAR RECUPERAR DADOS DO USUARIO
                
                */

                setLogged(true);
            }
        }

        getUser();
    }, [])

    function handleNavigation(url: string) {
        navigation("/" + url, { replace: true });
    }

    return (
        <Styled.Container>
            <Styled.Header>

                <nav>
                    <ul>
                        {logged ? (
                            <>
                                <li onClick={() => handleNavigation("login")} >Entrar com outra conta</li>
                            </>) : (
                            <>
                                <li onClick={() => handleNavigation("login")} >Login</li> |
                                <li onClick={() => handleNavigation("register")} >registre-se</li>
                            </>)}


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
