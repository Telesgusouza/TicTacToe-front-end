import { useNavigate } from 'react-router-dom';
import * as Styled from './style'

import HeaderAuthentication from '../../Components/HeaderAuthentication';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import { useEffect, useState } from 'react';
import Input from '../../Components/Input';

function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [wrongEmail, setWrongEmail] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);

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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        setWrongEmail(!emailRegex.test(email));
        setWrongPassword(password.length <= 5);

        // if ()

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
                <Input
                    error={wrongPassword}

                    type="text"
                    placeholder='Senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button btn='BUTTON_SILVER' option={false} >Entrar</Button>

                <p>Ainda não tem conta? <span onClick={() => handleNavigate("/register")} >Cadastre-se</span></p>

            </Form>

        </Styled.Container>
    )
}

export default Login;