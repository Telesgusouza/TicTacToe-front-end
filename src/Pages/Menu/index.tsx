import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as Styled from './style';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { IUser } from '../../Config/interfaces';

// import ReactAudioPlayer from 'react-audio-player';


import ambientMusic from '../../assets/songs/default_calm.mp3';

import { Audio } from '../../Components/Audio';

function Menu() {

    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {

        async function getUser() {
            const jsonToken = localStorage.getItem("token");

            setLogged(false);

            if (jsonToken) {
                try {
                    const token = JSON.parse(jsonToken);

                    const requestUser = await axios.get(baseUrl + "/user", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    const dataUser: IUser = requestUser.data;

                    const jsonUser: IUser = {
                        name: dataUser.name,
                        login: dataUser.login,
                        role: dataUser.role,
                        player: dataUser.player,

                        numberOfWins: dataUser.numberOfWins,
                        numberOfDraws: dataUser.numberOfDraws,
                        numberOfDefeats: dataUser.numberOfDefeats
                    }

                    const jsonDataUser = JSON.stringify(jsonUser);
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

            <Styled.ContainerAudio>

                <Audio music={ambientMusic} />

            </Styled.ContainerAudio>

        </Styled.Container>
    )
}

export default Menu;
