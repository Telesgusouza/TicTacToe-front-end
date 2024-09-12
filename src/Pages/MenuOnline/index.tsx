import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import logoImg from '../../assets/logo.svg';
import noUser from '../../assets/no-user.svg';
import iconRestart from '../../assets/icon-restart.svg';

import Button from "../../Components/Button";
import Input from "../../Components/Input";
import axios from "axios";
import baseUrl from "../../Config/baseUrl";
import { useDispatch } from "react-redux";
import { IFriends } from "../../Config/interfaces";


function MenuOnline() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [loadingMatch, setLoadingMatch] = useState<boolean>(false);

    const [listFriends, setListFriends] = useState<IFriends[]>([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const photoLocalStorage = localStorage.getItem("photo_user");

        if (photoLocalStorage) {
            const photoJson = JSON.parse(photoLocalStorage);

            setPhoto(photoJson.photo)
        }

    }, []);

    useEffect(() => {
        async function getListFriends() {
            try {
                const jsonToken = localStorage.getItem("token");

                if (jsonToken) {
                    const token = JSON.parse(jsonToken);

                    const requestData = await axios.get(baseUrl + "/user/list_friends", {
                        'headers': {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const jsonListFriends = JSON.stringify(requestData.data);

                    localStorage.setItem("list_friends", jsonListFriends);

                    setListFriends(requestData.data);
                }


            } catch (error) {
                console.error("Error ao trazer lista de amigos");
            }
        }

        getListFriends();
    }, [])

    function handleNavigate(url: string) {
        navigate(url, { replace: true });
    }

    async function searchForMatch() {
        setLoadingMatch(true);

        const tokenJson = localStorage.getItem("token");

        try {

            if (tokenJson) {

                // const token = JSON.parse(tokenJson);

                // const match = await axios.post(baseUrl + "/match", {}, {
                //     'headers': {
                //         'Authorization': `Bearer ${token}`
                //     }
                // });

                // console.log("========================================");
                // connect(match.data.id);
                // await connect("3d1f10bd-e735-46e8-b6e9-53612634553c");
                navigate("/home/online/3d1f10bd-e735-46e8-b6e9-53612634553c", { replace: true });

            }

            setLoadingMatch(false);
        } catch (e) {
            setLoadingMatch(false);
            console.error("Error finding match")
        }

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
                    src={photo ? photo : noUser}
                    alt="foto do usuario"

                    onClick={() => handleNavigate("/info_user")}
                    className="photoPerfil"
                />
            </Styled.Header>

            <Styled.ContainerContent disabled={loadingMatch} >
                <Button
                    btn="BUTTON_YALLOW"
                    option={"small"}
                    onClick={searchForMatch}
                >

                    {loadingMatch ?
                        <Styled.LoadingImg src={iconRestart} alt="icone para carregamento" />
                        : "PROCURAR PARTIDA"}
                </Button>

                <Styled.SourcePlayer visible={false} >

                    <span>Procurar player por ID</span>
                    <Input type="text" placeholder="ID" />

                    <ul>
                        { }
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                        <li>Gustavo #11111111111</li>
                    </ul>

                </Styled.SourcePlayer>

                {listFriends.length > 0 && (
                    <>
                        <Styled.AccordionFriends>
                            <strong>Amigos</strong>
                            <ul>
                                {listFriends.map((resp) => (

                                    <li key={resp.id} >
                                        <img src={!resp.img ? noUser : resp.img} alt="photo" />
                                        <div>
                                            <strong>{resp.name}</strong>
                                            <p>#{resp.id}</p>
                                        </div>
                                    </li>

                                ))}

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>

                                <li >
                                    <img src={noUser} alt="photo" />
                                    <div>
                                        <strong>Gustavo Teles de Souza</strong>
                                        <p>#11111-1111-1111-1111-1111-1111-1111-1111-1111-11111</p>
                                    </div>
                                </li>
                            </ul>
                        </Styled.AccordionFriends>
                    </>
                )}



            </Styled.ContainerContent>

        </Styled.Container>
    )
}

export default MenuOnline;