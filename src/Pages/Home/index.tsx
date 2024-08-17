import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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


function Home() {

    const initialBoard: IBoard = {
        row_1: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_2: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
        row_3: ["NO_PLAYER", "NO_PLAYER", "NO_PLAYER"],
    };

    const [playerVictory, setPlayerVictory] = useState();
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

    function victoryCondition(player: string) {
       
        // verifca linhas
        for (let i = 1; i <= 3; i++) {
            const rowKey = `row_${i}`;
            if (
                board[rowKey as keyof IBoard][0] === player &&
                board[rowKey as keyof IBoard][1] === player &&
                board[rowKey as keyof IBoard][2] === player
            ) {
                alert(`${player} venceu!`);
                return true;
            }
        }


        // Verifica colunas
        for (let j = 0; j < 3; j++) {
            if (
                board["row_1"][j] === player &&
                board["row_2"][j] === player &&
                board["row_3"][j] === player
            ) {
                alert(`${player} venceu!`);
                return true;
            }
        }

        // Verifica diagonais
        if (
            (board["row_1"][0] === player && board["row_2"][1] === player && board["row_3"][2] === player) ||
            (board["row_1"][2] === player && board["row_2"][1] === player && board["row_3"][0] === player)
        ) {
            alert(`${player} venceu!`);
            return true;
        }
        
        return;
    }


    return (
        <Styled.Container>

            <Styled.ContainerBoard>

                <Styled.OptionMatch>
                    <img src={logoImg} alt="icon logo" />

                    <div>
                        <img src={turnPlayer ? IconOTurn : IconXTurn} alt="de quem é o turno" />
                        VEZ
                    </div>

                    <Button btn='BUTTON_SILVER' option={false} >
                        <img src={iconRestart} alt="" />
                    </Button>
                </Styled.OptionMatch>

                <Styled.Board>
                    <ul>

                        {board.row_1.map((field, index) => (
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
                        ))}

                        {board.row_2.map((field, index) => (
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
                        ))}

                        {board.row_3.map((field, index) => (
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
                        ))}

                    </ul>
                </Styled.Board>

                <Styled.Scoreboard>

                    <Button btn="BUTTON_BLUE" option={false} borderBottom={false} hoverStyle={false} >
                        X (P2)
                        <strong> 14 </strong>
                    </Button>

                    <Button btn="BUTTON_SILVER" option={false} borderBottom={false} hoverStyle={false} >
                        VELHAS
                        <strong> 31 </strong>
                    </Button>

                    <Button btn="BUTTON_YALLOW" option={false} borderBottom={false} hoverStyle={false} >
                        O (P1)
                        <strong> 11 </strong>
                    </Button>

                </Styled.Scoreboard>

            </Styled.ContainerBoard>
        </Styled.Container>
    )
}

export default Home;