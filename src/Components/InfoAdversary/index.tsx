import { useEffect, useState } from 'react';
import axios from 'axios';

import baseUrl from '../../Config/baseUrl';
import * as Styled from './style';

import imgNoUser from '../../assets/no-user.svg';

import Button from '../Button';
import { IFriends } from '../../Config/interfaces';
import Reveal from '../Reveal';
import { toast } from 'react-toastify';

interface IProps {
    id: string;
    photo: string | null;
    onclose: () => void;
}

export default function InfoAdversary({ id, photo, onclose }: IProps) {

    const [namePlayer, setNamePlayer] = useState<string>("");
    const [isOnTheList, setIsOnTheList] = useState<boolean>(false);

    useEffect(() => {

        async function getInfoPlayer() {
            try {

                const jsonListFriends = localStorage.getItem("list_friends");
                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {
                    const listFriends: IFriends[] = jsonListFriends ? JSON.parse(jsonListFriends) : [];

                    setIsOnTheList(!listFriends.find(r => r.idPlayer === id));

                    // ja esta na lista de amigos
                    if (!listFriends.find(r => r.idPlayer === id)) {



                        const token = JSON.parse(jsonToken);

                        const requestData = await axios.get(`${baseUrl}/user/${id}`, {
                            'headers': {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        setNamePlayer(requestData.data.name);
                    }

                }

            } catch (error) {
                console.error("Error when searching for opposing player data");
            }
        }
        getInfoPlayer();

    }, []);

    async function btnAddListFriend() {
        try {

            const jsonToken = localStorage.getItem("token");

            if (jsonToken) {
                const token = JSON.parse(jsonToken);

                const data = {
                    name: namePlayer,
                    img: photo ? photo : null,
                    anotherPlayer: id
                }

                const addData = await axios.post(`${baseUrl}/user`, data, {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    }
                });

                updateListFriends(addData.data);

                setIsOnTheList(false);
                toast.success("Adicionado aos amigos com sucesso");

                setTimeout(() => {
                    onclose();
                }, 200);
            }

        } catch (error) {
            toast.error("Erro ao adicionar aos amigos");
            console.error("Error > ", error);
        }
    }

    function updateListFriends(data: IFriends) {

        const jsonList = localStorage.getItem("list_friends");

        const list: IFriends[] = jsonList ? JSON.parse(jsonList) : [];
        list.push(data);

        localStorage.setItem("list_friends",
            JSON.stringify(list)
        );


    }

    return (
        <Reveal y={-70} duration={.5} >
            <Styled.Container>

                <img src={photo ? photo : imgNoUser} alt="" />

                <label htmlFor="name">
                    Nome
                    <strong>{namePlayer}</strong>
                </label>

                <label htmlFor="id">
                    ID do oponente
                    <strong>{id}</strong>
                </label>

                {isOnTheList && (
                    <>
                        <Button
                            btn='BUTTON_SILVER'
                            option='small'
                            borderbottom='no_board'

                            onClick={btnAddListFriend}
                        >
                            Adicionar aos amigos
                        </Button>
                    </>
                )}

            </Styled.Container>
        </Reveal>
    )
}
