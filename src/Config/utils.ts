import axios from "axios"
import baseUrl from "./baseUrl"
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export async function findPhotoWithToken(token: string) {
    try {

        // surgiu um erro quando faço a requisição
        const request = await axios.get(baseUrl + "/api/v1/file", {

            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });

    } catch (error) {
        console.error("Error when uploading photo: " + error)
    }
}

