import * as Styled from './style';

import iconO from '../../assets/icon-o.svg';
import iconX from '../../assets/icon-x.svg';
import Button from '../Button';
import { IVictory } from '../../Config/interfaces';

interface IProps {
    victory: IVictory
}

function ModalVictoryMatch({ victory }: IProps) {


    return (
        <Styled.Container victory={victory.player}>
            <section>
                <article>
                    {victory.player !== "DRAW" && (
                        <>
                            <span>PLAYER {victory.player === "PLAYER_ONE" ? "1" : "2"} GANHOU</span>
                        </>
                    )}
    
                    <div>
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
                    </div>
    
                    <div>
                        <Button btn='BUTTON_SILVER' option={false}>VOLTAR</Button>
                        <Button btn={'BUTTON_YALLOW'} option={false}>PRÓXIMO ROUND</Button>
                    </div>
                </article>
            </section>
        </Styled.Container>
    )
    
}

export default ModalVictoryMatch;