import { useEffect, useState } from 'react';
import * as Styled from './style';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../Config/interfaces';

import ambientMusic from '../../assets/songs/default_calm.mp3';
import { Audio } from '../../Components/Audio';
import DeleteFromAccount from '../../Components/DeleteFromAccount';

interface IStartingData {
    wins: string;
    draws: string;
    defeats: string;
}

function InfoUser() {

    const [infoUser, setInfoUser] = useState<IUser | null>(null);
    const [matchDataShow, setMatchDataShow] = useState<boolean>(false);
    const [startingData, setStartingData] = useState<IStartingData | null>(null);

    const [toggleDeleteFromAccount, setToggleDeleteFromAccount] = useState<boolean>(false);

    const [loadingData, setLoadingData] = useState<boolean>(true);

    const navigate = useNavigate();
    const { page } = useParams();

    useEffect(() => {

        async function getInfoUser() {
            try {

                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {

                    const token = JSON.parse(jsonToken);

                    const requestData = await axios.get(baseUrl + "/user", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data: IUser = requestData.data;

                    setInfoUser(data);

                    percentageStartingData();

                    setLoadingData(false);

                } else {
                    toast.dismiss();
                    toast.error("Não a um token salvo", { autoClose: 3800 })
                    toast.warn("Você será redirecionado para o login", { autoClose: 3800 });

                    setTimeout(() => {
                        navigate("/login", { replace: true });
                    }, 4000);
                }

            } catch (error) {
                console.error("Error, user not found: " + error);
                toast.error("Usuario não encontrado");
                toast.warn("ATENÇÃO, Você será redirecionado para a página de login")

                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 4000);
            }
        }

        getInfoUser();

        return () => { };

    }, [])

    useEffect(() => {

        percentageStartingData();

    }, [infoUser, matchDataShow])

    function percentageStartingData() {

        if (matchDataShow && infoUser && startingData === null) {

            if (infoUser.numberOfWins === 0 && infoUser.numberOfDraws === 0 && infoUser.numberOfDefeats === 0) {

                const data: IStartingData = {
                    defeats: "0",
                    draws: "0",
                    wins: "0"
                };

                setStartingData(data);

            } else {

                const totalMatches = infoUser.numberOfWins + infoUser.numberOfDraws + infoUser.numberOfDefeats;

                const wins = ((infoUser.numberOfWins * 100) / totalMatches).toFixed(2); // porcentagem
                const draws = ((infoUser.numberOfDraws * 100) / totalMatches).toFixed(2); // porcentagem
                const defeats = ((infoUser.numberOfDefeats * 100) / totalMatches).toFixed(2); // porcentagem

                const data: IStartingData = {
                    defeats,
                    draws,
                    wins
                };

                setStartingData(data);
            }

        }

    }

    function handleBackNavigate() {

        switch (page) {
            case "menu_online": {
                setTimeout(() => {
                    navigate("/menu_match_online", { replace: true });
                }, 300);

                break;
            } default: {
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 300);
            }
        }

    }

    function viewPopUpDeleteFromAccount() {
        setToggleDeleteFromAccount(!toggleDeleteFromAccount);
    }

    function LogOutOfAccount() {

        localStorage.removeItem("photo_user");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.warn("Saindo da conta", { autoClose: 2000 });
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
    }

    return (
        <Styled.Container loading={loadingData ? "loading" : "no_loading"} >

            {toggleDeleteFromAccount && (
                <>
                    <DeleteFromAccount onClick={viewPopUpDeleteFromAccount} />
                </>
            )}


            <Styled.Back>
                <p onClick={handleBackNavigate} id='back-button' >
                    Voltar
                </p>
            </Styled.Back>

            <Styled.Loading loading={loadingData ? "loading" : "no_loading"} id='loading' />

            <section>
                <label htmlFor="name">
                    <span id='name'>Nome</span>
                    <p>{infoUser?.name}</p>
                </label>

                <label htmlFor="name">
                    <span>E-mail</span>
                    <p>{infoUser?.login}</p>
                </label>

                <Styled.StartingData>

                    <div>
                        <h2>Seus dados de partidas</h2>

                        <button onClick={() => setMatchDataShow(!matchDataShow)} >{matchDataShow ? "exato" : "Porcentagem"}</button>

                    </div>

                    <ul>

                        <li>Vitórias</li>
                        <li>Empate</li>
                        <li>Derrota</li>

                        <li>{matchDataShow ? startingData?.wins + "%" : infoUser?.numberOfWins}</li>
                        <li>{matchDataShow ? startingData?.draws + "%" : infoUser?.numberOfDraws}</li>
                        <li>{matchDataShow ? startingData?.defeats + "%" : infoUser?.numberOfDefeats}</li>

                    </ul>

                </Styled.StartingData>


                <Styled.ContainerButton>
                    <button onClick={LogOutOfAccount} >
                        Sair da conta
                    </button>

                    <button onClick={viewPopUpDeleteFromAccount} >
                        Deletar conta
                    </button>

                </Styled.ContainerButton>

            </section>

            <Styled.ContentMusic>
                <Audio music={ambientMusic} />
            </Styled.ContentMusic>

        </Styled.Container>
    );
}

export default InfoUser;