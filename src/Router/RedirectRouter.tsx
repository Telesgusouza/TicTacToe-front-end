import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Config/baseUrl";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
    children: React.ReactNode;
}

export default function RedirectRouter({ children }: IProps) {

    const navigate = useNavigate();

    const { match } = useParams();

    useEffect(() => {

        const jsonToken = localStorage.getItem("token");

        if (match && match !== "online") {
            return;
        }

        else if (!jsonToken) {

            toast.dismiss
            toast.warn("Seu token não esta presenta no cache, você será redirecionado para o menu", { autoClose: 3400 });

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 3500);

        } else {
            if (!!match) {
                
                if (match === "online") {
                    verifyUser(jsonToken);
                }

            } else {
                verifyUser(jsonToken);

            };
        }

    }, []);

    function verifyUser(jsonToken: string) {
        const token = JSON.parse(jsonToken);

        axios.get(baseUrl + "/user", {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            console.log("Error user: " + error);

            toast.dismiss();
            toast.warn("Seu token não esta presenta no cache, você será redirecionado para o menu", { autoClose: 3400 });

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 3500);
        });
    }

    return (
        <>
            {children}
        </>
    );
}