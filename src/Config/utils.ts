import React from "react";

import axios from "axios"
import baseUrl from "./baseUrl"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigate = useNavigate();

export async function presentUser() {
    const tokenJson = localStorage.getItem("token");

    if (tokenJson) {
        const token = JSON.parse(tokenJson);

        const request = axios.get(baseUrl + "/user", {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!request) {
            toast.dismiss();
            toast.warn("Seu token não esta presenta no cache, você será redirecionado para o menu", { autoClose: 3400});
    
            setTimeout(() => {
                navigate("/", { replace: true });                
            }, 3500);
        }

    };
}
