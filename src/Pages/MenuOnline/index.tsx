import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';
import iconRestart from '../../assets/icon-restart.svg';

import Button from "../../Components/Button";
import Input from "../../Components/Input";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";

function MenuOnline() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [loadingMatch, setLoadingMatch] = useState<boolean>(false);

    const navigate = useNavigate();
    var ws;

    useEffect(() => {

        const photoLocalStorage = localStorage.getItem("photo_user");

        if (photoLocalStorage) {
            const photoJson = JSON.parse(photoLocalStorage);

            setPhoto(photoJson.photo)
        }

    }, []);


    function handleNavigate(url: string) {
        navigate(url, { replace: true });
    }

    async function searchForMatch() {
        setLoadingMatch(true);

        const tokenJson = localStorage.getItem("token");

        try {

            if (tokenJson) {

                const token = JSON.parse(tokenJson);

                const match = await axios.post(baseUrl + "/match", {}, {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("========================================");
                connect(match.data.id);
                // await connect("3d1f10bd-e735-46e8-b6e9-53612634553c");
            }

            setLoadingMatch(false);
        } catch (e) {
            setLoadingMatch(false);
            console.error("Error finding match")
        }

    }

    async function connect(id: string) {
        if (!ws) {
            const ticket = (await axios.post(`${baseUrl}/ticket/${id}`)).data.ticket;
            console.log("=============================")
            console.log(ticket)

            ws = new WebSocket("ws://localhost:8080/")
        }
    }

    return (
        <Styled.Container>
            <Styled.Header>
                <img
                    src={logoImg}
                    alt="logo do site"
                    onClick={() => handleNavigate("/")}
                />

                <img
                    src={photo ? photo : noUser}
                    alt="foto do usuario"

                    onClick={() => handleNavigate("/info_user")}
                    className="photoPerfil"
                />
            </Styled.Header>

            {/* {photo} */}
            {/* <Home /> */}

            <Styled.ContainerContent disabled={loadingMatch} >
                <Button
                    btn="BUTTON_YALLOW"
                    option={false}
                    onClick={searchForMatch}
                >

                    {loadingMatch ?
                        <img src={iconRestart} alt="icone para carregamento" />
                        : "PROCURAR PARTIDA"}
                </Button>

                <Styled.SourcePlayer visible={false} >

                    <span>Procurar player por ID</span>
                    <Input type="text" placeholder="ID" />

                    <ul>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>

                </Styled.SourcePlayer>

                <Styled.AccordionFriends>
                    <strong>Amigos</strong>
                    <ul>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>
                </Styled.AccordionFriends>

            </Styled.ContainerContent>

        </Styled.Container>
    )
}

export default MenuOnline;