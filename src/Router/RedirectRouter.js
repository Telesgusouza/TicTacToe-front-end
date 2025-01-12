import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Config/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
export default function RedirectRouter(_a) {
    var children = _a.children;
    var navigate = useNavigate();
    var match = useParams().match;
    useEffect(function () {
        var jsonToken = localStorage.getItem("token");
        if (match && match !== "online") {
            return;
        }
        else if (!jsonToken) {
            toast.dismiss;
            toast.warn("Seu token não esta presenta no cache, você será redirecionado para o menu", { autoClose: 3400 });
            setTimeout(function () {
                navigate("/", { replace: true });
            }, 3500);
        }
        else {
            if (!!match) {
                if (match === "online") {
                    verifyUser(jsonToken);
                }
            }
            else {
                verifyUser(jsonToken);
            }
            ;
        }
    }, []);
    function verifyUser(jsonToken) {
        var token = JSON.parse(jsonToken);
        axios.get(baseUrl + "/user", {
            'headers': {
                'Authorization': "Bearer ".concat(token)
            }
        }).catch(function (error) {
            console.log("Error user: " + error);
            toast.dismiss();
            toast.warn("Seu token não esta presenta no cache, você será redirecionado para o menu", { autoClose: 3400 });
            setTimeout(function () {
                navigate("/", { replace: true });
            }, 3500);
        });
    }
    return (_jsx(_Fragment, { children: children }));
}
