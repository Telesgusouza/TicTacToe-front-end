import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../../src/Pages/Login';
import "@testing-library/jest-dom";
import React from 'react';

jest.mock('../../src/assets/reload.svg', () => ({
    ReactComponent: () => null,
}));

jest.mock('../../src/assets/lock-close.svg', () => ({
    ReactComponent: () => null,
}));

jest.mock('../../src/assets/lock-open.svg', () => ({
    ReactComponent: () => null,
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

function handleLogin() {
    render(<Login />);
}

describe("Login", () => {

    it("renders button text", () => {

        handleLogin();

        // pega um testo na tela
        expect(screen.getByText('LOGIN')).toBeInTheDocument();
        expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Entrar" })).toBeInTheDocument();

    });

    test("allows entering email and password", () => {
        handleLogin();

        const emailInput = screen.getByPlaceholderText("E-mail");
        const passwordInput = screen.getByPlaceholderText("Senha");

        fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput).toHaveValue("test@gmail.com");
        expect(passwordInput).toHaveValue("password123");
    });

    test("toggle password visibility", () => {
        handleLogin();

        const passwordInput = screen.getByPlaceholderText("Senha");
        const toggleButton = screen.getByAltText("icon for password");

        expect(passwordInput).toHaveAttribute('type', 'password');

        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute('type', 'text');

        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('displays validation errors', () => {
        handleLogin();

        const red = "#ed3419";
        const submitButton = screen.getByRole('button', { name: 'Entrar' });
        fireEvent.click(submitButton);

        // Verificar borda vermelha para email inválido
        expect(screen.getByPlaceholderText('E-mail')).toHaveStyle({
            borderBottomColor: red,
        });

        // Verificar borda vermelha para senha curta
        expect(screen.getByPlaceholderText('Senha')).toHaveStyle({
            borderBottomColor: red,
        });

        // Testar um email válido
        const emailInput = screen.getByPlaceholderText('E-mail');
        fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

        // Testar uma senha válida
        const passwordInput = screen.getByPlaceholderText('Senha');
        fireEvent.change(passwordInput, { target: { value: 'password123456' } });

        // Submeter novamente
        fireEvent.click(submitButton);

        expect(screen.getByPlaceholderText('E-mail')).not.toHaveStyle({
            borderBottomColor: '#ed3419',
        });

        expect(screen.getByPlaceholderText('Senha')).not.toHaveStyle({
            borderBottomColor: '#ed3419',
        });

    });

    it("loading when form submit", () => {
        handleLogin();

        const submitButton = screen.getByRole('button', { name: "Entrar" });
        fireEvent.click(submitButton);

        expect(screen.getByAltText("icon for password")).toBeInTheDocument();
    })

    it("allows navigation to registration", () => {
        handleLogin();

        const registerLink = screen.getByText("Cadastre-se");
        expect(registerLink).toBeInTheDocument();

    })

});
