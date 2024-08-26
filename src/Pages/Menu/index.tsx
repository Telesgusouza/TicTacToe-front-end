import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as Styled from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { IUser } from '../../Config/interfaces';

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

                    const photoUser = await axios.get(baseUrl + "/file", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const jsonPhotoUser = photoUser ? JSON.stringify(photoUser.data) : null;
                    if (jsonPhotoUser) localStorage.setItem("photo_user", jsonPhotoUser);

                    setLogged(true);
                } catch (e) {
                    console.error("Error > ", e);
                }
            }
        }

        getUser();
    }, [])

    function handleNavigation(url: string) {

        console.log("========================");
        console.log(url === "home/online" && !logged)

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
                            option={"large"}
                            disabled={!logged ? "disabled_button" : ""}
                            onClick={() => handleNavigation("menu_match_online")}
                        >ONLINE</Button>
                    </li>
                    <li>
                        <Button
                            btn='BUTTON_BLUE'
                            option={"large"}
                            onClick={() => handleNavigation("home/vs_player")}
                        >VS PLAYER</Button>
                    </li>
                    <li>
                        <Button
                            btn='BUTTON_BLUE'
                            option={"large"}
                            onClick={() => handleNavigation("home/single_player")}
                        >CONTRA A MAQUINA</Button>
                    </li>
                </ul>

            </Styled.Section>

        </Styled.Container>
    )
}

export default Menu;
