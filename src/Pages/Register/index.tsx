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

                const token = await axios.post(baseUrl + "/auth/register", {
                    name: name,
                    login: email,
                    password: password + ""
                });

                const jsonToken = JSON.stringify(token.data.token);
                localStorage.setItem("token", jsonToken);

                await handleSubmitFile(token.data.token);

                navigate("/", { replace: true });

                setBtnPress(false);

            }
        } catch (e) {
            console.error('error the register > ', e);
            setBtnPress(false);
        }

    }


    async function handleSubmitFile(token: string) {
        if (file == null) {
            return;
        }

        try {
            const formData = new FormData;
            formData.append('file', file);

            await axios.post(baseUrl + "/file", formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });


        } catch (e) {
            console.error("error submit file > ", e);
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
                    <input type="file" onChange={e => handlePhoto(e)} />
                    <img src={fileBase64 ? fileBase64 : imgNoUser} alt="" />
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

                    <img src={seePassword ? imgLockOpen : imgLockClose } alt="icon for password" onClick={() => setSeePassword(!seePassword)} />
                </Styled.InputPassword>



                <Button btn='BUTTON_SILVER' option={false} disabled={btnPress} >Registre-se</Button>

                <p>Já tem conta? <span onClick={() => handleNavigate("/login")} >Faça login</span></p>

            </Form>

        </Styled.Container>
    )
}

export default Register;