import React
, { act }
    from "react";
import {
    fireEvent,
    getByText,
    render,
    screen
} from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Menu from '../../src/Pages/Menu/index';
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import baseUrl from "../../src/Config/baseUrl";

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
    useNavigate: () => jest.fn(),
}));


const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key],
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

function handleMenu() {
    return render(
        <BrowserRouter>
            <Menu />
        </BrowserRouter>
    );
}

describe("Menu", () => {

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
    });


    test('renders correctly', () => {
        const { container } = handleMenu();
        expect(container).toBeInTheDocument();
    });


    test('button online is disabled when not logged in', () => {
        const { getByText } = handleMenu();
        const button = getByText('ONLINE');
        expect(button).toBeDisabled();
    });


    test('shows login options when not logged in', () => {
        const { getByText } = handleMenu();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('registre-se')).toBeInTheDocument();
    });


    /*

    Ocorreu erros ao tentar implementar esse teste

    Errors occurred when trying to implement this test

    it('shows enter with another account option when logged in', async () => {
       
    }); */
});
