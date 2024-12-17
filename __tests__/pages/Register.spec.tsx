import React from "react";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import Register from '../../src/Pages/Register';

import '@testing-library/jest-dom';

jest.mock('../../src/assets/no-user.svg', () => ({
    ReactComponent: () => null
}));

jest.mock('../../src/assets/lock-close.svg', () => ({
    ReactComponent: () => null
}));

jest.mock('../../src/assets/lock-open.svg', () => ({
    ReactComponent: () => null
}))

jest.mock('../../src/assets/reload.svg', () => ({
    ReactComponent: () => null
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}))

jest.mock('../../src/Config/baseUrl', () => ({
    baseUrl: 'http://localhost:8080/api/v1'
}));

jest.mock("axios");

function handleRegister() {
    render(<Register />);
}

describe("Register", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('renders all components', () => {

        handleRegister();

        // Check for HeaderAuthentication
        expect(screen.getByRole('navigation')).toBeInTheDocument();

        // Check for PhotoInput
        expect(screen.getByPlaceholderText('file_photo')).toBeInTheDocument();
        expect(screen.getByAltText('photo user')).toBeInTheDocument(); // Image without alt text

        // Check for Inputs
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

        // Check for Password visibility toggle
        expect(screen.getByAltText('icon for password')).toBeInTheDocument();

        // Check for Button
        expect(screen.getByRole('button', { name: "Registre-se" })).toBeInTheDocument();

        // Check for Login link
        expect(screen.getByText('Faça login')).toBeInTheDocument();
    });

    it("toggle password view", () => {
        handleRegister();

        const inputPassword = screen.getByPlaceholderText("Senha");
        const toggleButton = screen.getByAltText("icon for password");

        expect(inputPassword).toHaveAttribute("type", 'password');
        fireEvent.click(toggleButton);

        expect(inputPassword).toHaveAttribute("type", "text");
        fireEvent.click(toggleButton);

        expect(inputPassword).toHaveAttribute("type", 'password');

    });

    it("entries cannot be empty", () => {
        handleRegister();

        const red = "#ed3419";
        const submitButton = screen.getByRole("button", { name: "Registre-se" });
        fireEvent.click(submitButton);

        expect(screen.getByPlaceholderText("Name")).toHaveStyle({
            borderBottomColor: red,
        });

        expect(screen.getByPlaceholderText("E-mail")).toHaveStyle({
            borderBottomColor: red,
        });

        expect(screen.getByPlaceholderText("Senha")).toHaveStyle({
            borderBottomColor: red,
        });

    });

    it("inputs register", () => {
        handleRegister();

        const buttonSubmit = screen.getByRole("button", { name: "Registre-se" });

        const nameInput = screen.getByPlaceholderText("Name");
        const emailInput = screen.getByPlaceholderText("E-mail");
        const passwordinput = screen.getByPlaceholderText("Senha");

        fireEvent.change(nameInput, { target: { value: "teste" } });
        fireEvent.change(emailInput, { target: { value: "teste@gmail.com" } });
        fireEvent.change(passwordinput, { target: { value: "password123" } });

        expect(nameInput).toHaveValue("teste");
        expect(emailInput).toHaveValue("teste@gmail.com");
        expect(passwordinput).toHaveValue("password123");

        fireEvent.click(buttonSubmit);
    })

    it("allows navigation to login", () => {
        handleRegister();

        const loginLink = screen.getByText("Faça login");
        expect(loginLink).toBeInTheDocument();

    })

});
