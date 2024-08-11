import { useNavigate } from 'react-router-dom';
import * as Styled from './style'

import HeaderAuthentication from '../../Components/HeaderAuthentication';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function handleNavigate(url: string) {
        navigate(url, {replace: true});
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        alert("TUDO CERTO");

    }

    return (
        <Styled.Container>
            <HeaderAuthentication />

            <Form onSubmit={handleSubmit} >

                <h1>LOGIN</h1>

                <input 
                    type="text" 
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
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