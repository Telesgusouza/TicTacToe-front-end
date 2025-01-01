import { replace, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import baseUrl from '../../Config/baseUrl';
import * as Styled from './style';

import Button from '../../Components/Button';
import Input from '../../Components/Input';

import imgLockClose from '../../assets/lock-close.svg';
import imgLockOpen from '../../assets/lock-open.svg';

interface IView {
    view: "EMAIL" | "CODE" | "RESET_PASSWORD"
}

interface IPassword {
    value: string;
    type: "password" | "text";
    wrong: boolean;
}

export default function ResetPassword() {

    const [email, setEmail] = useState<string>("");
    const [wrongEmail, setWrongEmail] = useState<boolean>(false);

    const [codeInput, setCodeInput] = useState<string>("");
    const [wrongCodeInput, setWrongCodeInput] = useState<boolean>(false);

    const [password, setPassword] = useState<IPassword>({
        value: "",
        type: "password",
        wrong: false
    });
    const [passwordConfirm, setPasswordConfirm] = useState<IPassword>({
        value: "",
        type: "password",
        wrong: false
    });

    const [view, setView] = useState<IView>({ view: "RESET_PASSWORD" });
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [btnDisable, setBtnDisable] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        let intervalId = null;

        if (timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [timeLeft]);

    useEffect(() => {
        if (wrongEmail) {
            setWrongEmail(false);
        }
    }, [email]);

    useEffect(() => {
        if (wrongCodeInput) {
            setWrongCodeInput(false);
        }
    }, [codeInput]);

    useEffect(() => {
        if (password.wrong) {
            setPassword({...password, wrong: false});
        }
    }, [password]);

    useEffect(() => {
        if (passwordConfirm.wrong) {
            setPasswordConfirm({ ...passwordConfirm, wrong: false });
        }
    }, [passwordConfirm]);

    async function resetPassword() {

    }

    async function verifyCode() {
        setBtnDisable(true);
        setTimeLeft(20);

        if (codeInput.length <= 0 || codeInput.length > 6) {
            toast.warn("Código invalido");
            setBtnDisable(true);
        }

        try {

            await axios.post(baseUrl + "/auth/verify_ticket", {
                ticket: codeInput
            }).catch(() => {
                toast.warn("Código inválido");
            })

            toast.success("código valido", { autoClose: 2100 });
            setView({ view: 'RESET_PASSWORD' });

        } catch (error) {
            toast.warn("Surgiu um erro ao verificar o código");
            console.error("Error ", error)
        }

        setBtnDisable(false);

    }

    async function handleTicketEmail() {
        setBtnDisable(true);

        const emailRegex = /^(?!.*(@|\.|\-)$)[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}(?:\.[\w\-]{2,})?$/i;

        if (email === "") {
            errorEmail("Campo não pode ser vázio");
            return;
        } if (!emailRegex.test(email)) {
            errorEmail("Formato de email invalido");
            return;
        } if (timeLeft > 0) {
            return;
        }

        try {

            await axios.post(baseUrl + "/auth/email_reset_password", {
                to: email
            });

            setView({ view: "CODE" });
            setTimeLeft(60);
            toast.success("Verifique sua caixa de entrada e spam", { autoClose: 2100 });

        } catch (e) {
            toast.warn("Ocorreu um erro ao enviar email");
            console.log("Error in email: ", e)
        }

        setBtnDisable(false);

    }

    function errorEmail(msg: string) {
        toast.warn(msg, { autoClose: 2400 });
        setView({ view: "EMAIL" });
        setWrongEmail(true);
        setBtnDisable(false)
    }

    function returnViewEmail() {
        setCodeInput("");
        setEmail("");

        setPassword({value: "", type: "password" , wrong: false});
        setPasswordConfirm({ value: "", type: "password", wrong: false });

        setView({ view: "EMAIL" });
    }

    function btnBack() {
        switch (view.view) {
            case "CODE": {
                returnViewEmail();
                break;
            }

            case "RESET_PASSWORD": {
                returnViewEmail();
                break;
            }

            case "EMAIL": {
                navigate("/login", { replace: true });
                break;
            }

            default: {
                break;
            }
        }
    }

    function toggleViewPassword(whichInput: "password" | "confirm") {
        
        switch (whichInput) {
            case "password": {
                const typePassword = password.type === "password" ? "text" : "password";
                setPassword({ ...password, type: typePassword });
                break;
            }

            case "confirm": {
                const typePassword = passwordConfirm.type === "password" ? "text" : "password";
                setPasswordConfirm({ ...passwordConfirm, type: typePassword });
                break;
            }

            default: {
                break;
            }
        }
    }

    return (
        <Styled.Container>

            <Styled.BtnBackPage>
                <span onClick={() => btnBack()} >Voltar</span>
            </Styled.BtnBackPage>

            <article>

                <h1>Resetar sua senha</h1>

                {view.view === "EMAIL" && (
                    <>

                        <p>Preencha o campo email, e clique no botão, será enviado um Email com o chave de acesso</p>
                        <Input
                            error={wrongEmail}

                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button
                            disabled={btnDisable ? "disabled_button" : ""}
                            btn='BUTTON_SILVER'
                            option='small'
                            onClick={handleTicketEmail}
                        >Enviar para email</Button>
                    </>
                )}

                {view.view == "CODE" && (
                    <>
                        <p>Preencha o campo abaixo com o código enviado</p>
                        <Input
                            error={wrongCodeInput}

                            type='text'
                            placeholder='Código de Acesso'
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                        />

                        <Styled.Timer>
                            {timeLeft > 0 ? (
                                <p>Reenviar código em : {timeLeft}</p>
                            ) : (
                                <p style={{ cursor: 'pointer' }} onClick={handleTicketEmail} >Reenviar código</p>
                            )}

                        </Styled.Timer>

                        <Button
                            disabled={btnDisable ? "disabled_button" : ""}
                            btn='BUTTON_BLUE'
                            option='small'
                            onClick={verifyCode}
                        >
                            Confiramr código
                        </Button>
                    </>
                )}


                {view.view === "RESET_PASSWORD" && (
                    <>
                        <p>Preencha os campos abaixo para que possa resetar sua senha</p>
                        <Styled.InputPassword>
                            <Input
                                error={password.wrong}

                                type={password.type}
                                placeholder='Digite sua senha'
                                onChange={(e) => setPassword({...password, value: e.target.value})}
                                value={password.value}
                            />
                            <img src={imgLockOpen} alt="icone de fechadura aberta" onClick={() => toggleViewPassword("password")} />
                        </Styled.InputPassword>

                        <Styled.InputPassword>
                            <Input
                                error={passwordConfirm.wrong}

                                type={passwordConfirm.type}
                                placeholder='Confirme sua senha'
                                onChange={(e) => setPasswordConfirm({ ...passwordConfirm, value: e.target.value})}
                                value={passwordConfirm.value}
                            />

                            <img src={imgLockClose} alt="icone de fechadura aberta" onClick={() => toggleViewPassword("confirm")} />
                        </Styled.InputPassword>

                        <Button btn='BUTTON_SILVER' option='small' > Mudar senha </Button>
                    </>
                )}


            </article>

        </Styled.Container>
    );
}
