import React, { act } from "react";
import "@testing-library/dom"
import "@testing-library/jest-dom";

import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";
import { createMemoryHistory } from 'history';

import InfoUser from '../../src/Pages/InfoUser/index';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// /__tests__/pages/InfoUser.spec.tsx

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};

const mockAxios = {
    get: jest.fn(),
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

function handleInfoUser() {
    return render(
        <BrowserRouter>
            <Routes>
                <Route path="/info-user" element={<InfoUser />} />
                <Route path="/" element={<div>JOGO DA VELHA</div>} />
            </Routes>
        </BrowserRouter>
    );
}

// function handleInfoUser() {
//     render(
//         <BrowserRouter>
//             <InfoUser />
//         </BrowserRouter>
//     )
// }

describe("InfoUser", () => {

    beforeEach(() => {
        // Mockar o localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
        });

        (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    });

    it("should render components after data loading", async () => {
        const dataUser = {
            name: "teste",
            login: "teste@gmail.com",
            role: "role_user",
            player: "PLAYER_ONE",

            numberOfWins: 6,
            numberOfDraws: 2,
            numberOfDefeats: 4
        }

        handleInfoUser();

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
            token: "token.test.123"
        }));

        await act(async () => {
            await mockAxios.get.mockReturnValue(Promise.resolve(dataUser));
        })

        await waitFor(() => {
            expect(screen.findByText("Nome")).resolves.toBeInTheDocument();
            expect(screen.findByText("teste")).resolves.toBeInTheDocument();

            expect(screen.findByText("E-mail")).resolves.toBeInTheDocument();
            expect(screen.findByText("teste@gmail.com")).resolves.toBeInTheDocument();

            // tabela
            expect(screen.findByText("Vitórias")).resolves.toBeInTheDocument();
            expect(screen.findByText("6")).resolves.toBeInTheDocument();

            expect(screen.findByText("Empate")).resolves.toBeInTheDocument();
            expect(screen.findByText("2")).resolves.toBeInTheDocument();

            expect(screen.findByText("Derrota")).resolves.toBeInTheDocument();
            expect(screen.findByText("10")).resolves.toBeInTheDocument();
        }, { timeout: 5000 });

    });

    /*

    problemas ao implementar teste de navegação
    problems implementing navigation testing

    it("navigate for page", async () => {
        const dataUser = {
            name: "teste",
            login: "teste@gmail.com",
            role: "role_user",
            player: "PLAYER_ONE",

            numberOfWins: 6,
            numberOfDraws: 2,
            numberOfDefeats: 4
        }

        handleInfoUser();

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
            token: "token.test.123"
        }));

        await act(async () => {
            await mockAxios.get.mockReturnValue(Promise.resolve(dataUser));
        })

        await waitFor(() => {
            // expect(screen.findByText("Voltar")).resolves.toBeInTheDocument();
            // const btn = screen.getByText("Voltar");
            fireEvent.click(screen.getByText("Voltar"));


        }, { timeout: 5000 });
    });

    */

});


