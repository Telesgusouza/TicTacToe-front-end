import { useEffect, useState } from 'react';
import * as Styled from './style';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../Config/interfaces';

function InfoUser() {

    const [ infoUser, setInfoUser ] = useState<IUser | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function getInfoUser() {
            try {

                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {
                    // const token = JSON.parse(jsonToken);

                    // const requestData = await axios.get(baseUrl + "/user", {
                    //     'headers': {
                    //         'Authorization': `Bearer ${token}`
                    //     }
                    // });

                    // console.log(requestData.data)

                    setInfoUser({
                        name: "TESTE",
                        login: "teste@gmail.com",
                        role: "ROLE",
                        player: "Player_one",
                    
                        numberOfWins: 10,
                        numberOfDefeats: 17,
                        numberOfDraws: 4,
                    })

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

    }, [])

    return (
        <Styled.Container loading="loading" >
            <section></section>
        </Styled.Container>
    );
}

export default InfoUser;