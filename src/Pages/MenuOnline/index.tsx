import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';
import iconRestart from '../../assets/icon-restart.svg';

import Button from "../../Components/Button";
import Input from "../../Components/Input";

function MenuOnline() {
    const [loadingMatch, setLoadingMatch] = useState<boolean>(true);

    const navigate = useNavigate();

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
                    src={noUser}
                    alt="foto do usuario"

                    onClick={() => handleNavigate("/info_user")}
                    className="photoPerfil"
                />
            </Styled.Header>

            <Styled.ContainerContent disabled={loadingMatch} >
                <Button btn="BUTTON_YALLOW" option={false} >{loadingMatch ? 
                        <img src={iconRestart} alt="icone para carregamento" /> 
                        :"PROCURAR PARTIDA"}</Button>

                <Styled.SourcePlayer visible={false} >

                    <span>Procurar player por ID</span>
                    <Input type="text" placeholder="ID" />

                    <ul>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>

                </Styled.SourcePlayer>

                <Styled.AccordionFriends>
                    <strong>Amigos</strong>
                    <ul>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>
                </Styled.AccordionFriends>

            </Styled.ContainerContent>

        </Styled.Container>
    )
}

export default MenuOnline;