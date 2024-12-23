import { toast } from 'react-toastify';
import Button from '../Button';
import * as Styled from './style';
import axios from 'axios';
import baseUrl from '../../Config/baseUrl';
import { useNavigate } from 'react-router-dom';

interface IProps {
    onClick: () => void;
}

export default function DeleteFromAccount({ onClick }: IProps) {

    const navigate = useNavigate();

    async function handleLogOutOfAccount() {
        try {
            const jsonToken = localStorage.getItem("token");

            if (jsonToken) {
                const token = JSON.parse(jsonToken);

                await axios.delete(baseUrl + "/user", {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    } 
                });

                localStorage.removeItem("photo_user");
                localStorage.removeItem("token");
                localStorage.removeItem("user");        

                toast.success("Conta deletada com sucesso", { autoClose: 2000 });

                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 2000);
            }

        } catch (error) {
            toast.error("Error ao sair da conta, tente novamente", { autoClose: 1500 });
        }
    }

    return (
        <Styled.Container>
            <div>
                <p onClick={onClick} >Voltar</p>
            </div>


            <section>
                Realmente deseja deletar conta?
                <button onClick={handleLogOutOfAccount} >Deletar conta</button>
            </section>
        </Styled.Container>
    )
}