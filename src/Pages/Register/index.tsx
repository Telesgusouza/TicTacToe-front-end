import * as Styled from './style';
import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import Form from "../../Components/Form";
import HeaderAuthentication from "../../Components/HeaderAuthentication";

import imgNoUser from '../../assets/no-user.svg';
import { useState } from 'react';

function Register() {

    const [file, setFile] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function handlePhoto(e: React.ChangeEvent<HTMLInputElement> | null) {
        
        if (e && e.target.files && e.target.files.length > 0) {
            const file = e.target.files?.[0];

            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const imageUrl = reader.result as string;
                    setFile(imageUrl);
                };

            }
        }
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        alert("TUDO CERTO");

    }

    function handleNavigate(url: string) {
        navigate(url, {replace: true});
    }

    return (
        <Styled.Container>
            <HeaderAuthentication />

            <Form onSubmit={handleSubmit} >

                <h1>REGISTRO</h1>

                <Styled.PhotoInput>
                    <input type="file" onChange={e => handlePhoto(e)} />
                    <img src={file ? file : imgNoUser} alt="" />
                </Styled.PhotoInput>

                <input 
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)} 
                />
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

                <Button btn='BUTTON_SILVER' option={false} >Registre-se</Button>

                <p>Já tem conta? <span onClick={() => handleNavigate("/login")} >Faça login</span></p>

            </Form>

        </Styled.Container>
    )
}

export default Register;