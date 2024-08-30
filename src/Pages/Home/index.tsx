import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-scroll';

import * as Styled from './style';
import Button from '../../Components/Button';

import logoImg from '../../assets/logo.svg';
import IconXTurn from '../../assets/icon-x-turn.svg';
import IconOTurn from '../../assets/icon-o-turn.svg';
import iconRestart from '../../assets/icon-restart.svg';

import iconX from "../../assets/icon-x.svg";
import iconO from "../../assets/icon-o.svg";

import iconXEmptyField from "../../assets/icon-x-outline.svg";
import iconOEmptyField from "../../assets/icon-o-outline.svg";
import { IBoard, ICountMatches, IMatch, IUser, IVictory } from "../../Config/interfaces";
import ModalVictoryMatch from "../../Components/ModalVictoryMatch";
import Reveal from "../../Components/Reveal";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";


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

    const [scoreboard, setScoreboard] = useState<ICountMatches>({ playerOne: 0, playerTwo: 0, draws: 0 });
    const [playerVictory, setPlayerVictory] = useState<IVictory>({ player: "DRAW", open: false });
    const [turnPlayer, setTurnPlayer] = useState<boolean>(false);
    const [board, setBoard] = useState<IBoard>(initialBoard);

    // online
    const [player, setPlayer] = useState<IUser | null>(null);
    const [infoMatch, setInfoMatch] = useState<IMatch | null>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [statusOnlie, setStatusOnlie] = useState<IStatusOnline>({loading: true, text: "Carregando Tabuleiro"});

    const { match, idMatch } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        function getInfoPlayer() {
            const jsonUser = localStorage.getItem("user");

            if (jsonUser) {
                const user: IUser = JSON.parse(jsonUser);

                setPlayer(user);
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

                    setInfoMatch(getMatch.data);
                }

            } catch (e) {
                console.error("error match ", e)
            }
        }

        if (match === "online") {

            getInfoMatch();
            getInfoPlayer();
        }


    }, []);

    useEffect(() => {
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {

        async function connectionMatch() {

            if (match === "online" && !ws) {
                try {
                    const ticket = (await axios.post(`${baseUrl}/ticket/${idMatch}`)).data.ticket;

                    const newWs = new WebSocket("ws://localhost:8080/match?server=" + idMatch + "&ticket=" + ticket);

                    newWs.onopen = () => {
                        console.log('Connected to WebSocket server');
                        keepAlive(); // Iniciar o sistema de ping-pong aqui
                        setStatusOnlie({loading: false, text: ""});
                        
                        newWs.send("view board");
                    };

                    newWs.onerror = (error) => {
                        console.error('WebSocket Error:', error);
                        setStatusOnlie({loading: true, text: "Erro ao carregar tabuleiro, aguarde"});
                        setTimeout(connectionMatch, 3000); // Tentar reconectar após 3 segundos

                        newWs.send("view board");
                    };

                    newWs.onclose = () => {
                        console.log('Disconnected from WebSocket server');
                        setStatusOnlie({loading: true, text: "Conexão fraca, aguarde"});
                        setTimeout(connectionMatch, 3000); // Tentar reconectar após 3 segundos

                        newWs.send("view board");
                    };

                    newWs.onmessage = async function (event: MessageEvent) {
                        console.log("Received message:", event.data);

                        try {
                            let data = JSON.parse(event.data);

                            if (typeof data === 'string' && data.toLowerCase() === 'ping') {
                                // Enviar pong como resposta ao ping
                                newWs.send('pong');
                                return;
                            }

                            if (!data || !data.board || !data.PlayerSTurn) {
                                console.error("Invalid message structure:", event.data);
                                return;
                            }

                            const jsonBoard = data.board;
                            const boardData: IBoard = {
                                row_1: jsonBoard.rows_1,
                                row_2: jsonBoard.rows_2,
                                row_3: jsonBoard.rows_3
                            };

                            setBoard(boardData);
                            setTurnPlayer(data.PlayerSTurn === "PLAYER_ONE");

                            victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                        } catch (error) {
                            console.error("Error parsing message:", error);
                        }
                    };

                    /*
                    newWs.onmessage = async function (event: any) {
                        if (event.data === 'ping') {
                            newWs.send("pong"); // Responde com outro ping após receber um pong
                        } else {
                            const data = await JSON.parse(event.data);
                            const jsonBoard = data.board;
    
                            setTurnPlayer(data.PlayerSTurn)
    
                            console.log("============================");
                            console.log(data.PlayerSTurn)
    
                            // Verifica se os dados estão consistentes com o tipo IBoard
                            if (jsonBoard.rows_1 && jsonBoard.rows_2 && jsonBoard.rows_3) {
    
                                const dataBoard: IBoard = {
                                    row_1: jsonBoard.rows_1,
                                    row_2: jsonBoard.rows_2,
                                    row_3: jsonBoard.rows_3
                                }
    
                                // Atualiza o estado do tabuleiro com os dados recebidos
                                setBoard(dataBoard);
    
                                // Verifica a condição de vitória após a atualização do tabuleiro
                                victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                            }
                        }
                    };*/

                    setWs(newWs);

                } catch (e) {
                    console.error("Erro ao conectar no servidor, ", e)
                }

            } else if(ws) {

                 //////////////
                 ws.onmessage = async function (event: MessageEvent) {
                    console.log("Received message:", event.data);

                    try {
                        let data = JSON.parse(event.data);

                        if (typeof data === 'string' && data.toLowerCase() === 'ping') {
                            // Enviar pong como resposta ao ping
                            ws.send('pong');
                            return;
                        }

                        if (!data || !data.board || !data.PlayerSTurn) {
                            console.error("Invalid message structure:", event.data);
                            return;
                        }

                        const jsonBoard = data.board;
                        const boardData: IBoard = {
                            row_1: jsonBoard.rows_1,
                            row_2: jsonBoard.rows_2,
                            row_3: jsonBoard.rows_3
                        };

                        setBoard(boardData);
                        setTurnPlayer(data.PlayerSTurn === "PLAYER_ONE");

                        victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                    } catch (error) {
                        console.error("Error parsing message:", error);
                    }
                };


            }
        }

        // Adicione esta função logo após conectar o WebSocket
        function keepAlive() {
            if (ws) {
                ws.send('ping');
                setTimeout(keepAlive, 30000); // Enviar ping a cada 30 segundos
            }
        }

        keepAlive();
        connectionMatch();

    }, [])



    function updateBoard() {
        if (ws) {
            ws.onmessage = async function (event: any) {
                console.log("Received message:", event.data);

                try {
                    const data = JSON.parse(event.data);

                    if (data.PlayerSTurn === turnPlayer) {
                        console.log("It's my turn:", data.PlayerSTurn);

                        // Atualize o estado local do tabuleiro
                        const jsonBoard = data.board;
                        const dataBoard: IBoard = {
                            row_1: jsonBoard.rows_1,
                            row_2: jsonBoard.rows_2,
                            row_3: jsonBoard.rows_3
                        };

                        setBoard(dataBoard);
                        victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                    } else {
                        console.log("Not my turn:", data.PlayerSTurn);

                        // Atualize o estado local do tabuleiro
                        const jsonBoard = data.board;
                        const dataBoard: IBoard = {
                            row_1: jsonBoard.rows_1,
                            row_2: jsonBoard.rows_2,
                            row_3: jsonBoard.rows_3
                        };

                        setBoard(dataBoard);
                        victoryCondition(turnPlayer ? "PLAYER_ONE" : "PLAYER_TWO");
                    }

                    setTurnPlayer(!turnPlayer);
                } catch (error) {
                    console.error("Error parsing message:", error);
                }
            };
        }
    }











    async function handleMovePlayer(row: "row_1" | "row_2" | "row_3", index: number) {
        if (match === "vs_player") {
            move(row, index);
        } else if (match === "single_player" && !turnPlayer) {
            await move(row, index);
            machineMove();
        } else if (match === "online" && !statusOnlie.loading) {
            moveOnline(row, index);
        }

    }

    function victoryCondition(player: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW") {

        // verifca linhas
        for (let i = 1; i <= 3; i++) {
            const rowKey = `row_${i}`;
            if (
                board[rowKey as keyof IBoard][0] === player &&
                board[rowKey as keyof IBoard][1] === player &&
                board[rowKey as keyof IBoard][2] === player
            ) {
                handleVitctory(player);
            }
        }

        // Verifica colunas
        for (let j = 0; j < 3; j++) {
            if (
                board["row_1"][j] === player &&
                board["row_2"][j] === player &&
                board["row_3"][j] === player
            ) {
                handleVitctory(player === "PLAYER_ONE" ? "PLAYER_ONE" : "PLAYER_TWO")
            }
        }

        // Verifica diagonais
        if (
            (board["row_1"][0] === player && board["row_2"][1] === player && board["row_3"][2] === player) ||
            (board["row_1"][2] === player && board["row_2"][1] === player && board["row_3"][0] === player)
        ) {
            handleVitctory(player);

        }

        // verifica se dedu velha
        else if (board.row_1.indexOf("NO_PLAYER") < 0 && board.row_2.indexOf("NO_PLAYER") < 0 && board.row_3.indexOf("NO_PLAYER") < 0) {

            handleVitctory("DRAW");
        }

        return;
    }

    function handleVitctory(player: "PLAYER_ONE" | "PLAYER_TWO" | "DRAW") {

        let finallyMatch = scoreboard;
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

        setScoreboard(finallyMatch);
        setPlayerVictory({ open: true, player: result });

    }

    /* 
     
    movimentos dos jogadores
     
    */
    async function moveOnline(row: "row_1" | "row_2" | "row_3", index: number) {
        if (!infoMatch) return;

        /* 
            ATENÇÃO DESCOMENTE ESSES IFS
            
            eles são nescessarios para bloquear o jogador para que não 
            jogue na vez do próximo 
        */
        // if (player?.player === "PLAYER_ONE" && !turnPlayer) return;
        // if (player?.player === "PLAYER_TWO" && turnPlayer) return;

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

    function move(row: "row_1" | "row_2" | "row_3", index: number) {
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
            console.log("Não há campos disponíveis.");
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

        setPlayerVictory({ open: false, player: "DRAW" });
        setBoard(initialBoard);
    }

    return (
        <Styled.Container>

            {playerVictory.open && (
                <>
                    <ModalVictoryMatch victory={playerVictory} close={nextMatch} />
                </>
            )}

            {statusOnlie.loading && match === "online" && (
            <>
                <h1>{statusOnlie.text}...</h1>
            </>)}

            <Styled.ContainerBoard>

                <Styled.OptionMatch>

                    <img src={logoImg} alt="icon logo" onClick={() => navigate("/", { replace: true })} />


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


                    <Link
                        to="board"
                        spy={true}
                        smooth={true}
                        duration={500}
                    >
                        <Button btn='BUTTON_SILVER' option={"small"} onClick={realodMatch} >

                            <img src={iconRestart} alt="" />

                        </Button>

                    </Link>
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
                                                <img src={iconOEmptyField} alt="" /> :
                                                <img src={iconXEmptyField} alt="" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="" /> :
                                                <img src={iconX} alt="" />}
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
                                                <img src={iconOEmptyField} alt="" /> :
                                                <img src={iconXEmptyField} alt="" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="" /> :
                                                <img src={iconX} alt="" />}
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
                                                <img src={iconOEmptyField} alt="" /> :
                                                <img src={iconXEmptyField} alt="" />}
                                        </>
                                    ) : (
                                        <>
                                            {field === "PLAYER_ONE" ?
                                                <img src={iconO} alt="" /> :
                                                <img src={iconX} alt="" />}
                                        </>)}
                                </Styled.Field>
                            </Reveal>
                        ))}

                    </ul>
                </Styled.Board>

                <Styled.Scoreboard id="scoreboard" >

                    <Button btn="BUTTON_BLUE" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        X (P2)
                        <strong> {scoreboard.playerTwo} </strong>
                    </Button>

                    <Button btn="BUTTON_SILVER" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        VELHAS
                        <strong> {scoreboard.draws} </strong>
                    </Button>

                    <Button btn="BUTTON_YALLOW" option={"small"} borderbottom={"no_board"} hoverstyle={"no_hover_style"} >
                        O (P1)
                        <strong> {scoreboard.playerOne} </strong>
                    </Button>

                </Styled.Scoreboard>

            </Styled.ContainerBoard>
        </Styled.Container>
    )
}

export default Home;