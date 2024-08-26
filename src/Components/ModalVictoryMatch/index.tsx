import * as Styled from './style';

import iconO from '../../assets/icon-o.svg';
import iconX from '../../assets/icon-x.svg';
import Button from '../Button';
import { IVictory } from '../../Config/interfaces';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal';

interface IProps {
    victory: IVictory;
    close: () => void;
}

function ModalVictoryMatch({ victory, close }: IProps) {

    const navigate = useNavigate();

    function handleQuit() {
        navigate("/", { replace: true });
    }

    return (
        <Styled.Container>
            <Reveal y={-30} duration={.3} >
                <Styled.ContainerContent victory={victory.player} >
                    <article>
                        {victory.player !== "DRAW" && (
                            <>
                                <span>PLAYER {victory.player === "PLAYER_ONE" ? "1" : "2"} GANHOU</span>
                            </>
                        )}

                        <Styled.Title>
                            {victory.player === "DRAW" ? (
                                <>
                                    <strong>DEU VELHA</strong>
                                </>
                            ) : (
                                <>
                                    <img src={victory.player === "PLAYER_ONE" ? iconO : iconX} alt="icon do vencedor" />
                                    <strong>LEVA A RODADA</strong>
                                </>
                            )}
                        </Styled.Title>

                        <div>
                            <Button
                                btn='BUTTON_SILVER'
                                option={"small"}
                                onClick={handleQuit}
                            >VOLTAR</Button>

                            <Button
                                btn={'BUTTON_YALLOW'}
                                option={"small"}
                                onClick={close}
                            >PRÓXIMO ROUND</Button>
                        </div>
                    </article>
                </Styled.ContainerContent>
            </Reveal>
        </Styled.Container>
    )

}

export default ModalVictoryMatch;