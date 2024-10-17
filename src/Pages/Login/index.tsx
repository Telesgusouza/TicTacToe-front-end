import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './style'

import HeaderAuthentication from '../../Components/HeaderAuthentication';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Input from '../../Components/Input';

import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [wrongEmail, setWrongEmail] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);

    const [seePassword, setSeePassword] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
            setWrongEmail(false)
        }
    }, [email])


    useEffect(() => {
        if (password) {
            setWrongPassword(false)
        }
    }, [password])

    function handleNavigate(url: string) {
        navigate(url, { replace: true });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        setWrongEmail(!emailRegex.test(email));
        setWrongPassword(password.length <= 5);

        if (emailRegex.test(email) && password.length >= 6) {
            try {

                const token = await axios.post(baseUrl + "/auth/login", {
                    login: email,
                    password: password
                });

                const jsonToken = JSON.stringify(token.data.token);

                localStorage.setItem("token", jsonToken);

                toast.success("Logado com sucesso");

                setTimeout(() => {
                    navigate("/", {replace: true});                    
                }, 200);

            } catch (e) {
                toast.error("Erro ao fazer login, tente novamente");
                console.error("error login > ", e);
            }
        }

    }

    return (
        <Styled.Container>
            <HeaderAuthentication />

            <Form onSubmit={handleSubmit} >

                <h1>LOGIN</h1>

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

                <Button btn='BUTTON_SILVER' option={"small"} >Entrar</Button>

                <p>Ainda não tem conta? <span onClick={() => handleNavigate("/register")} >Cadastre-se</span></p>

            </Form>

        </Styled.Container>
    )
}

export default Login;