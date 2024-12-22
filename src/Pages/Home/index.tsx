import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-scroll';
import axios from "axios";
import { toast } from 'react-toastify';

import * as Styled from './style';
import Button from '../../Components/Button';
import { IBoard, IBoardWS, ICountMatches, IFriends, IMatch, IUser, IVictory } from "../../Config/interfaces";

import logoImg from '../../assets/logo.svg';
import IconXTurn from '../../assets/icon-x-turn.svg';
import IconOTurn from '../../assets/icon-o-turn.svg';
import iconRestart from '../../assets/icon-restart.svg';
import imgNoUser from '../../assets/no-user.svg';

import iconX from "../../assets/icon-x.svg";
import iconO from "../../assets/icon-o.svg";

import iconXEmptyField from "../../assets/icon-x-outline.svg";
import iconOEmptyField from "../../assets/icon-o-outline.svg";

import ModalVictoryMatch from "../../Components/ModalVictoryMatch";
import Reveal from "../../Components/Reveal";
import baseUrl from "../../Config/baseUrl";
import InfoAdversary from "../../Components/InfoAdversary";

interface IStatusOnline {
    loading: boolean;
    text: string;
}

function Home() {

    const initialBoard: IBoard = {
        row_1: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_2: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_3: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
    };

    const [photo, setPhoto] = useState<string | null>(null);

    const [scoreboard, setScoreboard] = useState<ICountMatches>({ playerOne: 0, playerTwo: 0, draws: 0 });
    const [playerVictory, setPlayerVictory] = useState<IVictory>({ player: "DRAW", open: false });
    const [turnPlayer, setTurnPlayer] = useState<boolean>(false);
    const [board, setBoard] = useState<IBoard>(initialBoard);

    // online
    const [player, setPlayer] = useState<IUser | null>(null);
    const [infoMatch, setInfoMatch] = useState<IMatch | null>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [statusOnlie, setStatusOnlie] = useState<IStatusOnline>({ loading: true, text: "Carregando Tabuleiro" });
    const [pauseMatch, setPauseMatch] = useState<boolean>(false);
    const [adversaryPhoto, setAdversaryPhoto] = useState<string | null>(null);
    const [infoAdversaryToggle, setInfoAdversaryToggle] = useState<boolean>(false);
    const [matchClosed, setMatchClosed] = useState(false);

    const { match, idMatch } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        async function getInfoPlayer() {
            const jsonToken = localStorage.getItem("token");

            if (jsonToken) {
                try {

                    const token = JSON.parse(jsonToken);

                    const response = await axios.get(`${baseUrl}/user`, {
                        'headers': {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    setPlayer(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                } catch (error) {
                    // console.error('Error fetching user data:', error.response?.data || error.message);
                    console.error('Error fetching user data: ', error);

                }
            }
        }

        async function getInfoMatch() {

            try {
                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {

                    const token = JSON.parse(jsonToken);

                    const getMatch = await axios.get(baseUrl + "/match/" + idMatch, {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const jsonUser = localStorage.getItem("user");

                    if (jsonUser) {
                        const user: IUser = JSON.parse(jsonUser);
                        const photoUrl = user.player === "PLAYER_ONE" ? getMatch.data.photoPlayerTwo : getMatch.data.photoPlayerOne;
                        setAdversaryPhoto(photoUrl);
                    }

                    setScoreboard({
                        playerOne: getMatch.data.numberOfWinsPlayerOne,
                        playerTwo: getMatch.data.numberOfWinsPlayerTwo,
                        draws: getMatch.data.numberOfDraws
                    });

                    setInfoMatch(getMatch.data);
                }

            } catch (e) {
                console.error("error match ", e)
            }
        }

        if (match === "online") {
            setPauseMatch(true);
            getInfoPlayer();
            getInfoMatch();
        }


    }, []);

    useEffect(() => {
        return () => {
            if (ws) {
                cleanWs();
            }
        };
    }, []);

    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {

        keepAlive();
        connectionMatch();

    }, []);

    useEffect(() => {
        if (match === "online" && pauseMatch) {
            const getBoard = () => {
                console.log("Atualizando board...");
                ws?.send("view board");
            };

            const intervalId = setInterval(getBoard, 6000);

            // Limpeza para evitar vazamentos de memória
            return () => clearInterval(intervalId);
        }
    })

    useEffect(() => {

        const photoLocalStorage = localStorage.getItem("photo_user");

        if (photoLocalStorage) {
            const photoJson = JSON.parse(photoLocalStorage);

            setPhoto(photoJson.photo)
        }

    }, []);

    useEffect(() => {

        if (!playerVictory.open && turnPlayer && match === "single_player") {
            machineMove();
        }

    }, [turnPlayer])

    // estabelece uma coneção com o websockets
    async function connectionMatch() {

        if (match === "online" && !ws) {
            try {
                const ticket = (await axios.post(`${baseUrl}/ticket/${idMatch}`)).data.ticket;

                const newWs = new WebSocket("ws://localhost:8080/match?server=" + idMatch + "&ticket=" + ticket);

                newWs.onopen = () => {
                    console.log('Connected to WebSocket server');
                    keepAlive();
                    setStatusOnlie({ loading: false, text: "" });
                    setMatchClosed(false); // Limpe a flag aqui

                    newWs.send("view board");
                };

                newWs.onerror = (error) => {

                    console.log();

                    console.error('WebSocket Error:', error);
                    setStatusOnlie({ loading: true, text: "Erro ao carregar tabuleiro, aguarde" });
                    setTimeout(() => {
                        connectionMatch();
                        newWs.send("view board");
                    }, 1000); // Tentar reconectar após 1 segundos

                    newWs.send("view board");
                };

                newWs.onclose = () => {
                    console.log('Disconnected from WebSocket server');
                    setStatusOnlie({ loading: true, text: "Conexão fraca, aguarde" });

                    setTimeout(() => {
                        connectionMatch();
                        newWs.send("view board");
                    }, 1000); // Tentar reconectar após 1 segundos

                    // cleanWs();

                };

                onMessage(newWs);

                setWs(newWs);

            } catch (e) {
                console.error("Erro ao conectar no servidor, ", e)
            }

        } else if (ws) {

            onMessage(ws)

        }
    }

    // respota PONG com o websockets
    function keepAlive() {
        if (ws) {
            ws.send('ping');
            setTimeout(keepAlive, 3000); // Enviar ping a cada 30 segundos
        }
    }

    async function handleMovePlayer(row: "row_1" | "row_2" | "row_3", index: number) {

        if (match === "vs_player") {
            move(row, index);
        } else if (match === "single_player" && !turnPlayer) {
            await move(row, index);

        } else if (match === "online" && !statusOnlie.loading) {

            moveOnline(row, index);
        }

    }

    function victoryCondition(player: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW", currentBoard?: IBoard) {

        currentBoard = currentBoard ? currentBoard : board;

        // verifca linhas
        for (let i = 1; i <= 3; i++) {
            const rowKey = `row_${i}`;
            if (
                currentBoard[rowKey as keyof IBoard][0] === player &&
                currentBoard[rowKey as keyof IBoard][1] === player &&
                currentBoard[rowKey as keyof IBoard][2] === player
            ) {
                handleVitctory(player);
                return true;
            }
        }

        // Verifica colunas
        for (let j = 0; j < 3; j++) {
            if (
                currentBoard["row_1"][j] === player &&
                currentBoard["row_2"][j] === player &&
                currentBoard["row_3"][j] === player
            ) {
                handleVitctory(player === "PLAYER_ONE" ? "PLAYER_ONE" : "PLAYER_TWO")
                return true;
            }
        }

        // Verifica diagonais
        if (
            (currentBoard["row_1"][0] === player && currentBoard["row_2"][1] === player && currentBoard["row_3"][2] === player) ||
            (currentBoard["row_1"][2] === player && currentBoard["row_2"][1] === player && currentBoard["row_3"][0] === player)
        ) {
            handleVitctory(player);
            return true;
        }

        // verifica se deu velha
        else if (currentBoard.row_1.indexOf("NO_PLAYER") < 0 && currentBoard.row_2.indexOf("NO_PLAYER") < 0 && currentBoard.row_3.indexOf("NO_PLAYER") < 0) {
            handleVitctory("DRAW");
            return true;
        }

        return;
    }

    async function handleVitctory(player: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW") {

        const finallyMatch = scoreboard;
        const result = player === "PLAYER_ONE" ?
            "PLAYER_ONE" :
            player === "PLAYER_TWO" ?
                "PLAYER_TWO" :
                "DRAW";

        switch (player) {
            case "PLAYER_ONE": {
                finallyMatch.playerOne++;
                break;
            }

            case "PLAYER_TWO": {
                finallyMatch.playerTwo++;
                break;
            }

            default: {
                finallyMatch.draws++;
                break;
            }
        }

        if (match === "online") {
            const tokenJson = localStorage.getItem("token");

            if (tokenJson) {
                setPauseMatch(false);

                const token = JSON.parse(tokenJson);
                let data: string;

                switch (player) {
                    case "PLAYER_ONE": {
                        data = "PLAYER_ONE";
                        break;
                    }
                    case "PLAYER_TWO": {
                        data = "PLAYER_TWO";
                        break;
                    }
                    default: {
                        data = "DRAW";
                        break;
                    }
                }

                const match = await axios.post(`${baseUrl}/match/${idMatch}`, {
                    victory: data
                }, {
                    'headers': {
                        "Authorization": `Bearer ${token}`
                    }
                })

                setScoreboard({
                    playerOne: match.data.numberOfWinsPlayerOne,
                    playerTwo: match.data.numberOfWinsPlayerTwo,
                    draws: match.data.numberOfDraws
                });
                setPlayerVictory({ open: true, player: result });

            }
        } else {
            setScoreboard(finallyMatch);
            setPlayerVictory({ open: true, player: result });
            return;
        }

    }

    /* 
     
    movimentos dos jogadores
     
    */
    async function moveOnline(row: "row_1" | "row_2" | "row_3", index: number) {

        if (!infoMatch) return;


        if (player?.player === "PLAYER_ONE" && !turnPlayer) return;
        if (player?.player === "PLAYER_TWO" && turnPlayer) return;

        switch (row) {
            case "row_1":
                if (board.row_1[index] !== "NO_PLAYER") return;
                break;
            case "row_2":
                if (board.row_2[index] !== "NO_PLAYER") return;
                break;
            case "row_3":
                if (board.row_3[index] !== "NO_PLAYER") return;
                break;
        }

        const data = {
            row: parseInt(row.split("")[row.length - 1]) - 1,
            column: index,
            id: turnPlayer ? infoMatch.idPlayerOne : infoMatch.idPlayerTwo,
            player: player?.player,
        };

        try {
            const jsonData = JSON.stringify(data);
            ws?.send(jsonData);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    }

    async function move(row: "row_1" | "row_2" | "row_3", index: number) {
        switch (row) {
            case "row_1": {
                if (board.row_1[index] !== "NO_PLAYER") return;

                board.row_1[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";

                break;

            }

            case "row_2": {
                if (board.row_2[index] !== "NO_PLAYER") return;

                board.row_2[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";

                break;

            }

            case "row_3": {
                if (board.row_3[index] !== "NO_PLAYER") return;

                board.row_3[index] = turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO";

                break;

            }

            default: {
                console.error("Invalid field");
                break;
            }
        }

        setBoard(board);
        victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
        setTurnPlayer(!turnPlayer);

    }

    async function machineMove() {

        if (playerVictory.open) {
            console.log("Jogo já finalizado, máquina não fará jogada.");
            return;
        }

        // Lista para armazenar os índices dos campos "NO_PLAYER"
        let availableFields = [];

        for (let row = 1; row <= 3; row++) {
            for (let col = 0; col < 3; col++) {

                const field = board[`row_${row}` as keyof IBoard][col];
                if (field === "NO_PLAYER") {
                    availableFields.push({ row, col });
                }
            }
        }

        if (availableFields.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableFields.length);
            const { row, col } = availableFields[randomIndex];

            setTimeout(() => {
                board[`row_${row}` as keyof IBoard][col] = "PLAYER_ONE";
                setBoard(board);
                victoryCondition("PLAYER_ONE");
                setTurnPlayer(false);
            }, 500);

        } else {
            console.error("Não há campos disponíveis.");
        }
    }


    // outras funções 
    function realodMatch() {
        setBoard(initialBoard);
    }

    function nextMatch() {
        if (match === "single_player") {
            setTurnPlayer(false);
        }

        else if (match === "online") {
            ws?.send("reset board");
            setPauseMatch(false);
        }

        setPlayerVictory({ open: false, player: "DRAW" });
        setBoard(initialBoard);
    }

    function navigateHome() {
        navigate("/", { replace: true });
    }

    function onMessage(currentWs: WebSocket) {
        currentWs.onmessage = async function (event: MessageEvent) {

            try {
                let data: string | { board: IBoardWS, PlayerSTurn: string };

                // Tentar parsear como JSON primeiro
                try {
                    data = JSON.parse(event.data);
                } catch (error) {
                    // Se falhar, assumir que é uma string simples
                    data = event.data;
                }

                if (typeof data === 'string' && data.toLowerCase() === 'ping') {
                    // Enviar pong como resposta ao ping
                    console.log("ping")
                    currentWs.send('pong');
                    return;
                }

                if (typeof data === 'string' && data.toLowerCase() === "standing game") {
                    return;
                }

                if (typeof data === 'string' && data.toLowerCase() === "match was ended") {

                    connectionMatch();

                }

                if (typeof data === 'string' && data.toLowerCase() === "close match") {

                    toast.dismiss();
                    toast.warn("Partida fechada", { autoClose: 1500 });

                    // currentWs.close();
                    ws?.close();

                    navigate("/menu_match_online", {
                        replace: true
                    });

                    // cleanWs();
                    setWs(null);

                    // setMatchClosed(true);

                    return;
                }

                if (typeof data === 'object' && data.board && data.PlayerSTurn) {

                    const jsonBoard = data.board;
                    const boardData: IBoard = {
                        row_1: jsonBoard.rows_1,
                        row_2: jsonBoard.rows_2,
                        row_3: jsonBoard.rows_3
                    };

                    setBoard(boardData);
                    setTurnPlayer(data.PlayerSTurn === "PLAYER_ONE");

                    victoryCondition((data.PlayerSTurn !== "PLAYER_ONE") ? "PLAYER_ONE" : "PLAYER_TWO", boardData);

                } else {
                    console.error("Invalid message structure:", event.data);
                    return;
                }

            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };
    }

    function cleanWs() {
        if (ws) {
            // ws.send("match closed");
            // ws.close();
        }

        setWs(null);
        setBoard(initialBoard);
        // setMatchClosed(false); // Adicione esta linha
    }

    function closeOnline() {
        if (ws) {
            ws.send("close match");

            // setMatchClosed(true);
            // ws.close()


            // cleanWs();

            // navigate("/menu_match_online", {
            //     replace: true
            // });

        }
    }

    function onCloseInfoAdversary() {
        setInfoAdversaryToggle(false);
    }

    return (
        <Styled.Container>


            {match === "online" && infoAdversaryToggle && infoMatch && player && (
                <>
                    <InfoAdversary
                        id={player.player === "PLAYER_ONE" ? infoMatch.idPlayerTwo : infoMatch.idPlayerOne}
                        photo={adversaryPhoto ? adversaryPhoto : null}
                        onclose={onCloseInfoAdversary}
                    />
                </>
            )}

            {playerVictory.open && (
                <>
                    <ModalVictoryMatch victory={playerVictory} close={nextMatch} />
                </>
            )}

            {statusOnlie.loading && match === "online" && (
                <>
                    <h1>{statusOnlie.text}...</h1>
                </>)}

            {match !== "online" && (
                <Styled.Header>
                    <img onClick={() => navigate("/info_user", { replace: true })} src={photo ? photo : imgNoUser} alt="foto do usuario" />
                </Styled.Header>

            )}

            <Styled.ContainerBoard>

                <Styled.OptionMatch>

                    {match !== "online" ? (
                        <>
                            <Styled.Logo>
                                <img src={logoImg} alt="logo do site" onClick={navigateHome} />
                            </Styled.Logo>
                        </>
                    ) : (
                        <>
                            <Styled.Logo>
                                <img
                                    src={player?.player === "PLAYER_ONE" ? iconO : iconX}
                                    alt="icone das peças"
                                    onClick={closeOnline} />
                            </Styled.Logo>

                        </>
                    )}


                    <Reveal y={-30} duration={.3} >

                        <Link
                            to="scoreboard"
                            spy={true}
                            smooth={true}
                            duration={500}
                        >

                            <Styled.Turn>
                                <img src={turnPlayer ? IconOTurn : IconXTurn} alt="de quem é o turno" />
                                VEZ
                            </Styled.Turn>
                        </Link>
                    </Reveal>

                    {match !== "online" ? (
                        <>
                            <Link
                                to="board"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                <Button btn='BUTTON_SILVER' option={"small"} onClick={realodMatch} >

                                    <img src={iconRestart} alt="icone de restart" />

                                </Button>

                            </Link>
                        </>
                    ) : (
                        <>
                            {adversaryPhoto ? (
                                <>
                                    <Styled.AdversaryPhoto
                                        onClick={() => setInfoAdversaryToggle(!infoAdversaryToggle)}
                                    >
                                        <img src={adversaryPhoto} alt="photo another player" />
                                    </Styled.AdversaryPhoto>
                                </>
                            ) : (
                                <>
                                    <Styled.AdversaryPhoto
                                        onClick={() => setInfoAdversaryToggle(!infoAdversaryToggle)}
                                    >
                                        <img src={imgNoUser} alt="photo another player" />
                                    </Styled.AdversaryPhoto>
                                </>
                            )}

                        </>
                    )}

                </Styled.OptionMatch>

                <Styled.Board id="board" >
                    <ul>

                        {board.row_1.map((field, index) => (
                            <Reveal
                                key={index + "ro1"}
                                y={-20}
                                duration={.3}
                                delay={parseFloat(`.${index + 2}`)} >
                                <Styled.Field
                                    player={field}
                                    onClick={() => handleMovePlayer("row_1", index)} >

                                    {field === "NO_PLAYER" ? (
                                        <>
                                            {turnPlayer ?
                                                <img src={iconOEmptyField} alt="icone O ausente" /> :
                                                <img src={iconXEmptyField} alt="icone X ausente" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="icone O" /> :
                                                <img src={iconX} alt="icone X" />}
                                        </>)}
                                </Styled.Field>
                            </Reveal>
                        ))}

                        {board.row_2.map((field, index) => (
                            <Reveal
                                key={index + "ro2"}
                                y={-25}
                                duration={.3}
                                delay={parseFloat(`.${index + 4}`)}
                            >
                                <Styled.Field
                                    player={field}
                                    onClick={() => handleMovePlayer("row_2", index)}
                                >
                                    {field === "NO_PLAYER" ? (
                                        <>
                                            {turnPlayer ?
                                                <img src={iconOEmptyField} alt="icone O ausente" /> :
                                                <img src={iconXEmptyField} alt="icone X ausente" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="icone O" /> :
                                                <img src={iconX} alt="icone X" />}
                                        </>)}
                                </Styled.Field>
                            </Reveal>
                        ))}

                        {board.row_3.map((field, index) => (
                            <Reveal
                                key={index + "ro3"}
                                y={-30}
                                duration={.3}
                                delay={parseFloat(`.${index + 5}`)}
                            >
                                <Styled.Field
                                    player={field}
                                    onClick={() => handleMovePlayer("row_3", index)}
                                >

                                    {field === "NO_PLAYER" ? (
                                        <>
                                            {turnPlayer ?
                                                <img src={iconOEmptyField} alt="icone O ausente" /> :
                                                <img src={iconXEmptyField} alt="icone X ausente" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="icone O" /> :
                                                <img src={iconX} alt="icone X" />}
                                        </>)}
                                </Styled.Field>
                            </Reveal>
                        ))}

                    </ul>
                </Styled.Board>

                <Styled.Scoreboard id="scoreboard" >

                    <Button btn="BUTTON_BLUE" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        X (P2)
                        <strong> {scoreboard.playerTwo > 0 ? scoreboard.playerTwo : 0} </strong>
                    </Button>

                    <Button btn="BUTTON_SILVER" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        VELHAS
                        <strong> {scoreboard.draws > 0 ? scoreboard.draws : 0} </strong>
                    </Button>

                    <Button btn="BUTTON_YALLOW" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        O (P1)
                        <strong> {scoreboard.playerOne > 0 ? scoreboard.playerOne : 0} </strong>
                    </Button>

                </Styled.Scoreboard>

            </Styled.ContainerBoard>
        </Styled.Container>
    )
}

export default Home;