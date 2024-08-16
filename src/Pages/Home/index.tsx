import { useParams } from "react-router-dom";
import { useEffect } from "react";

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

function Home() {

    const { match } = useParams();

    useEffect(() => {
        localStorage.getItem("user");
    }, [])

    return (
        <Styled.Container>

            <Styled.ContainerBoard>

                <Styled.OptionMatch>
                    <img src={logoImg} alt="icon logo" />

                    <div>
                        <img src={IconOTurn} alt="" />
                        VEZ
                    </div>

                    <Button btn='BUTTON_SILVER' option={false} >
                        <img src={iconRestart} alt="" />
                    </Button>
                </Styled.OptionMatch>

                <Styled.Board>
                    <ul>
                        <Styled.Field player={"no_player"} > <img src={iconOEmptyField} alt="" /> </Styled.Field>
                        <Styled.Field> <img src={iconX} alt="" /> </Styled.Field>
                        <Styled.Field> <img src={iconO} alt="" /> </Styled.Field>

                        <Styled.Field><img src={iconO} alt="" /></Styled.Field>
                        <Styled.Field><img src={iconX} alt="" /></Styled.Field>
                        <Styled.Field><img src={iconX} alt="" /></Styled.Field>

                        <Styled.Field player={"no_player"} > <img src={iconXEmptyField} alt="" /> </Styled.Field>
                        <Styled.Field player={"no_player"} ></Styled.Field>
                        <Styled.Field><img src={iconO} alt="" /></Styled.Field>
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