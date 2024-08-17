import { useParams } from "react-router-dom";
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
import { IVictory } from "../../Config/interfaces";
import ModalVictoryMatch from "../../Components/ModalVictoryMatch";
import Reveal from "../../Components/Reveal";

/*

match:
    online
    coopLocal
    singlePlayer

*/

interface IBoard {
    row_1: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    row_2: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
    row_3: ("PLAYER_ONE" | "PLAYER_TWO" | "NO_PLAYER")[];
}

interface ICountMatches {
    playerOne: number;
    playerTwo: number;
    draws: number;
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

    const { match } = useParams();

    useEffect(() => {
        localStorage.getItem("user");
    }, []);

    function handleMovePlayer(row: "row_1" | "row_2" | "row_3", index: number) {

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
        if (board.row_1.indexOf("NO_PLAYER") < 0 && board.row_2.indexOf("NO_PLAYER") < 0 && board.row_3.indexOf("NO_PLAYER") < 0) {
            handleVitctory(player);
        }

        return;
    }

    function nextMatch() {
        setPlayerVictory({ open: false, player: "DRAW" });
        setBoard(initialBoard);
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
        return true;
    }

    function realodMatch() {
        setBoard(initialBoard);
    }

    return (
        <Styled.Container>

            {playerVictory.open && (
                <>
                    <ModalVictoryMatch victory={playerVictory} close={nextMatch} />
                </>
            )}

            <Styled.ContainerBoard>

                <Styled.OptionMatch>
                    <Link
                        to="board"
                        spy={true}
                        smooth={true}
                        duration={500}
                    >
                        <img src={logoImg} alt="icon logo" />
                    </Link>

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
                        <Button btn='BUTTON_SILVER' option={false} onClick={realodMatch} >

                            <img src={iconRestart} alt="" />

                        </Button>

                    </Link>
                </Styled.OptionMatch>

                <Styled.Board id="board" >
                    <ul>

                        {board.row_1.map((field, index) => (
                            <Reveal y={-20} duration={.3} delay={parseFloat(`.${index + 2}`)} >
                                <Styled.Field
                                    player={field === "NO_PLAYER"}
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
                            <Reveal y={-25} duration={.3} delay={parseFloat(`.${index + 4}`)} >
                                <Styled.Field
                                    player={field === "NO_PLAYER"}
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
                            <Reveal y={-30} duration={.3} delay={parseFloat(`.${index + 5}`)} >
                                <Styled.Field
                                    player={field === "NO_PLAYER"}
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

                    <Button btn="BUTTON_BLUE" option={false} borderBottom={false} hoverStyle={false} >
                        X (P2)
                        <strong> {scoreboard.playerTwo} </strong>
                    </Button>

                    <Button btn="BUTTON_SILVER" option={false} borderBottom={false} hoverStyle={false} >
                        VELHAS
                        <strong> {scoreboard.draws} </strong>
                    </Button>

                    <Button btn="BUTTON_YALLOW" option={false} borderBottom={false} hoverStyle={false} >
                        O (P1)
                        <strong> {scoreboard.playerOne} </strong>
                    </Button>

                </Styled.Scoreboard>

            </Styled.ContainerBoard>
        </Styled.Container>
    )
}

export default Home;