import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Styled from './style';

import Button from "../../Components/Button";
import Form from "../../Components/Form";
import HeaderAuthentication from "../../Components/HeaderAuthentication";
import Input from '../../Components/Input';

import baseUrl from '../../Config/baseUrl';

import imgNoUser from '../../assets/no-user.svg';
import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';
import { toast } from 'react-toastify';
import Reload from '../../Components/Reload';
import { errorAxios } from '../../Config/interfaces';

function Register() {

    const [file, setFile] = useState<File | null>(null);
    const [fileBase64, setFileBase64] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [wrongName, setWrongName] = useState<boolean>(false);
    const [wrongEmail, setWrongEmail] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);

    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [btnPress, setBtnPress] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (wrongName) {
            setWrongName(false);
        }
    }, [name]);

    useEffect(() => {
        if (wrongEmail) {
            setWrongEmail(false);
        }
    }, [email]);

    useEffect(() => {
        if (wrongPassword) {
            setWrongPassword(false);
        }
    }, [password]);

    function handlePhoto(e: React.ChangeEvent<HTMLInputElement> | null) {

        if (e && e.target.files && e.target.files.length > 0) {
            const file = e.target.files?.[0];

            if (!file.type.startsWith("image/")) {
                toast.warn("Arquivo deve ser uma foto");
            }

            if (file && file.type.startsWith("image/")) {

                setFile(file);

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const imageUrl = reader.result as string;
                    setFileBase64(imageUrl);
                };

            }
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setBtnPress(true);

        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

        setWrongName(name.length === 0);
        setWrongEmail(!emailRegex.test(email));
        setWrongPassword(password.length <= 5);

        try {

            if (
                name.length > 0
                && emailRegex.test(email)
                && password.length > 5) {

                const token = await axios.post(`${baseUrl}/auth/register`, {
                    name: name,
                    login: email,
                    password: password + ""
                });

                const jsonToken = JSON.stringify(token.data.token);
                localStorage.setItem("token", jsonToken);

                if (file != null) {
                    await handleSubmitFile(token.data.token);
                }

                toast.success("Registrado com sucesso");

                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 200);

                setBtnPress(false);

            }
        } catch (error) {
            if (axios.isAxiosError(error)) {

                const message = error.response?.data?.message;

                const data: errorAxios = {
                    timestamp: error.response?.data?.timestamp,
                    status: error.response?.data?.status,
                    error: error.response?.data?.error,
                    message: error.response?.data?.message,
                    path: error.response?.data?.path
                }

                switch (message) {
                    case "incorrect field. id account already exists": {
                        toast.error("Conta já existe, tente outro email");
                        setEmail("");
                        break;
                    }

                    case "incorrect field. id must have at least 6 characters and less than 50": {
                        toast.error("Senha deve ter entre 6 e 50 caracteres");
                        break;
                    }

                    case "incorrect field. id Error while generating token": {
                        toast.error("Erro ao gerar token de acesso");
                        break;
                    }

                    default: {
                        toast.error("Erro na requisição, tentei novamente")
                    }
                }

                console.error("Error request: " + data);

            } else {
                toast.error("Erro desconhecido tente novamente mais tarde");
                console.error('error the register > ', e);
            }

            setBtnPress(false);
        }

        setBtnPress(false);

    }

    async function handleSubmitFile(token: string) {
        if (file == null) {
            return;
        }

        try {
            if (file.type === "image/jpeg") {

                const formData = new FormData;
                formData.append('file', file);

                await axios.post(baseUrl + "/file", formData, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data'
                    }
                });

            }

        } catch (error) {

            if (axios.isAxiosError(error)) {

                const message = error.response?.data.metadataResponseDTO.message;

                switch (message) {
                    case "invalid field": {
                        toast.error("Tipo de arquivo invalido");
                        break;
                    }
                    case "failed to upload file in s3 bucket": {
                        toast.error("Erro ao subir imagem");
                        break;
                    }

                    default: {
                        toast.error("Erro inesperado ao subir arquivo")
                    }
                }
            } else {
                toast.error("Sugiu um erro ao subirmos a foto");
            }

            console.error("error submit file > ", error);
        }
    }

    function handleNavigate(url: string) {
        navigate(url, { replace: true });
    }

    return (
        <Styled.Container>
            <HeaderAuthentication />

            <Form onSubmit={handleSubmit} >

                <h1>REGISTRO</h1>

                <Styled.PhotoInput>
                    <input type="file" placeholder='file_photo' onChange={e => handlePhoto(e)} />
                    <img src={fileBase64 ? fileBase64 : imgNoUser} alt="photo user" />
                </Styled.PhotoInput>

                <Input
                    error={wrongName}

                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    error={wrongEmail}

                    type="text"
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Styled.InputPassword>
                    <Input
                        error={wrongPassword}

                        type={seePassword ? "text" : "password"}
                        placeholder='Senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />



                    <img src={seePassword ? imgLockOpen : imgLockClose} alt="icon for password" onClick={() => setSeePassword(!seePassword)} />
                </Styled.InputPassword>



                <Button btn='BUTTON_SILVER' option={"small"} disabled={btnPress ? "disabled_button" : ""} >
                    {btnPress ? (<Reload />) : "Registre-se"}
                </Button>

                <p>Já tem conta? <span onClick={() => handleNavigate("/login")} >Faça login</span></p>

            </Form>

        </Styled.Container>
    )
}

export default Register;