import * as Styled from './style';

import warnImg from '../../assets/warn.svg';

interface Props {
    msg: string,
    show: "see" | "not_see"
}

export function AlertWarn({ msg, show }: Props) {

    return (
        <Styled.Container show={show} >
            <img src={warnImg} alt="imagem de atenção" />
            <p>
                {msg}
            </p>
        </Styled.Container>
    )
}