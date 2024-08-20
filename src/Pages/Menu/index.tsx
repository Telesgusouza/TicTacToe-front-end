import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as Styled from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { IRootReducer, IUser } from '../../Config/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../Config/ActionTypes';



function Menu() {

    const [logged, setLogged] = useState<boolean>(false);

    const navigation = useNavigate();

    useEffect(() => {

        async function getUser() {
            const jsonToken = localStorage.getItem("token");

            setLogged(false);

            if (!!jsonToken) {
                try {
                    const token = JSON.parse(jsonToken);

                    const requestUser = await axios.get(baseUrl + "/user", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    const dataUser: IUser = requestUser.data;
                    const jsonDataUser = JSON.stringify(dataUser);
                    localStorage.setItem("user", jsonDataUser);

                    setLogged(true);
                } catch (e) {
                    console.error("Error > ", e);
                }
            }
        }

        getUser();
    }, [])

    function handleNavigation(url: string) {
        if (url === "home/online" && !logged) return;

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
                    <li>
                        <Button
                            btn='BUTTON_YALLOW'
                            option={true}
                            disabled={!logged}
                            onClick={() => handleNavigation("/menu")}
                        >ONLINE</Button>
                    </li>
                    <li>
                        <Button
                            btn='BUTTON_BLUE'
                            option={true}
                            onClick={() => handleNavigation("home/vs_player")}
                        >VS PLAYER</Button>
                    </li>
                    <li>
                        <Button
                            btn='BUTTON_BLUE'
                            option={true}
                            onClick={() => handleNavigation("home/single_player")}
                        >CONTRA A MAQUINA</Button>
                    </li>
                </ul>

            </Styled.Section>

        </Styled.Container>
    )
}

export default Menu;
