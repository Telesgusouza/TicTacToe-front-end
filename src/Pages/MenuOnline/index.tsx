import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';
// import iconRestart from '../../assets/icon-restart.svg';

import Button from "../../Components/Button";
import Input from "../../Components/Input";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";
// import { useDispatch } from "react-redux";
import { IFriends } from "../../Config/interfaces";
import { toast } from "react-toastify";

function MenuOnline() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [loadingMatch, setLoadingMatch] = useState<boolean>(false);

    const [listFriends, setListFriends] = useState<IFriends[]>([]);

    const navigate = useNavigate();
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {

        const photoLocalStorage = localStorage.getItem("photo_user");

        if (photoLocalStorage) {
            const photoJson = JSON.parse(photoLocalStorage);

            setPhoto(photoJson.photo)
        }

    }, []);

    useEffect(() => {
        async function getListFriends() {
            try {
                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {
                    const token = JSON.parse(jsonToken);

                    const requestData = await axios.get(baseUrl + "/user/list_friends", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const jsonListFriends = JSON.stringify(requestData.data);

                    localStorage.setItem("list_friends", jsonListFriends);

                    setListFriends(requestData.data);
                }


            } catch (error) {
                console.error("Error ao trazer lista de amigos: " + error);
            }
        }

        getListFriends();
    }, [])
    
    useEffect(() => {

        async function connectWebSocket() {

            if (loadingMatch) {
                try {

                    const idUser = await handleConnectMatch();
                    const newWs = new WebSocket("ws://localhost:8081/matchmaking?id_user=" + idUser.uid);

                    setTimeout(() => {
                        toast.warn("Erro ao encotrar partida");
                        closeQueueMatch(newWs);
                    }, 1000*70);

                    setWs(newWs);

                    newWs.onopen = function () {
                        console.log("Conexão estabelecida");
                        newWs.send("pong"); // Envia ping assim que a conexão é aberta
                    };

                    newWs.onclose = function () {
                        console.log("Conexão encerrada")

                        setLoadingMatch(false);

                        // setTimeout(connectWebSocket, 3000); // Reconectar após 3 segundos
                    };

                    newWs.onmessage = function (event) {
                        const message = event.data;


                        if (message.startsWith('match_started')) {
                            const matchData = JSON.parse(message.substring(13));
                            console.log('Partida encontrada:', matchData);
                            // Lógica para iniciar a partida
                        } else if (message === 'ping') {
                            newWs.send('pong');
                        } else if (message.startsWith('Match found!:')) {

                            closeQueueMatch(newWs);

                            changePage(message.replace("Match found!: ", ""));

                        }

                        // erros
                        else if (message.startsWith("Erro: ID de usuário não encontrado na sessão")) {
                            toast.warn("Erro no login, tente refazer o login na sua conta");
                            closeQueueMatch(newWs);
                        } else if (message.startsWith("WebSocket session not found for one of the players")) {
                            toast.warn("Erro ao estabelecer conexão");
                            closeQueueMatch(newWs);
                        }
                    };

                    newWs.onerror = function (error) {
                        console.log("Error capturado no websockets > ", error);
                    }

                    // if (newWs) {
                    //     setTimeout(() => {
                    //         alert("deveria chegar aqui")
                    //     }, 500);
                    // }

                } catch (e) {
                    console.error("Erro na conexão websockets/WS > ", e);
                }
            }
        }

        connectWebSocket();

        return () => {
            ws?.close();
        }

    }, [loadingMatch]);

    function closeQueueMatch(currentWs: WebSocket) {
        if (currentWs) {
            currentWs.close();
            setLoadingMatch(false);
        }
    }

    async function queueMatch() {
        // closeQueueMatch
        setLoadingMatch(!loadingMatch);
    }

    async function handleConnectMatch() {

        const tokenJson = localStorage.getItem("token");

        if (tokenJson) {
            const token = JSON.parse(tokenJson);

            const requestData = await axios.get(baseUrl + "/user/id", {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });

            return requestData.data;

        } else {
            console.error("Token not found")
        }


    }

    function changePage(idMatch: string) {

        toast.success("Partida encontrada com sucesso");

        setTimeout(() => {
            navigate("/home/online/" + idMatch, { replace: true });
        }, 500);

    }

    function handleNavigate(url: string) {
        navigate(url, { replace: true });
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

            <Styled.ContainerContent >


                <Button
                    onClick={queueMatch}
                    btn="BUTTON_YALLOW"
                    option="small"

                >
                    {loadingMatch ? 'Procurando partida...' : 'Procurar Partida'}
                </Button>

                <Styled.SourcePlayer visible={"no_visible"} >

                    <span>Procurar player por ID</span>
                    <Input type="text" placeholder="ID" />

                    <ul>
                        { }
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>

                </Styled.SourcePlayer>

                {listFriends.length > 0 && (
                    <>
                        <Styled.AccordionFriends>
                            <strong>Amigos</strong>
                            <ul>
                                {listFriends.map((resp) => (

                                    <li key={resp.id} >
                                        <img src={!resp.img ? noUser : resp.img} alt="photo" />
                                        <div>
                                            <strong>{resp.name}</strong>
                                            <p>#{resp.id}</p>
                                        </div>
                                    </li>

                                ))}

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>
                            </ul>
                        </Styled.AccordionFriends>
                    </>
                )}



            </Styled.ContainerContent>

        </Styled.Container>
    )
}

export default MenuOnline;