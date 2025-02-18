import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';

import Button from "../../Components/Button";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";
import { toast } from "react-toastify";
import Reload from "../../Components/Reload";
import { AlertWarn } from "../../Components/AlertWarn";
import baseUrlMatchMatchmaking from "../../Config/baseUrlMatchMatchmaking";

function MenuOnline() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [loadingMatch, setLoadingMatch] = useState<boolean>(false);
    const [closeQueue, setCloseQueue] = useState<boolean>(false);

    const [highLatency, setHighLatency] = useState<boolean>(false);

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

        async function connectWebSocket() {

            if (loadingMatch) {
                try {

                    const idUser = await handleConnectMatch();

                    const newWs = new WebSocket(baseUrlMatchMatchmaking + "/matchmaking?id_user=" + idUser.uid);

                    setTimeout(() => {
                        toast.warn("Erro ao encotrar partida");
                        closeQueueMatch(newWs);
                    }, 1000 * 70);

                    setWs(newWs);

                    newWs.onopen = function () {
                        console.log("Conexão estabelecida");
                        const currentTime = Date.now();
                        newWs.send(`pong:${currentTime}`); // Envia ping assim que a conexão é aberta
                    };

                    newWs.onclose = function () {
                        console.log("Conexão encerrada")

                        setLoadingMatch(false);
                        setWs(null);
                    };

                    if (closeQueue) {

                        closeQueueMatch(newWs);

                        setCloseQueue(false);
                        setLoadingMatch(false);
                        setWs(null);
                    }

                    newWs.onmessage = function (event) {
                        const message = event.data;

                        if (message.startsWith('match_started')) {
                            const matchData = JSON.parse(message.substring(13));
                            console.log('Partida encontrada: ', matchData);
                            // Lógica para iniciar a partida
                        }

                        else if (message === 'ping') {

                            const currentTime = Date.now();
                            newWs.send(`pong:${currentTime}`);

                        } else if (message.startsWith('pong')) {

                            const [_, clientTimestamp] = message.split(':');

                            if (clientTimestamp > 300) { // Ajuste este valor conforme necessário
                                console.warn(`Latência alta detectada: ${clientTimestamp}ms`);
                                setHighLatency(true);
                            } else {
                                setHighLatency(false);
                            }

                        }

                        else if (message.startsWith('Match found!:')) {

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
                        setWs(null);
                        setLoadingMatch(false);
                    }

                } catch (e) {
                    console.error("Erro na conexão websockets/WS > ", e);
                }
            }
        }


        connectWebSocket();

        return () => {
            ws?.close();
        }

    }, [loadingMatch, closeQueue]);

    function closeQueueMatch(currentWs: WebSocket) {
        if (currentWs) {
            currentWs.close();
            setLoadingMatch(false);
            setWs(null);
        }
    }

    async function queueMatch() {
        if (loadingMatch) {
            setCloseQueue(true);
        } else {
            setLoadingMatch(true)
        }
    }

    async function handleConnectMatch() {

        const tokenJson = localStorage.getItem("token");

        try {

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

        } catch (error) {
            if (axios.isAxiosError(error)) {

                const message = error.response?.data.message;

                switch (message) {

                    case "account already exists": {
                        toast.error("Conta não encontrada");
                        toast.warn("ATENÇÃO, você será redirecionado para o login para que possa fazer a authenticação");

                        setTimeout(() => {
                            navigate("/login");
                        }, 3000);

                        break;
                    }

                    default: {
                        toast.error("Erro inesperado ao trazer dados do usuario")
                        break;
                    }
                }

            } else {
                toast.error("Erro com os dados do usuario");
            }
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
        <>
            <AlertWarn msg="Alta latencia" show={highLatency ? "see" : "not_see"} />

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

                        onClick={() => handleNavigate("/info_user/menu_online")}
                        className="photoPerfil"
                    />

                </Styled.Header>

                <Styled.ContainerContent >

                    <h1>Procurar Partida</h1>

                    <Button
                        onClick={queueMatch}
                        btn="BUTTON_YALLOW"
                        option="small"

                    >
                        {loadingMatch ? <> <Reload /> </> : 'Procurar Partida'}
                    </Button>

                </Styled.ContainerContent>

            </Styled.Container>
        </>
    )
}

export default MenuOnline;